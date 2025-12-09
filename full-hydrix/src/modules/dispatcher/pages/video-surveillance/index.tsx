import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"

export const VideoSurveillance = () => {

    return (
        <>
            <div className="informations-dispatch__timModel timModel-dispatch dispatch-background">
                <div className="timModel-dispatch__container">
                    <div className="text-[34px] font-semibold mb-[20px]">Видеонаблюдение</div>
                    <VideoSlider />

                    <StreamPlayer />
                </div>
            </div>
        </>
    )
}