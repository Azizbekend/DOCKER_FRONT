const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.listen(5012, () => {
    console.log('SERVER START: http://localhost:5012');
});


// СПИСОК КАМЕР
const CAMERAS = [
    { id: 1, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=1&subtype=0' },
    { id: 2, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=2&subtype=0' },
    { id: 3, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=3&subtype=0' },
    { id: 4, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=4&subtype=0' },
    { id: 5, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=5&subtype=0' },
    { id: 6, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=6&subtype=0' },
    { id: 7, rtsp: 'rtsp://admin:Shapshi@16@85.141.81.53:554/cam/realmonitor?channel=7&subtype=0' },
];


// Активные процессы + зрители
const activeStreams = {};
const viewers = {};


// Запуск стрима
function startStream({ id, rtsp }) {
    const outDir = path.join(__dirname, `public/stream_${id}`);

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const args = [
        '-rtsp_transport', 'tcp',
        '-i', rtsp,
        '-c:v', 'copy',
        '-c:a', 'copy',
        '-hls_time', '6',               // меньше запросов — меньше трафика
        '-hls_list_size', '5',
        '-hls_flags', 'delete_segments',
        path.join(outDir, 'index.m3u8')
    ];

    console.log(`▶ START STREAM CAM ${id}`);
    const ffmpeg = spawn('ffmpeg', args);

    ffmpeg.stderr.on('data', d => console.log(`CAM ${id}: ${d.toString()}`));

    ffmpeg.on('exit', () => {
        console.log(`⚠ CAM ${id} STOPPED`);
        delete activeStreams[id];

        if ((viewers[id] || 0) > 0) {
            console.log(`⟳ Restart CAM ${id} in 2s (viewers: ${viewers[id]})`);
            setTimeout(() => startStream({ id, rtsp }), 2000);
        }
    });

    activeStreams[id] = ffmpeg;
}


// подключение зрителя
app.get('/:id/connect', (req, res) => {
    const id = Number(req.params.id);
    const cam = CAMERAS.find(c => c.id === id);

    if (!cam) return res.status(404).send('Камера не найдена');

    viewers[id] = (viewers[id] || 0) + 1;

    if (!activeStreams[id]) startStream(cam);

    return res.json({
        stream_url: `/public/stream_${id}/index.m3u8`
    });
});


// отключение зрителя
app.get('/:id/disconnect', (req, res) => {
    const id = Number(req.params.id);

    viewers[id] = Math.max((viewers[id] || 0) - 1, 0);

    if (viewers[id] === 0 && activeStreams[id]) {
        console.log(`⛔ STOP CAM ${id} — нет зрителей`);
        activeStreams[id].kill('SIGKILL');
        delete activeStreams[id];
    }

    return res.send('Отключено');
});
