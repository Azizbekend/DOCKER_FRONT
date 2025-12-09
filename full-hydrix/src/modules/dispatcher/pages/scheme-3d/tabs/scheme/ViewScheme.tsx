import React, { useRef, useState, useEffect } from "react";

import image from '../../assets/scheme.png'
import image2 from '../../assets/scheme2-need.png'
import image3 from '../../assets/sssss.png'


import "./ViewScheme.scss";
import { CountersType, HardWareStatus, SchemeViewerType } from "../../types/type";
import { CountersData } from "../../data/data";


import accident from './icons/accident.svg';
import autoControl from './icons/auto-control.svg';
import block from './icons/block.svg';
import manualControl from './icons/manual-control.svg';
import { hardwareModel } from "@/entities/hardware/model";
import { observer } from "mobx-react-lite";
import { schemeModel } from "../../model/scheme-model";


export const SchemeViewer = observer(({ setInfo, points, tabScheme }: SchemeViewerType) => {


    // Счётчики
    const { setFocusSchemeObject } = schemeModel

    const [counters, setCounters] = useState<CountersType[]>(CountersData);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounters((prev: any) =>
                prev.map((c: CountersType) => ({
                    ...c,
                    value: (Math.random() * (c.max - c.min) + c.min).toFixed(1),
                }))
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    // end Счётчики




    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [scale, setScale] = useState(1.6);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });
    const [bounds, setBounds] = useState({ minX: 0, minY: 0, maxX: 0, maxY: 0 });

    const toggleBodyScroll = (disable: boolean) => {
        document.body.style.overflow = disable ? "hidden" : "";
    };

    const disableBodyScroll = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };



    const updateBounds = () => {
        if (!containerRef.current || !imgRef.current) return;
        const container = containerRef.current;
        const img = imgRef.current;
        if (!container || !img) return;

        const containerWidth = container?.clientWidth;
        const containerHeight = container?.clientHeight;
        const imageWidth = img.naturalWidth * scale;
        const imageHeight = img.naturalHeight * scale;

        // границы, чтобы картинка не ушла за экран
        const minX = containerWidth - imageWidth;
        const minY = containerHeight - imageHeight;

        setBounds({
            minX,
            minY,
            maxX: 0,
            maxY: 0,
        });

        // проверяем, что offset в допустимых пределах
        setOffset((prev) => ({
            x: Math.min(Math.max(prev.x, minX), 0),
            y: Math.min(Math.max(prev.y, minY), 0),
        }));
    };

    useEffect(() => {
        updateBounds();
        window.addEventListener("resize", updateBounds);
        return () => window.removeEventListener("resize", updateBounds);
    }, [scale]);

    const handleWheel = (e) => {
        e.preventDefault();
        toggleBodyScroll(true);
        disableBodyScroll()

        const zoom = e.deltaY > 0 ? 0.7 : 1.1;
        setScale((prev) => Math.min(Math.max(prev * zoom, 1), 5));

        clearTimeout(handleWheel.timeout);
        // handleWheel.timeout = setTimeout(() => toggleBodyScroll(false), 200);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);

        setStart({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const newX = e.clientX - start.x;
        const newY = e.clientY - start.y;

        // ограничиваем движение в пределах bounds
        setOffset({
            x: Math.min(Math.max(newX, bounds.minX), bounds.maxX),
            y: Math.min(Math.max(newY, bounds.minY), bounds.maxY),
        });
    };

    const handleMouseUp = () => {
        enableBodyScroll()
        toggleBodyScroll(false);
        setDragging(false)
    };


    const getPhoto = (name: string | null): string => {
        return `src/modules/dispatcher/pages/scheme-3d/tabs/scheme/hardware-images/${name}`;
    };

    const addPhotoStatus = (status: HardWareStatus | undefined) => {
        if (status) {
            switch (status) {
                case HardWareStatus.OK:
                    return ""
                case HardWareStatus.WORK:
                    return "-work"
                case HardWareStatus.ERROR:
                    return "-error"
            }
        }
    }

    return (

        <div
            className="scheme-view__container p-10 overflow-hidden"
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="scheme-view__wrapper"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: "top left",
                    cursor: dragging ? "grabbing" : "grab",
                }}
            >


                {/* <div
                    onClick={() => setInfo(12)}
                    // key={i}
                    className="absolute cursor-pointer"
                    style={{
                        top: "48%",
                        left: "61%",
                        width: "75px",
                        // height: "350px",
                        // backgroundColor: "#ff4d4f",
                        // border: "2px solid white",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="hover:translate-x-[10px] hover:scale-[1.1] duration-300">
                            <img className="h-full w-full object-cover" src="src/modules/dispatcher/pages/scheme-3d/tabs/scheme/hardware-images/wwww.png" />
                        </div>
                    </div>
                </div> */}

                {points.map((p, i) => p.hardwareSchemaId == tabScheme && (
                    <div
                        key={p.id}
                        onDoubleClickCapture={() => setFocusSchemeObject(p.id, tabScheme)}
                        onClick={() => setInfo(p.hardwareId)}
                        className="absolute cursor-pointer z-10"
                        style={{
                            // top: "73.5%",
                            // left: "45.5%",
                            // width: "144px",
                            // height: "350px",
                            // backgroundColor: "#ff4d4f",
                            // border: "2px solid white",

                            top: p.top + "%",
                            left: p.left + "%",
                            width: p.width + "px",
                            height: p.height + "px",
                        }}
                    >
                        <div className="relative w-full h-full">
                            <div className="hover:translate-x-[10px] hover:scale-[1.1] duration-300">
                                <img className="not-hover-img h-full w-full object-cover" src={`https://triapi.ru/research/api/FileStorage/images/download?id=${p.fileId}`} />
                            </div>
                        </div>
                    </div>
                ))}
                <img
                    ref={imgRef}
                    src={tabScheme == 6 ? image : image2}
                    alt="scheme"
                    className="scheme-view__image"
                    onLoad={updateBounds}

                    style={{
                        zIndex: 5
                    }}
                />


                {
                    tabScheme == 6 && <>
                        <div
                            className="relative"
                            style={{ top: "42%", left: "16%", position: "absolute" }}
                        >
                            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 text-white text-xs font-sans z-10 rounded-lg px-3 py-1.5 shadow-sm">
                                <div className="text-[12px] uppercase tracking-wide text-gray-100 mb-0.5">ДАВЛЕНИЕ</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-emerald-400 font-semibold text-base">20.2</span>
                                    <span className="text-gray-400">бар</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative"
                            style={{ top: "20%", left: "20%", position: "absolute" }}
                        >
                            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 text-white text-xs font-sans z-10 rounded-lg px-3 py-1.5 shadow-sm">
                                <div className="text-[12px] uppercase tracking-wide text-gray-100 mb-0.5">ДАВЛЕНИЕ</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-emerald-400 font-semibold text-base">20.2</span>
                                    <span className="text-gray-400">бар</span>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    );
}
)