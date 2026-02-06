import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"
import { videoSurveillanceModel } from "./model/video-surveillance-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";
import Loader from "@/packages/shared-ui/loader/loader";

export const VideoSurveillance = observer(() => {
    const { cameraSources, videoSrc, CameraConnect, CameraSwitch, CameraDisconnect, loader, CameryСlear } = videoSurveillanceModel
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

            <div className='min-h-[600px] flex items-center justify-center'>
                {loader ?
                    <div className='h-[600px] block w-full flex flex-col items-center justify-center mx-auto gap-2'>
                        <Loader />
                        <p>Подключение к камере</p>
                    </div>
                    :
                    <StreamPlayer videoSrc={videoSrc} onCameraClear={CameryСlear} />
                }
            </div>
        </div>
    )
})