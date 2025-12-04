import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { videoSurveillanceModel } from '../model/video-surveillance-model';
import { observer } from 'mobx-react-lite';

export const StreamPlayer = observer(() => {
    const videoRef = useRef(null);
    const { bigViewSrc } = videoSurveillanceModel

    useEffect(() => {
        const video = videoRef.current;
        // const streamUrl = "rtsp://admin:Shapshi@16@85.141.81.53:8443/cam/realmonitor";
        // const streamUrl = "https://85.141.81.53:8443/";
        const streamUrl = bigViewSrc;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            video && hls.attachMedia(video);
        } else {
            // Safari: поддерживает HLS нативно
            video.src = streamUrl;
        }
    }, [bigViewSrc]);

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