import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { videoSurveillanceModel } from '../model/video-surveillance-model';
import { observer } from 'mobx-react-lite';

export const StreamPlayer = observer(() => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { bigViewSrc } = videoSurveillanceModel;
    const [streamSrc, setStreamSrc] = useState<string | null>(null);

    // Подключение к камере
    useEffect(() => {
        if (!bigViewSrc) return;

        fetch(`http://hydrig.gsurso.ru/camera/${bigViewSrc}/connect`)
            .then(r => r.json())
            .then(d => setStreamSrc(`http://hydrig.gsurso.ru/camera/${d.stream_url}`)); // без повтора /camera/
    }, [bigViewSrc]);

    // Инициализация HLS
    useEffect(() => {
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
    }, [streamSrc]); // реагируем на готовый поток, не на bigViewSrc

    // Отключение камеры при уходе
    useEffect(() => {
        return () => {
            if (bigViewSrc)
                navigator.sendBeacon(`http://hydrig.gsurso.ru/camera/${bigViewSrc}/disconnect`);
        };
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            className="w-[90%] mx-auto rounded-lg"
        />
    );
});
