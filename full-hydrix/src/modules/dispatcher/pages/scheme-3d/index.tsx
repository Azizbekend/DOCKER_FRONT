import "./index.scss";
// import leftScheme from '@assets/imgs/scheme-left.jpg'
// import rightScheme from '@assets/imgs/scheme-right.jpg'
import { useEffect, useState } from 'react';
import { SchemeViewer } from "./tabs/scheme/ViewScheme.js";

// data
import { points } from "./data/data.js";
import { HardWareStatus } from "./types/type.js";
import { HardwareCard } from "../../components/info-hardware/index.js";
import { schemeModel } from "./model/scheme-model.js";
import { observer } from "mobx-react-lite";
import { FormSchemaObject } from "./components/form-schema-object.js";
import { passportObjectAll, schemaAll, schemaCreate } from "@/entities/hardware/api.js";


export const Scheme = observer(() => {

    const { init, list, focusHardware, setFocusHardware, focusSchemeObject } = schemeModel

    const [tabScheme, setTabScheme] = useState<number>(6)

    useEffect(() => {
        init(6)
    }, [])

    const [fade, setFade] = useState(false);


    const handleChangeImage = (id: number) => {
        setFade(true);
        if (focusHardware == id) {
            setFocusHardware(0)
        } else {
            setFocusHardware(id)
        }
        setFade(false);
    };

    const [nubmerTab, setNumberTab] = useState<number>(0);

    // const getRandomStatus = (): HardWareStatus => {
    //     const statuses = [HardWareStatus.OK, HardWareStatus.WORK, HardWareStatus.ERROR];
    //     const randomIndex = Math.floor(Math.random() * statuses.length);
    //     return statuses[randomIndex];
    // };

    // setInterval(() => {
    //     points[points.length - 1].status = getRandomStatus()
    // }, 2000)


    return (
        <div className="informations-dispatch__scheme scheme-dispatch !h-[90vh] relative mt-10">
            <div className="absolute  top-[-38px] left-[30px] flex gap-3">
                <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 0 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => { setNumberTab(0); setTabScheme(6) }}>
                    Механическая очистка
                </div>
                <div className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${nubmerTab == 1 ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`} onClick={() => { setNumberTab(1); setTabScheme(7) }}>
                    Биологическая очистка
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
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-[20px] h-full pb-[80px]">
                {nubmerTab != 5 && <SchemeViewer setInfo={handleChangeImage} points={list} tabScheme={tabScheme} />}
                {focusHardware != 0 && focusSchemeObject == 0 && <HardwareCard key={focusHardware} className={`panel-scheme__info ${fade ? "fade-out" : "fade-in"}`} id={focusHardware} onClick={handleChangeImage} />}
                {focusSchemeObject != 0 && <FormSchemaObject key={focusSchemeObject} className={`panel-scheme__info ${fade ? "fade-out" : "fade-in"}`} onClick={handleChangeImage} />}
            </div>
        </div >
    )
})  