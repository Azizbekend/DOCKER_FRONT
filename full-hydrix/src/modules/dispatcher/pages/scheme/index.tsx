import "./index.scss";
// import leftScheme from '@assets/imgs/scheme-left.jpg'
// import rightScheme from '@assets/imgs/scheme-right.jpg'
import { useState } from 'react';
import SchemeViewer from "./tabs/scheme/ViewScheme.js";

// data
import { InformationsComponents, points } from "./data/data.js";
import { HardWareStatus, InformationsComponentsType } from "./types/type.js";
import { TableScheme } from "./tabs/table/index.js";
import HardwareCard from "../../components/info-hardware/index.js";




export const Scheme = () => {
    const [fade, setFade] = useState(false);
    const [focusHardware, setFocusHardware] = useState<number>(0);
    const [panelInfoComponent, setPanelInfoComponent] = useState<InformationsComponentsType>({ title: '', img: '', items: [] });

    const handleChangeImage = (id: number) => {
        setFade(true);
        if (focusHardware == id) {
            setFocusHardware(0)
        } else {
            setFocusHardware(id)
        }
        setPanelInfoComponent(id == 0 ? { title: '', img: '', items: [] } : InformationsComponents[id - 1]);
        setFade(false);

        // setTimeout(() => {
        //     setFocusHardware(0)
        //     setPanelInfoComponent(id == 0 ? { title: '', img: '', items: [] } : InformationsComponents[id - 1]);
        //     setFade(false);
        // }, 300);
    };

    const [nubmerTab, setNumberTab] = useState<number>(0);


    const getRandomStatus = (): HardWareStatus => {
        const statuses = [HardWareStatus.OK, HardWareStatus.WORK, HardWareStatus.ERROR];
        const randomIndex = Math.floor(Math.random() * statuses.length);
        return statuses[randomIndex];
    };


    setInterval(() => {
        points[points.length - 1].status = getRandomStatus()
    }, 2000)

    return (
        <>
            <div className="informations-dispatch__scheme scheme-dispatch relative mt-10">
                <div className="absolute  top-[-38px] left-[30px] flex gap-3">
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 0 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setNumberTab(0)}>
                        Технологическое оборудование
                    </div>
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 1 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setNumberTab(1)}>
                        Отопление
                    </div>
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 2 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setNumberTab(2)}>
                        Вентиляция
                    </div>
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 3 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setNumberTab(3)}>
                        СКУД
                    </div>
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 4 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setNumberTab(4)}>
                        Охрано-пожарная сигнализация
                    </div>
                    <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 5 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => setNumberTab(5)}>
                        Тестовая таблица
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-[20px] h-full pb-[80px]">

                    {nubmerTab != 5 && <SchemeViewer setInfo={handleChangeImage} points={points} />}
                    {nubmerTab == 5 && <TableScheme />}

                    {focusHardware != 0 && <HardwareCard className={`panel-scheme__info ${fade ? "fade-out" : "fade-in"}`} item={panelInfoComponent} onClick={handleChangeImage} />}
                </div>
            </div >
        </>
    )
}