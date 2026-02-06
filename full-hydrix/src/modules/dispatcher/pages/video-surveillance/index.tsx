import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"
import { videoSurveillanceModel } from "./model/video-surveillance-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";
import Loader from "@/packages/shared-ui/loader/loader";
import { isAdmin } from "@/packages/entities/user/utils";
import { Button } from "@/packages/shared-ui/button/button";
import { LoaderBlock } from "../../widgets/video-surveillance/loader-block";
import { UserInfoBlock } from "../../widgets/video-surveillance/user-info-block";
import { BlockAdminBtns } from "../../widgets/video-surveillance/block-admin-btns";

export const VideoSurveillance = observer(() => {
    const { cameraSources, videoSrc, CameraConnect, CameraSwitch, CameraDisconnect, loader, CameraActivate, CameraDeactivate, isActive } = videoSurveillanceModel
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

            {/* <div className='min-h-[600px] flex flex-col items-center justify-center'>

                {isAdmin() &&
                    <div className='w-full flex justify-start mb-5'>
                        <Button styleColor={isActive == true ? "red" : "gray"} class="px-4 py-2" onClick={() => CameraDeactivate()} disabled={isActive == false}>
                            Отключить доступ к камерам
                        </Button>

                        <Button styleColor={isActive == false ? "green" : "gray"} class="px-4 py-2" onClick={() => CameraActivate()} disabled={isActive == true}>
                            Включить доступ к камерам
                        </Button>
                    </div>
                }

                <div className="h-min w-full h-[600px]">
                    {isActive
                        ? (loader ? <LoaderBlock text="Получение кадров" /> : <StreamPlayer videoSrc={videoSrc} />)
                        : <LoaderBlock text={
                            <div className="">Камеры не доступны</div>
                        } lookLoader={false} />
                    }
                </div>
            </div> */}


            <div className='min-h-[600px] flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 md:p-6'>

                {isAdmin() ? <BlockAdminBtns isActive={isActive} CameraActivate={CameraActivate} CameraDeactivate={CameraDeactivate} /> : (!isActive && <UserInfoBlock />)}

                {/* Основной блок с видеопотоком/загрузчиком */}
                <div className={`w-full max-w-6xl h-[600px] rounded-xl overflow-hidden ${!isActive && "bg-gray-900 shadow-lg border-2 border-gray-800"}  `}>
                    {isActive
                        ? (loader
                            ? <LoaderBlock text="Получение кадров с камер..." />
                            : <StreamPlayer videoSrc={videoSrc} />
                        )
                        : <LoaderBlock
                            text={
                                <div className="text-center">
                                    <div className="text-xl font-medium text-gray-300 mb-2">Камеры временно недоступны</div>
                                    <div className="text-gray-400 text-sm">
                                        {isAdmin()
                                            ? 'Используйте кнопки выше для включения доступа'
                                            : 'Пожалуйста, обратитесь к администратору'
                                        }
                                    </div>
                                </div>
                            }
                            lookLoader={false}
                        />
                    }
                </div>
            </div>
        </div>
    )
})