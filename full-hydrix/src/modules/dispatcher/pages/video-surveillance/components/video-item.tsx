
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { observer } from "mobx-react-lite";

interface CameraItemProps {
    onClick: () => void,
    active: boolean,
    count: number
}

export const CameraItem = observer(({ active, onClick, count }: CameraItemProps) => {
    const CameraIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );

    const PlayIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    );

    const PauseIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
    );

    return (
        <div
            className={`flex-shrink-0 transition-all duration-300 transform cursor-pointer`}
            style={{ width: `calc(${100 / 4}% - 16px)` }}
            onClick={onClick}
        >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700">
                {/* Placeholder-область вместо видео */}
                <div className="relative w-full h-64 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
                    {/* Центральная иконка камеры */}
                    <div className="absolute inset-0 flex items-center justify-center">

                        <div className="text-white p-5 drop-shadow-lg">
                            {active ? (
                                <PauseIcon />
                            ) : (
                                <PlayIcon />
                            )}

                        </div>
                    </div>

                    <div className="absolute flex items-center gap-3 px-3 py-1 rounded-lg bottom-3 left-1/2 transform -translate-x-1/2">
                        <div className="text-gray-400">
                            <CameraIcon />
                        </div>

                        <span className="text-white">
                            Камера {++count}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
})