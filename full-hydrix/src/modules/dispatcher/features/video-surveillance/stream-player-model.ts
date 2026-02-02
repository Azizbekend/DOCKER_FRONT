import { makeAutoObservable, runInAction } from 'mobx';
import Hls, { ErrorTypes } from 'hls.js';

export class StreamPlayerModel {
    videoElement: HTMLVideoElement | null = null;
    hlsInstance: Hls | null = null;
    reconnectTimer: number | null = null;
    reconnectAttempts = 0;

    private readonly MAX_RECONNECT_ATTEMPTS = 10;
    private readonly RECONNECT_DELAY = 2000;

    constructor() {
        makeAutoObservable(this);
    }

    setVideoElement(element: HTMLVideoElement | null) {
        this.videoElement = element;
    }

    private normalizeUrl(url: string) {
        return url.replace(/([^:]\/)\/+/g, '$1');
    }

    private clearReconnectTimer() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
    }

    destroy() {
        this.clearReconnectTimer();

        if (this.hlsInstance) {
            this.hlsInstance.destroy();
            this.hlsInstance = null;
        }

        if (this.videoElement) {
            this.videoElement.src = '';
        }

        runInAction(() => {
            this.reconnectAttempts = 0;
        });
    }

    private createHls(videoSrc: string) {
        this.destroy();

        if (!this.videoElement || !Hls.isSupported()) return;

        const hls = new Hls({
            lowLatencyMode: true,
            liveDurationInfinity: true,

            maxBufferLength: 2, // Максимальная длина буфера в секундах
            maxMaxBufferLength: 3,
            maxBufferSize: 0, // Не ограничивать по размеру


            manifestLoadingMaxRetry: Infinity,
            manifestLoadingRetryDelay: 2000,
            manifestLoadingMaxRetryTimeout: 64000,
            levelLoadingMaxRetry: Infinity,
            levelLoadingRetryDelay: 2000,
            fragLoadingMaxRetry: Infinity,
            fragLoadingRetryDelay: 1000,
        });

        this.hlsInstance = hls;

        const source = this.normalizeUrl(videoSrc);
        hls.loadSource(source);
        hls.attachMedia(this.videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            runInAction(() => {
                this.reconnectAttempts = 0;
            });
            this.videoElement?.play().catch(() => { });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;

            console.warn('HLS fatal error:', data.type);

            switch (data.type) {
                case ErrorTypes.NETWORK_ERROR:
                    this.retryReconnect();
                    break;
                case ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                default:
                    this.retryReconnect(true);
            }
        });
    }

    private retryReconnect(forceRecreate = false) {
        if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
            console.error('HLS: max reconnect attempts reached');
            return;
        }

        runInAction(() => {
            this.reconnectAttempts += 1;
        });

        this.clearReconnectTimer();

        this.reconnectTimer = window.setTimeout(() => {
            console.warn(
                `HLS reconnect attempt ${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS}`
            );

            if (forceRecreate || !this.hlsInstance) {
                // Пересоздаем HLS
                // Нужен videoSrc, но он хранится в компоненте
                // Решение: передавать videoSrc при вызове start
            } else {
                this.hlsInstance.startLoad();
            }
        }, this.RECONNECT_DELAY);
    }

    start(videoSrc: string) {
        if (!this.videoElement) return;

        // Нативный HLS для Safari
        if (this.videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            this.videoElement.src = this.normalizeUrl(videoSrc);
            this.videoElement.play().catch(() => { });
            return;
        }

        this.createHls(videoSrc);
    }
}