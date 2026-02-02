import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { StreamPlayerModel } from '@/modules/dispatcher/features/video-surveillance/stream-player-model';

export const StreamPlayer = observer(({ videoSrc }: { videoSrc: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const modelRef = useRef<StreamPlayerModel | null>(null);

    // Инициализация модели
    if (!modelRef.current) {
        modelRef.current = new StreamPlayerModel();
    }

    useEffect(() => {
        const model = modelRef.current;
        if (!model) return;

        model.setVideoElement(videoRef.current);
        model.start(videoSrc);

        return () => {
            model.destroy();
        };
    }, [videoSrc]);

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