import { Icon } from "@/shared/ui/icon"
import { useEffect, useState } from 'react';
import { HardwareReview } from "./tabs/hardware-review";
import { HardwareControlle } from "./tabs/hardware-controlle";
import { InfoCompType } from "../../pages/scheme/types/type";
import accident from "@/app/static/img/accident.svg"
import { HardwareServes } from "./tabs/hardware-serves";
import { hardwareModel } from "@/entities/hardware/model";



export default function HardwareCard({ className, id, onClick }: InfoCompType) {
    const [mode, setMode] = useState<number>(0);

    const { init, model, initCharacteristic, isLoading, initControl, initService } = hardwareModel

    useEffect(() => {
        init(id)
        initCharacteristic(id)
        initControl(id)
        initService(1)
    }, [])



    return (
        isLoading &&
        <>
            <div className={`info-comp ${className}`}>
                <div className="info-comp__body">
                    <button className="info-comp__close" onClick={() => onClick(0)}>
                        <Icon systemName="arrow-back-blue" />
                        <span>назад</span>
                    </button>

                    <div className="info-comp__name">
                        {model.name}
                    </div>

                    <div className="info-comp__image">
                        <img src={'/hardware/' + model.photoName} alt="Info" />
                    </div>

                    <div className="flex items-center gap-2 ml-5 mb-5">
                        <div className="block w-3 h-3 rounded-[20px] bg-[#34C759]"></div>
                        <div>Работает</div>
                    </div>

                    {false &&
                        <>
                            <div className="flex items-center gap-2 ml-5 mb-5">
                                <div className="block w-3 h-3 rounded-[20px] bg-[#757575]"></div>
                                <div>Отключен</div>
                            </div>
                            <div className="flex items-center gap-2 ml-5 mb-5">
                                <div className="block w-3 h-3 rounded-[20px] bg-[#D31313]"></div>
                                <div>Авария</div>
                            </div>
                        </>
                    }

                    <div className="border-2 border-[#D31313] bg-[#FF4F4F20] rounded-[8px] mb-5 flex items-center justify-center gap-[22px] py-[16px] pl-[16px] pr-[34px]">
                        <img src={accident} alt="" width={32} height={29} />
                        <div className="text-regular text-[#D31313]">Сработал автомат защиты двигателя!</div>
                    </div>

                    <div className="flex gap-4 mb-5 bg-[#E6E9EF] py-2 px-3 rounded-lg">
                        <div onClick={() => setMode(0)} className={`w-full text-center rounded-lg cursor-pointer py-2 ${mode === 0 && "bg-[var(--clr-accent)] text-white"}`}>Обзор</div>
                        <div onClick={() => setMode(1)} className={`w-full text-center rounded-lg cursor-pointer py-2 ${mode === 1 && "bg-[var(--clr-accent)] text-white"}`}>Управление</div>
                        <div onClick={() => setMode(2)} className={`w-full text-center rounded-lg cursor-pointer py-2 ${mode === 2 && "bg-[var(--clr-accent)] text-white"}`}>Сервис</div>
                    </div>

                    {mode === 0 && (<HardwareReview />)}
                    {mode === 1 && (<HardwareControlle />)}
                    {mode === 2 && (<HardwareServes />)}

                    <div className="info-comp__section">
                        <div className="info-comp__subtitle">Журнал событий</div>

                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>18.10.2025 12.34 - </span> <span className='info-comp__act-status _red'>отключение</span>
                        </div>
                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>18.10.2025 12.36 - </span> <span className='info-comp__act-status _green'>запуск</span>
                        </div>
                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>20.12.2025 12.10 - </span> <span className='info-comp__act-status _orange'>ТО1</span>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}