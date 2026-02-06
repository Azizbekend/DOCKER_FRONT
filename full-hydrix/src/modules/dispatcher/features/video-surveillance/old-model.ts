import { makeAutoObservable, runInAction } from 'mobx';
import Hls, { ErrorTypes } from 'hls.js';

export class StreamPlayerModel {
    videoElement: HTMLVideoElement | null = null;
    hlsInstance: Hls | null = null;
    reconnectTimer: number | null = null;
    reconnectAttempts = 0;
    videoSrc: string | null = null;

    private setIsLoading: ((loading: boolean) => void) | null = null;

    private readonly MAX_RECONNECT_ATTEMPTS = 10;
    private readonly RECONNECT_DELAY = 2000;

    constructor() {
        makeAutoObservable(this);
    }

    setVideoElement(element: HTMLVideoElement | null) {
        this.videoElement = element;
    }

    start(videoSrc: string, setIsLoading: (value: boolean) => void) {
        if (!this.videoElement) return;

        if (this.videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            // this.videoElement.src = this.normalizeUrl(videoSrc);
            this.videoElement.play().catch(() => { });
            return;
        }
        this.setIsLoading = setIsLoading
        this.createHls(videoSrc);
    }

    private createHls(videoSrc: string) {
        this.destroy();
        this.videoSrc = videoSrc;
        // Задержка если первое подключение после старта камеры
        // if (this.reconnectAttempts === 0) {
        //     setTimeout(() => {
        //         this.createHlsInternal(videoSrc);
        //     }, 3000);
        // } else {
        this.createHlsInternal(videoSrc);
        // }
    }

    private createHlsInternal(videoSrc: string) {
        if (!this.videoElement || !Hls.isSupported()) return;

        this.setIsLoading?.(true);

        const hls = new Hls({
            lowLatencyMode: false,
            liveDurationInfinity: true,

            maxBufferLength: 2,
            maxMaxBufferLength: 3,
            maxBufferSize: 0,

            defaultAudioCodec: undefined,
            enableWorker: true,


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

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            this.videoElement!
                .play()
                .catch(() => {
                    console.warn('Edge blocked autoplay');
                });
        });


        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            runInAction(() => {
                this.reconnectAttempts = 0;
                this.setIsLoading?.(false);
            });
            this.videoElement?.load();

            // this.videoElement?.play().catch(() => { });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;

            console.warn('HLS fatal error:', data.type);

            switch (data.type) {
                case ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                case ErrorTypes.NETWORK_ERROR:
                default:
                    setTimeout(() => {
                        this.retryReconnect(true);
                    }, 1000)
            }
        });
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
            // this.videoElement.src = '';
            this.videoSrc = null;
        }

        runInAction(() => {
            this.reconnectAttempts = 0;
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
                console.log("this.videoSrcthis.videoSrcthis.videoSrc")
                this.videoSrc && this.createHls(this.videoSrc);
            } else {
                console.log("startLoadstartLoadstartLoad")
                this.hlsInstance.startLoad();
            }
        }, this.RECONNECT_DELAY);
    }

    private normalizeUrl(url: string) {
        return url.replace(/([^:]\/)\/+/g, '$1');
    }
}