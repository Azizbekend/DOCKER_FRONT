import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StreamPlayerModel } from '@/modules/dispatcher/features/video-surveillance/stream-player-model';
import { Button } from '@/packages/shared-ui/button/button';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '@/packages/entities/user/utils';
import Loader from '@/packages/shared-ui/loader/loader';


interface StreamPlayerProps {
    onCameraClear: (onActions: () => void) => void,
    videoSrc: string,
}

export const StreamPlayer = observer(({ videoSrc, onCameraClear }: StreamPlayerProps) => {
    const navigate = useNavigate();
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

    const onCloseCamery = () => {
        const model = modelRef.current;

        if (!model) return;
        onCameraClear(model.destroy)
        navigate('/dispatcher')
    }


    return (
        <div className='h-min w-full'>
            {isAdmin() &&
                <div className='w-full flex justify-start mb-5'>
                    <Button styleColor="red" class="px-4 py-2" onClick={onCloseCamery}>
                        Отключить все камеры
                    </Button>
                </div>
            }

            {isLoading && <div className='h-[600px] block w-full flex flex-col items-center justify-center mx-auto gap-2'>
                <Loader />
                <p>Получение кадров</p>
            </div>}

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

        </div>
    );
});