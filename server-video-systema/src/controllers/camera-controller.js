const cameraService = require('../services/camera-service');

class CameraController {
    /**
     * Подключение пользователя к камере
     * body: { userId, cameraId }
     */
    connect(req, res) {
        try {
            const { userId, cameraId } = req.body;

            if (!userId || !cameraId) {
                return res.status(400).json({
                    error: 'userId and cameraId are required'
                });
            }

            const state = cameraService.connectUser(
                String(userId),
                Number(cameraId)
            );

            return res.status(200).json({
                success: true,
                data: state
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    /**
     * Отключение пользователя от камеры
     * body: { userId }
     */
    disconnect(req, res) {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).json({
                    error: 'userId is required'
                });
            }

            cameraService.disconnectUser(String(userId));

            return res.status(200).json({
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    /**
     * Переключение камеры
     * body: { userId, cameraId }
     */
    switch(req, res) {
        try {
            const { userId, cameraId } = req.body;

            if (!userId || !cameraId) {
                return res.status(400).json({
                    error: 'userId and cameraId are required'
                });
            }

            const state = cameraService.connectUser(
                String(userId),
                Number(cameraId)
            );

            return res.status(200).json({
                success: true,
                data: state
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }

    clear(req, res) {
        try {
            const allCameras = cameraService.clearCameras()

            return res.status(200).json({
                success: true,
                data: allCameras
            });


        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
}

module.exports = new CameraController();
