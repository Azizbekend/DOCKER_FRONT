import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { videoSurveillanceModel } from '../model/video-surveillance-model';
import { observer } from 'mobx-react-lite';

export const StreamPlayer = observer(() => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { bigViewSrc } = videoSurveillanceModel;
    const [streamSrc, setStreamSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!bigViewSrc) return;

        fetch(`http://localhost:5012/${bigViewSrc}/connect`)
            .then(r => r.json())
            .then(d => setStreamSrc(d.stream_url));
        // .then(d => setStreamSrc(`http://localhost:5012/${d.stream_url}`));

        if (!streamSrc || !videoRef.current) return; // правильная проверка

        const video = videoRef.current;
        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(streamSrc);
            hls.attachMedia(video);
        } else {
            video.src = streamSrc;
        }
        return () => hls?.destroy();


    }, [bigViewSrc]);


    return (

        <>
            <video
                ref={videoRef}
                autoPlay
                muted
                className="w-[90%] mx-auto rounded-lg"
            />
        </>
    );
});
