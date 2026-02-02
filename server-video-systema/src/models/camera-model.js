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


        // Не сжатый вариант
        // const args = [
        //     '-rtsp_transport', 'tcp',
        //     '-fflags', 'nobuffer',
        //     '-flags', 'low_delay',
        //     '-use_wallclock_as_timestamps', '1',

        //     '-i', this.rtsp,

        //     '-c:v', 'copy',
        //     '-an',

        //     '-f', 'hls',
        //     '-hls_time', '1',
        //     '-hls_list_size', '4',
        //     '-hls_flags', 'delete_segments+append_list+omit_endlist',
        //     '-hls_segment_type', 'fmp4',
        //     '-hls_playlist_type', 'event',

        //     path.join(this.outDir, 'index.m3u8')
        // ];

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

            // '-master_pl_name', 'index.m3u8',
            // '-strftime', '1', // Используем время в именах
            // '-strftime_mkdir', '1',


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
