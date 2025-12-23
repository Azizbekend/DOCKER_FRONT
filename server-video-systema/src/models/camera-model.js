const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class Camera {
    constructor({ id, rtsp }) {
        this.id = id;
        this.rtsp = rtsp;

        this.viewers = new Set();
        this.ffmpegProcess = null;

        this.outDir = path.join(
            process.cwd(),
            'public/',
            `stream_${this.id}`
        );
    }

    /**
     * Запуск ffmpeg (HLS)
     */
    start() {
        if (this.ffmpegProcess) {
            return;
        }

        if (!fs.existsSync(this.outDir)) {
            fs.mkdirSync(this.outDir, { recursive: true });
        }

        const args = [
            '-rtsp_transport', 'tcp',
            '-i', this.rtsp,
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-hls_time', '2',
            '-hls_list_size', '6',
            '-hls_flags', 'delete_segments',
            path.join(this.outDir, 'index.m3u8')
        ];

        console.log(`Запуск камеры ${this.id}...`);

        this.ffmpegProcess = spawn('ffmpeg', args);

        this.ffmpegProcess.stderr.on('data', (data) => {
            console.log(`CAM ${this.id}:`, data.toString());
        });

        this.ffmpegProcess.on('exit', () => {
            console.log(`CAM ${this.id} упала`);

            this.ffmpegProcess = null;

            if (this.viewers.size > 0) {
                console.log(`Перезапуск камеры ${this.id} через 2 сек`);
                setTimeout(() => this.start(), 2000);
            }
        });
    }

    /**
     * Остановка ffmpeg
     */
    stop() {
        if (!this.ffmpegProcess) {
            return;
        }

        console.log(`Остановка камеры ${this.id}`);

        this.ffmpegProcess.kill('SIGTERM');
        this.ffmpegProcess = null;
    }

    /**
     * Подключение пользователя
     */
    addViewer(userId) {
        this.viewers.add(userId);

        if (this.viewers.size === 1) {
            this.start();
        }
    }

    /**
     * Отключение пользователя
     */
    removeViewer(userId) {
        this.viewers.delete(userId);

        if (this.viewers.size === 0) {
            this.stop();
        }
    }

    /**
     * Текущее состояние камеры
     */
    getState() {
        return {
            id: this.id,
            viewers: this.viewers.size,
            isRunning: Boolean(this.ffmpegProcess),
            streamUrl: `/stream_${this.id}/index.m3u8`
        };
    }
}

module.exports = Camera;
