import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"

export const VideoSurveillance = () => {

    return (
        <>
            <div className="informations-dispatch__timModel timModel-dispatch dispatch-background">
                <div className="timModel-dispatch__container">
                    <div className="mb-8 flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Видеонаблюдение</h1>
                            <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
                        </div>
                    </div>
                    <VideoSlider />
                    
                    <StreamPlayer />
                </div>
            </div>
        </>
    )
}