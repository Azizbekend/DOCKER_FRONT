import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { observer } from 'mobx-react-lite';

export const StreamPlayer = ({ videoSrc }: { videoSrc: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoSrc) return;

        let hls: Hls | null = null;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
        }
        // Chrome / Firefox / Edge
        else if (Hls.isSupported()) {
            hls = new Hls({
                lowLatencyMode: true,
            });

            hls.loadSource(videoSrc);
            hls.attachMedia(video);
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
            video.src = '';
        };
    }, [videoSrc]);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            className="h-[600px] w-full mx-auto"
        />
    );
};
