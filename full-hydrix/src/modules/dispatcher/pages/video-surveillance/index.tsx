import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"
import { videoSurveillanceModel } from "./model/video-surveillance-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";
import Loader from "@/packages/shared-ui/loader/loader";

export const VideoSurveillance = observer(() => {
    const { cameraSources, videoSrc, CameraConnect, CameraSwitch, CameraDisconnect, loader } = videoSurveillanceModel
    const { user } = useAuth()

    useEffect(() => {
        if (user?.id) {
            CameraConnect(user.id)
            return () => {
                CameraDisconnect()
            }
        }
    }, [])

    return (
        <div className="bg-white rounded-2xl p-7">
            <div className="mb-8 flex items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Видеонаблюдение</h1>
                    <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
                </div>
            </div>

            <VideoSlider cameraSources={cameraSources} CameraSwitch={CameraSwitch} />

            <div className='h-[600px] flex items-center justify-center'>
                {loader ? <Loader /> : <StreamPlayer videoSrc={videoSrc} />}
            </div>
        </div>
    )
})