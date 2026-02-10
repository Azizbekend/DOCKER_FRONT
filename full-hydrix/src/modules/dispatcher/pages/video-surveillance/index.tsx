import { VideoSlider } from "./components/video-slider"
import { StreamPlayer } from "./components/stream-player"
import { videoSurveillanceModel } from "./model/video-surveillance-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";
import { isAdmin } from "@/packages/entities/user/utils";
import { LoaderBlock } from "../../widgets/video-surveillance/block/loader-block";
import { UserInfoBlock } from "../../widgets/video-surveillance/block/user-info-block";
import { BlockAdminBtns } from "../../widgets/video-surveillance/block/block-admin-btns";

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
        <div className="bg-white rounded-2xl p-7 min-h-[70vh]">
            <div className="mb-8 flex items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 xl:text-3xl">Видеонаблюдение</h1>
                    <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
                </div>
            </div>

            <div className="flex flex-col xl:grid xl:grid-cols-[5fr_1fr] gap-6 justify-between h-full ">
                <div className='h-[400px] xl:h-auto space-1 w-full space-y-4 md:space-y-6 order-2 xl:order-1 flex flex-col'>
                    <div className={`h-full w-full rounded-xl overflow-hidden ${!isActive ? "bg-gray-900 shadow-lg border-2 border-gray-800" : ""
                        }`}>
                        {isActive
                            ? (loader
                                ? <LoaderBlock text="Получение кадров с камер..." />
                                : <StreamPlayer videoSrc={videoSrc} />
                            )
                            : <LoaderBlock
                                text={
                                    <div className="text-center h-full p-4 h-full block">
                                        <div className="text-lg md:text-xl font-medium text-gray-300 mb-2">
                                            Камеры временно недоступны
                                        </div>
                                        <div className="text-gray-400 text-xs md:text-sm">
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

                    <div className="block">
                        {isAdmin()
                            ? <BlockAdminBtns
                                isActive={isActive}
                                CameraActivate={CameraActivate}
                                CameraDeactivate={CameraDeactivate}
                            />
                            : (!isActive && <UserInfoBlock />)
                        }
                    </div>
                </div>

                <div className="order-3 w-full h-auto xl:h-full">
                    <div className="w-full h-full max-h-[400px] xl:max-h-none xl:h-auto xl:h-full">
                        <VideoSlider
                            cameraSources={cameraSources}
                            CameraSwitch={CameraSwitch}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})