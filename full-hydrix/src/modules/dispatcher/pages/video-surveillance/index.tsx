import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"
import { useState } from "react"
import { videoSurveillanceModel } from "./model/video-surveillance-model"
import { observer } from "mobx-react-lite"

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