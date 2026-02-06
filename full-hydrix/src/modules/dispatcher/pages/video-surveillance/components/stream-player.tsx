import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StreamPlayerModel } from '@/modules/dispatcher/features/video-surveillance/stream-player-model';
import Loader from '@/packages/shared-ui/loader/loader';
import { LoaderBlock } from '@/modules/dispatcher/widgets/video-surveillance/loader-block';


interface StreamPlayerProps {
    videoSrc: string,
}

export const StreamPlayer = observer(({ videoSrc }: StreamPlayerProps) => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const modelRef = useRef<StreamPlayerModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Инициализация модели
    if (!modelRef.current) {
        modelRef.current = new StreamPlayerModel();
    }

    useEffect(() => {
        const model = modelRef.current;

        if (!model) return;
        if (videoSrc == "") return;

        model.setVideoElement(videoRef.current);

        const onClicckLoda = (value: boolean) => {
            console.log(value)
            setIsLoading(value)
        }


        model.start(videoSrc, onClicckLoda);

        return () => {
            model.destroy();
        };
    }, [videoSrc]);



    return (
        <>

            {isLoading && <LoaderBlock text="Получение кадров" />}

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                className="h-[600px] block w-full mx-auto"
                style={{
                    visibility: isLoading ? 'hidden' : 'visible',
                }}
            />

        </>
    );
});