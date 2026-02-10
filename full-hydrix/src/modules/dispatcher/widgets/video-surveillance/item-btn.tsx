import { observer } from "mobx-react-lite";

interface CameraItemButtonProps {
    onClick: () => void,
    active: boolean,
    count: number,
}

export const CameraItemButton = observer(({ active, onClick, count }: CameraItemButtonProps) => {
    const CameraIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );

    const PlayIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
        </svg>
    );

    const PauseIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
    );

    return (
        <div
            className={`flex-shrink-0 transition-all duration-300 cursor-pointer mx-1 my-1 w-[300px]`}
            // style={{ width: `calc(${100 / itemsToShow}% - 8px)` }}
            onClick={onClick}
        >
            <div className={` relative overflow-hidden rounded-xl transition-all duration-300  flex items-center justify-between  px-4 py-3 ${active
                ? 'bg-[#4A85F6]'
                : 'bg-gray-200 text-gray-800 border-gray-300'
                }
                active:scale-95
                group
            `}>
                <div className={`
                    flex items-center justify-center 
                    w-10 h-10 rounded-full 
                    transition-all duration-300
                    ${active
                        ? 'bg-white/20'
                        : 'bg-gray-400/20'
                    }
                `}>
                    <div className={active ? 'text-white' : 'text-[#4A85F6]'}>
                        {active ? <PauseIcon /> : <PlayIcon />}
                    </div>
                </div>

                {/* Правая часть: текст и информация */}
                <div className="flex flex-col items-end">
                    <span className={`
                        font-medium transition-all duration-300 text-sm
                        ${active ? 'text-white' : 'text-gray-800'}
                    `}>
                        Камера {++count}
                    </span>

                    <div className={`
                        flex items-center gap-1 mt-1 transition-all duration-300 gap-3
                        ${active ? 'text-blue-200' : 'text-gray-500'}
                        text-xs
                    `}>
                        <span>
                            {active ? 'Активна' : 'Не активна'}
                        </span>
                        <CameraIcon />
                    </div>
                </div>

            </div>
        </div>
    );
});     