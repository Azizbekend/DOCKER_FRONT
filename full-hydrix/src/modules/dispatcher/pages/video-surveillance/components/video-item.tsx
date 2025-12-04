import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface CameraItemProps {
    src: string,
    setSrc: (value: string) => void
}

export const CameraItem = ({ src, setSrc }: CameraItemProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        // Chrome/Firefox
        if (Hls.isSupported()) {
            hls = new Hls({ enableWorker: true });
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.warn("HLS error:", data);
            });
        } else {
            // Safari
            video.src = src;
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [src]);

    return (
        <div
            className="flex-shrink-0 transition-transform duration-300"
            style={{ width: `calc(${100 / 4}% - 16px)` }}
            onClick={() => setSrc(src)}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                controls={false}
                className="w-full h-80 rounded-xl bg-black object-cover"
            />
        </div>
    );
};
