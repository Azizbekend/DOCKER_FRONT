import { useEffect, useRef } from 'react';
import Hls, { ErrorTypes } from 'hls.js';
import { observer } from 'mobx-react-lite';

function normalizeUrl(url: string) {
    return url.replace(/([^:]\/)\/+/g, '$1');
}

export const StreamPlayer = observer(({ videoSrc }: { videoSrc: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const reconnectTimerRef = useRef<number | null>(null);
    const reconnectAttemptsRef = useRef(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoSrc) return;

        const source = normalizeUrl(videoSrc);
        const MAX_RECONNECT_ATTEMPTS = 10;
        const RECONNECT_DELAY = 2000;

        const clearReconnectTimer = () => {
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
                reconnectTimerRef.current = null;
            }
        };

        const destroyHls = () => {
            clearReconnectTimer();

            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }

            video.src = '';
        };

        const createHls = () => {
            destroyHls();

            if (!Hls.isSupported()) return;

            const hls = new Hls({
                lowLatencyMode: true,
                liveDurationInfinity: true,

                manifestLoadingMaxRetry: Infinity,
                manifestLoadingRetryDelay: 2000,
                manifestLoadingMaxRetryTimeout: 64000,

                levelLoadingMaxRetry: Infinity,
                levelLoadingRetryDelay: 2000,

                fragLoadingMaxRetry: Infinity,
                fragLoadingRetryDelay: 1000,
            });

            hlsRef.current = hls;

            hls.loadSource(source);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                reconnectAttemptsRef.current = 0;
                video.play().catch(() => { });
            });

            hls.on(Hls.Events.ERROR, (_, data) => {
                if (!data.fatal) return;

                console.warn('HLS fatal error:', data.type);

                switch (data.type) {
                    case ErrorTypes.NETWORK_ERROR:
                        retryReconnect();
                        break;

                    case ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError();
                        break;

                    default:
                        retryReconnect(true);
                }
            });
        };

        const retryReconnect = (forceRecreate = false) => {
            if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
                console.error('HLS: max reconnect attempts reached');
                return;
            }

            reconnectAttemptsRef.current += 1;

            clearReconnectTimer();

            reconnectTimerRef.current = window.setTimeout(() => {
                console.warn(
                    `HLS reconnect attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`
                );

                if (forceRecreate || !hlsRef.current) {
                    createHls();
                } else {
                    hlsRef.current.startLoad();
                }
            }, RECONNECT_DELAY);
        };

        // Safari (native HLS)
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = source;
            video.play().catch(() => { });
            return;
        }

        createHls();

        return () => {
            destroyHls();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-[600px] block w-full mx-auto"
        />
    );
});
