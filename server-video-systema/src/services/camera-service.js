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

        /**
         * Глобальный флаг активности
         */
        this.isActive = true;

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
     * 🔒 Деактивация всех камер
     */
    deactivate() {
        this.isActive = false;

        // Отключаем всех пользователей
        for (const userId of this.userConnections.keys()) {
            this.disconnectUser(userId);
        }

        // Останавливаем все камеры
        for (const camera of this.cameras.values()) {
            camera.stop();
        }
    }

    /**
     * 🔓 Активация камер
     */
    activate() {
        this.isActive = true;
    }

    /**
     * Принудительный запуск камеры
     */
    startCamera(cameraId) {
        if (!this.isActive) {
            throw new Error('Cameras are deactivated');
        }

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
        if (!this.isActive) {
            throw new Error('Cameras are deactivated');
        }

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
     * Отключение пользователя
     */
    disconnectUser(userId) {
        const cameraId = this.userConnections.get(userId);
        if (cameraId === undefined) return;

        const camera = this.cameras.get(cameraId);
        if (camera) {
            camera.removeViewer(userId);
        }

        this.userConnections.delete(userId);
    }

    /**
     * Состояние камер
     */
    getCamerasState() {
        return Array.from(this.cameras.values()).map((camera) => ({
            ...camera.getState(),
            serviceActive: this.isActive,
        }));
    }

    /**
     * Очистка (alias)
     */
    clearCameras() {
        this.deactivate();
    }

    isActiveStatus() {
        return this.isActive
    }
}

module.exports = new CameraService();
