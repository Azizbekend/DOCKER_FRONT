const Camera = require('../models/camera-model');
const camerasConfig = require('../config/camera.config');

class CameraService {
    constructor() {
        /**
         * cameraId -> Camera instance
         */
        this.cameras = new Map();

        /**
         * userId -> cameraId
         */
        this.userConnections = new Map();

        this._initCameras();
    }

    /**
     * Инициализация камер из конфига
     */
    _initCameras() {
        camerasConfig.forEach((cameraConfig) => {
            const camera = new Camera(cameraConfig);
            this.cameras.set(camera.id, camera);
        });
    }

    /**
     * Принудительный запуск камеры
     */
    startCamera(cameraId) {
        const camera = this.cameras.get(cameraId);
        if (!camera) {
            throw new Error(`Camera ${cameraId} not found`);
        }

        camera.start();
    }

    /**
     * Принудительная остановка камеры
     */
    stopCamera(cameraId) {
        const camera = this.cameras.get(cameraId);
        if (!camera) {
            throw new Error(`Camera ${cameraId} not found`);
        }

        camera.stop();
    }

    /**
     * Подключение пользователя к камере
     */
    connectUser(userId, cameraId) {
        const camera = this.cameras.get(cameraId);
        if (!camera) {
            throw new Error(`Camera ${cameraId} not found`);
        }

        // Если пользователь уже подключён — отключаем от старой камеры
        const currentCameraId = this.userConnections.get(userId);
        if (currentCameraId !== undefined) {
            if (currentCameraId === cameraId) {
                return camera.getState();
            }

            this.disconnectUser(userId);
        }

        camera.addViewer(userId);
        this.userConnections.set(userId, cameraId);

        return camera.getState();
    }

    /**
     * Отключение пользователя от текущей камеры
     */
    disconnectUser(userId) {
        const cameraId = this.userConnections.get(userId);
        if (cameraId === undefined) {
            return;
        }

        const camera = this.cameras.get(cameraId);
        if (camera) {
            camera.removeViewer(userId);
        }

        this.userConnections.delete(userId);
    }

    /**
     * Получить состояние всех камер (опционально, для дебага)
     */
    getCamerasState() {
        return Array.from(this.cameras.values()).map((camera) =>
            camera.getState()
        );
    }

    /**
    * 
    */
    clearCameras() {
        this.cameras.values().map((camera) =>
            camera.stop()
        )
    }
}

module.exports = new CameraService();
