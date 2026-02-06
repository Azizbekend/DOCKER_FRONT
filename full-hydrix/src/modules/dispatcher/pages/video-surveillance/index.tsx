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
        <div className="bg-white rounded-2xl p-7 min-h-[70vh] md:min-h-[70vh]">
            <div className="mb-8 flex items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Видеонаблюдение</h1>
                    <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-1 lg:grid-rows-[auto_1fr] xl:grid-cols-[5fr_1fr] justify-between h-full gap-4 lg:gap-6">
                {/* Основной контент */}
                <div className='w-full space-y-4 md:space-y-6 order-2 lg:order-1 flex flex-col'>
                    {/* Видео блок */}
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

                    {/* Админ/Пользователь блоки */}
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

                {/* Слайдер камер */}
                <div className="order-1 lg:order-2 xl:order-3 w-full h-auto lg:h-full">
                    <div className="lg:hidden mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Доступные камеры</h3>
                    </div>
                    <div className="w-full h-full max-h-[400px] lg:max-h-none lg:h-auto xl:h-full">
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