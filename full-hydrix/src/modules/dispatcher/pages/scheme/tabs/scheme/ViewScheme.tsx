import React, { useRef, useState, useEffect } from "react";
import image from '../../assets/big.jpg'
import "./ViewScheme.scss";
import { CountersType, HardWareStatus, SchemeViewerType } from "../../types/type";
import { CountersData } from "../../data/data";


import accident from './icons/accident.svg';
import autoControl from './icons/auto-control.svg';
import block from './icons/block.svg';
import manualControl from './icons/manual-control.svg';


export default function SchemeViewer({ setInfo, points }: SchemeViewerType) {


    // Счётчики

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


    const getPhoto = (name: string): string => {
        return `src/modules/dispatcher/pages/scheme/tabs/scheme/hardware-images/${name}.jpg`;
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
            className="scheme-view__container"
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
                <img
                    ref={imgRef}
                    src={image}
                    alt="scheme"
                    className="scheme-view__image"
                    onLoad={updateBounds}
                />

                {points.map((p, i) => (
                    <div
                        onClick={() => setInfo(p.id)}
                        key={i}
                        className="absolute cursor-pointer"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: p.size[0],
                            height: p.size[1],

                            // backgroundColor: "#ff4d4f",
                            // border: "2px solid white",
                        }}
                    >

                        <div className="relative w-full h-full">
                            {p.accident && <img className="!min-w-[2px] !h-auto !max-w-[10px] mr-auto mb-auto absolute" src={accident} alt=""
                                style={{
                                    bottom: p.size[1] > 25 ? "0" : (p.size[1] / p.size[0] > 2 ? "0" : (p.size[0] / p.size[1] < 2 ? "0" : "-70%")),
                                    left: "0"
                                }} />}
                            {p.control && <img className="!w-[8px] !h-[8px] absolute" src={p.control.type == "auto" ? autoControl : manualControl} alt=""
                                style={{
                                    top: p.control.top,
                                    left: p.control.left,
                                }}
                            />}
                            {p.image && (
                                <div className="hover:scale-[1.2] duration-300">
                                    <img className="h-full w-full object-cover" src={getPhoto(p.image + addPhotoStatus(p.status))} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {counters.map((c) => (
                    <div
                        key={c.id}
                        className="scheme-counter"
                        style={{ top: c.top, left: c.left, position: "absolute" }}
                    >
                        <div className="scheme-counter__name">{c.name}</div>
                        <div className="scheme-counter__value">
                            <span>{c.value}</span>{c.unit}
                        </div>
                    </div>
                ))}

            </div>
        </div >
    );
}
