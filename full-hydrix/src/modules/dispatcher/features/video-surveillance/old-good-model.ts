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

        this.setIsLoading = setIsLoading;
        this.setIsLoading(true);
        this.videoSrc = videoSrc;

        if (this.videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            this.videoElement.src = this.normalizeUrl(videoSrc);
            this.videoElement.play().catch(() => { });
            this.setIsLoading(false);
            return;
        }

        this.createHls(videoSrc);
    }

    private createHls(videoSrc: string) {
        this.destroy();

        if (!this.videoElement || !Hls.isSupported()) return;

        const hls = new Hls({
            lowLatencyMode: false,
            liveDurationInfinity: true,

            maxBufferLength: 2,
            maxMaxBufferLength: 3,
            maxBufferSize: 0,

            enableWorker: true,

            manifestLoadingMaxRetry: Infinity,
            levelLoadingMaxRetry: Infinity,
            fragLoadingMaxRetry: Infinity,
        });

        this.hlsInstance = hls;

        const source = this.normalizeUrl(videoSrc);

        hls.attachMedia(this.videoElement);
        hls.loadSource(source);

        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            this.videoElement!
                .play()
                .catch(() => console.warn('Autoplay blocked'));
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            runInAction(() => {
                this.reconnectAttempts = 0;
                this.setIsLoading?.(false);
            });

            this.videoElement?.load();
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;

            console.warn('HLS fatal error:', data.type);

            switch (data.type) {
                case ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError();
                    break;
                default:
                    setTimeout(() => {
                        this.retryReconnect(true);
                    }, 1000)
            }
        });
    }

    destroy() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }

        if (this.hlsInstance) {
            this.hlsInstance.destroy();
            this.hlsInstance = null;
        }

        if (this.videoElement) {
            this.videoElement.pause();
            this.videoElement.removeAttribute('src');
            this.videoElement.load();
        }

        this.videoSrc = null;
        this.reconnectAttempts = 0;
    }

    private retryReconnect(forceRecreate = false) {
        if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) return;

        this.reconnectAttempts++;

        this.reconnectTimer = window.setTimeout(() => {
            if (forceRecreate && this.videoSrc) {
                this.createHls(this.videoSrc);
            } else {
                this.hlsInstance?.startLoad();
            }
        }, this.RECONNECT_DELAY);
    }

    private normalizeUrl(url: string) {
        return url.replace(/([^:]\/)\/+/g, '$1');
    }
}
