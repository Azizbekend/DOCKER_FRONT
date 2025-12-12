const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.listen(5012, () => {
    console.log('Server started on http://localhost:5012');
});

const CAMERAS = [
    { id: 1, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=7&subtype=0' },
    // { id: 2, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=6&subtype=0' },
    // { id: 3, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=3&subtype=0' },
    // { id: 4, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=4&subtype=0' },
    // { id: 5, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=5&subtype=0' },
    // { id: 6, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=2&subtype=0' },
    // { id: 7, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=7&subtype=0' },
];

function startHlsCamera({ id, rtsp }) {
    const outDir = path.join(__dirname, `public/stream_${id}`);

    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    const args = [
        '-rtsp_transport', 'tcp',
        '-i', rtsp,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-hls_time', '2',
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments',
        path.join(outDir, 'index.m3u8')
    ];

    console.log(`Запуск камеры ${id}...`);
    const ffmpeg = spawn('ffmpeg', args);

    ffmpeg.stderr.on('data', (d) => console.log(`CAM ${id}:`, d.toString()));

    ffmpeg.on('exit', () => {
        console.log(`CAM ${id} упала — перезапускаю через 2 сек`);
        setTimeout(() => startHlsCamera({ id, rtsp }), 2000);
    });
}

CAMERAS.forEach(startHlsCamera);