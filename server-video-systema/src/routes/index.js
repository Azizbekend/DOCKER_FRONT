const { Router } = require('express');
const cameraRoutes = require('./camera-routes');

const router = Router();

router.use('/cameras', cameraRoutes);

module.exports = router;
