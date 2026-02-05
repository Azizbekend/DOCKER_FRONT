const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class Camera {
    constructor({ id, rtsp }) {
        this.id = id;
        this.rtsp = rtsp;

        this.userDirs = new Map(); // userId -> outDir
        this.userProcesses = new Map(); // userId -> ffmpegProcess
        this.viewers = new Set();
    }

    /**
     * Подключение пользователя
     */
    addViewer(userId) {
        this.viewers.add(userId);

        // Создаем уникальную папку для пользователя
        const userDir = path.join(
            process.cwd(),
            'public/',
            `stream_${this.id}_${userId}`
        );

        this.userDirs.set(userId, userDir);

        // Запускаем ffmpeg для этого пользователя
        this.startForUser(userId);
    }

    /**
     * Отключение пользователя
     */
    removeViewer(userId) {
        this.viewers.delete(userId);

        // Останавливаем процесс пользователя
        this.stopForUser(userId);

        // Удаляем папку пользователя
        this.cleanupUserDir(userId);

        // Удаляем из мапов
        this.userDirs.delete(userId);
        this.userProcesses.delete(userId);
    }

    /**
     * Запуск ffmpeg для конкретного пользователя
     */
    startForUser(userId) {
        const userDir = this.userDirs.get(userId);

        if (!userDir || this.userProcesses.has(userId)) {
            return;
        }

        // Очищаем и создаем папку пользователя
        if (fs.existsSync(userDir)) {
            fs.rmSync(userDir, { recursive: true, force: true });
        }
        fs.mkdirSync(userDir, { recursive: true });

        const args = [
            '-rtsp_transport', 'tcp',
            '-fflags', 'nobuffer',
            '-flags', 'low_delay',
            '-use_wallclock_as_timestamps', '1',
            '-vsync', '1',
            '-i', this.rtsp,
            '-c:v', 'libx264',
            '-preset', 'superfast',
            '-tune', 'zerolatency',
            '-crf', '28',
            '-vf', 'scale=-2:480',
            '-r', '15',
            '-b:v', '500k',
            '-maxrate', '700k',
            '-bufsize', '1000k',
            '-an',
            '-f', 'hls',
            '-hls_time', '1',
            '-hls_list_size', '2',
            '-hls_flags', 'delete_segments+append_list+omit_endlist',
            '-hls_segment_type', 'fmp4',
            '-hls_playlist_type', 'event',
            '-hls_start_number_source', 'datetime',
            path.join(userDir, 'index.m3u8')
        ];

        console.log(`Запуск камеры ${this.id} для пользователя ${userId}...`);

        const ffmpegProcess = spawn('ffmpeg', args);
        this.userProcesses.set(userId, ffmpegProcess);

        ffmpegProcess.stderr.on('data', (data) => {
            console.log(`CAM ${this.id} (user:${userId}):`, data.toString());
        });

        ffmpegProcess.on('exit', () => {
            console.log(`CAM ${this.id} для пользователя ${userId} упала`);
            this.userProcesses.delete(userId);

            // Если пользователь еще подключен - перезапускаем
            if (this.viewers.has(userId)) {
                console.log(`Перезапуск для пользователя ${userId} через 2 сек`);
                setTimeout(() => this.startForUser(userId), 2000);
            }
        });
    }

    /**
     * Остановка ffmpeg для пользователя
     */
    stopForUser(userId) {
        const process = this.userProcesses.get(userId);
        if (!process) return;

        console.log(`Остановка камеры ${this.id} для пользователя ${userId}`);
        process.kill('SIGTERM');
        this.userProcesses.delete(userId);
    }

    /**
     * Очистка папки пользователя
     */
    cleanupUserDir(userId) {
        const userDir = this.userDirs.get(userId);
        if (!userDir) return;

        try {
            if (fs.existsSync(userDir)) {
                fs.rmSync(userDir, { recursive: true, force: true });
                console.log(`Удалена папка пользователя ${userId} для камеры ${this.id}`);
            }
        } catch (error) {
            console.error(`Ошибка удаления папки пользователя ${userId}:`, error);
        }
    }

    /**
     * Текущее состояние камеры
     */
    getState() {
        return {
            id: this.id,
            viewers: this.viewers.size,
            userUrls: Array.from(this.viewers).map(userId => ({
                userId,
                streamUrl: `/stream_${this.id}_${userId}/index.m3u8`
            }))
        };
    }
}

module.exports = Camera;
