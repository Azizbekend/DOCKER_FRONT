import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { videoSurveillanceModel } from '../model/video-surveillance-model';
import { observer } from 'mobx-react-lite';

export const StreamPlayer = observer(() => {
    const videoRef = useRef(null);
    const { bigViewSrc } = videoSurveillanceModel
    const [streamSrc, setStreamSrc] = useState<string | null>(null); // реальный плейлист

    useEffect(() => {
        const id = bigViewSrc;
        fetch(`http://hydrig.gsurso.ru/camera/${id}/connect`)
            .then(r => r.json())
            .then(d => setStreamSrc(`http://hydrig.gsurso.ru/camera/${d.stream_url}`));
    }, [bigViewSrc]);


    useEffect(() => {
        const video = videoRef.current;
        // const streamUrl = "rtsp://admin:Shapshi@16@85.141.81.53:8443/cam/realmonitor";
        // const streamUrl = "https://85.141.81.53:8443/";
        if (streamSrc) return

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamSrc);
            video && hls.attachMedia(video);
        } else {
            // Safari: поддерживает HLS нативно
            video.src = streamSrc;
        }
    }, [bigViewSrc]);

    useEffect(() => {
        return () => {
            const id = bigViewSrc;
            navigator.sendBeacon(`http://hydrig.gsurso.ru/camera/${id}/disconnect`);
        };
    }, []);


    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                muted
                className='w-[90%] mx-auto rounded-lg'
            />
        </>
    );
}
)