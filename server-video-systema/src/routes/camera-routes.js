const { Router } = require('express');
const cameraController = require('../controllers/camera-controller');

const router = Router();

router.post('/connect', cameraController.connect);
router.post('/disconnect', cameraController.disconnect);
router.post('/switch', cameraController.switch);

module.exports = router;
