const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const express = require('express');


const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


// const RTSP_URL = process.env.RTSP_URL || 'rtsp://admin:Shapshi@16@85.141.81.53:5542';
// const RTSP_URL = process.env.RTSP_URL || 'rtsp://admin:Shapshi@16@85.141.81.53:554';
const RTSP_URL = process.env.RTSP_URL || 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=6&subtype=0';
// rtsp://<имя_пользователя>:<пароль>@85.141.81.53:554/....
// rtsp://85.141.81.53:554/cam/realmonitor?channel=4&subtype=0
function startHls() {

    const outDir = path.join(__dirname, 'public', 'stream');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const args = [
        '-rtsp_transport', 'tcp',
        '-i', RTSP_URL,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-hls_time', '2',
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments',
        path.join(outDir, 'index.m3u8')
    ];

    console.log('Запуск FFmpeg для HLS...');
    const ffmpeg = spawn('ffmpeg', args);

    ffmpeg.stderr.on('data', (d) => console.log('FFmpeg:', d.toString()));
    ffmpeg.on('exit', () => {
        console.log('FFmpeg упал – перезапуск через 2 сек');
        setTimeout(startHls, 2000);
    });
}

startHls();
