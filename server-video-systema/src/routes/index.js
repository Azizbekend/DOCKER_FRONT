const { Router } = require('express');
const cameraRoutes = require('./camera-routes');

const router = Router();

router.use((req, res, next) => {
    if (req.url.endsWith('.m3u8')) {
        // Chrome workaround
        delete req.headers.range;

        res.setHeader('Accept-Ranges', 'none');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    }
    next();
});

router.use('/cameras', cameraRoutes);

module.exports = router;
