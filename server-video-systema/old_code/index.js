const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const express = require('express');
const app = express();

const LOG_DIR = path.join(__dirname, 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: path.join(LOG_DIR, 'rtsp-server.log'), maxsize: 10 * 1024 * 1024 }),
        new winston.transports.Console()
    ]
});

/**
 * Конфигурация RTSP-потока
 * Замените RTSP_URL на ваш адрес вида: rtsp://user:pass@ip:port/path
 */
// const RTSP_URL = process.env.RTSP_URL || 'rtsp://admin:Shapshi@16@85.141.81.53:554';
// const RTSP_URL = process.env.RTSP_URL || 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=4&subtype=0';
const RTSP_URL = process.env.RTSP_URL || 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=2&subtype=0';










const OUTPUT_FILE = process.env.OUTPUT_FILE || path.join(__dirname, 'output', 'stream_%Y%m%d_%H%M%S.mp4');
const RECORD_TO_FILE = (process.env.RECORD || 'false').toLowerCase() === 'true';



// rtsp://admin:Shapshi@16@192.168.1.99:37777/cam/realmonitor


/**
 * Параметры переподключения
 */
let attempt = 0;
const MAX_BACKOFF_MS = 60000; // максимум 60s
const BASE_BACKOFF_MS = 1000;  // 1s

let ffmpegProc = null;
let shuttingDown = false;

function backoffMs(attempt) {
    // экспоненциальная задержка с jitter
    const ms = Math.min(MAX_BACKOFF_MS, BASE_BACKOFF_MS * Math.pow(2, attempt));
    const jitter = Math.round(Math.random() * 500);
    return ms + jitter;
}

function startFfmpeg() {
    attempt++;
    const startedAt = new Date();
    logger.info(`Попытка подключения #${attempt} к ${RTSP_URL}`);

    // Базовая команда ffmpeg.
    // -rtsp_transport tcp  => используем TCP (надёжнее в нестабильных сетях)
    // -i <url>             => источник
    // -an -c copy -f null - => если не записываем в файл — можно дропать поток (null)
    // при RECORD_TO_FILE = true команда изменится для записи в файл
    const args = [
        '-rtsp_transport', 'tcp',
        '-i', RTSP_URL,
        '-hide_banner',
        '-loglevel', 'info'
    ];

    if (RECORD_TO_FILE) {
        // Запись в файл: перекодирования не делаем, копируем контейнер/потоки (-c copy)
        // Можно настроить шаблон имени и ротацию по времени
        const outDir = path.join(__dirname, 'output');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        const filename = path.join(outDir, `stream_${Date.now()}.mp4`);
        args.push('-c', 'copy', '-f', 'mp4', filename);
        logger.info(`Recording enabled. Writing to: ${filename}`);
    } else {
        // Отправляем в null (чтобы ffmpeg просто читал поток и не сохранял)
        args.push('-an', '-c', 'copy', '-f', 'null', '-');
    }

    // spawn ffmpeg
    ffmpegProc = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let connectionTimeout = setTimeout(() => {
        if (ffmpegProc && !shuttingDown) {
            logger.error('Таймаут подключения к RTSP-потоку');
            ffmpegProc.kill('SIGKILL');
        }
    }, 10000); // 10 секунд таймаут

    // И очищайте таймаут при успешном подключении
    ffmpegProc.stderr.once('data', () => {
        clearTimeout(connectionTimeout);
        attempt = 0;
        logger.info('FFmpeg успешно подключился к RTSP-потоку');
    });


    logger.info(`ffmpeg PID=${ffmpegProc.pid} запущен.`);

    // Парсим stderr для логирования (ffmpeg пишет туда прогресс/ошибки)
    ffmpegProc.stderr.setEncoding('utf8');
    ffmpegProc.stderr.on('data', (chunk) => {
        const lines = chunk.split(/\r?\n/).filter(Boolean);

        for (const line of lines) {
            // Ключевые сообщения о подключении
            if (line.includes('rtsp') || line.includes('Input') || line.includes('Stream')) {
                logger.info(`[ffmpeg] ${line}`);
            }

            // Ошибки подключения
            if (line.includes('Connection refused') ||
                line.includes('Unable to open') ||
                line.includes('401 Unauthorized') ||
                line.includes('404 Not Found')) {
                logger.error(`[ffmpeg] ОШИБКА ПОДКЛЮЧЕНИЯ: ${line}`);
            }

            // Успешное подключение и начало записи
            if (line.includes('start time') || line.includes('Duration:') || line.includes('streaming')) {
                logger.info(`[ffmpeg] УСПЕШНО: ${line}`);
            }

            // Предупреждения
            if (line.includes('warning') || line.includes('Warning')) {
                logger.warn(`[ffmpeg] ${line}`);
            }

            // Ошибки
            if (line.includes('error') || line.includes('Error')) {
                logger.error(`[ffmpeg] ${line}`);
            }
        }
    });
    ffmpegProc.on('error', (err) => {
        logger.error(`Ошибка при запуске ffmpeg: ${err.message}`);
    });

    ffmpegProc.on('exit', (code, signal) => {
        const stoppedAt = new Date();
        logger.warn(`ffmpeg PID=${ffmpegProc ? ffmpegProc.pid : 'N/A'} остановлен. code=${code} signal=${signal}`);
        ffmpegProc = null;

        if (shuttingDown) {
            logger.info('Сервер корректно останавливается (shutting down).');
            return;
        }

        // Решаем, переподключаться ли
        const delay = backoffMs(attempt);
        logger.info(`Переподключение через ${delay} ms (attempt ${attempt + 1})`);
        setTimeout(startFfmpeg, delay);
    });

    // Сброс попыток при успешном подключении (кусочно: если ffmpeg начал выводить логи)
    // В простейшей реализации можно сбросить attempt на первом stderr-выводе.
    const onFirstLog = () => {
        attempt = 0;
        ffmpegProc.stderr.removeListener('data', onFirstLog);
    };
    // Добавляем одноразовый слушатель: как только придёт хоть один кусок stderr -> считаем подключение успешным
    ffmpegProc.stderr.once('data', onFirstLog);
}

function stopFfmpegAndExit() {
    shuttingDown = true;
    logger.info('Stopping ffmpeg and exiting...');
    if (ffmpegProc) {
        try {
            ffmpegProc.kill('SIGINT');
            setTimeout(() => {
                if (ffmpegProc) ffmpegProc.kill('SIGKILL');
                process.exit(0);
            }, 2000);
        } catch (e) {
            logger.error('Ошибка при попытке остановить ffmpeg: ' + e.message);
            process.exit(1);
        }
    } else {
        process.exit(0);
    }
}

// Обработка сигналов
process.on('SIGINT', () => {
    logger.info('Получен SIGINT');
    stopFfmpegAndExit();
});
process.on('SIGTERM', () => {
    logger.info('Получен SIGTERM');
    stopFfmpegAndExit();
});

// Стартуем
logger.info('RTSP client starting...');
startFfmpeg();