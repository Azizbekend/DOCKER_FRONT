import image from '../assets/scheme.png'
import image2 from '../assets/scheme2-need.png'

import accident from '../assets/icons/accident.svg'

import "./ViewScheme.scss";
import { SchemeViewerType } from "../types/type";
import { observer } from "mobx-react-lite";
import { schemeModel } from "../model/scheme-model";
import { scheme1DataPoints, scheme2DataPoints } from './data/data';
import { useScheme } from './hooks/useScheme';


export const SchemeViewer = observer(({ setInfo, points, tabScheme }: SchemeViewerType) => {
    const { setFocusSchemeObject } = schemeModel

    const { containerRef, imgRef, scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp, lockScroll, unlockScroll, getPhoto, onTouchStart, onTouchMove, onTouchEnd } = useScheme(1);


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         console.log('hi')
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);



    return (
        <div
            className="scheme-view__container p-10 overflow-hidden h-full"
            ref={containerRef}

            onWheel={(e) => onWheel(e)}
            onMouseLeave={unlockScroll}
            onMouseOver={lockScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}


            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}

        >
            <div className="scheme-view__wrapper"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: "top left",
                }}
            >

                {points.map((p, _) => p.hardwareSchemaId == tabScheme && (
                    <div
                        key={p.id}
                        onDoubleClickCapture={() => setFocusSchemeObject(p.id, tabScheme)}
                        onClick={() => setInfo(p.hardwareId)}
                        className="absolute cursor-pointer z-10"
                        style={{
                            top: p.top + "%",
                            left: p.left + "%",
                            width: p.width + "px",
                            height: p.height + "px",
                        }}
                    >
                        <div className="relative w-full h-full">
                            <div className="hover:translate-x-[10px] hover:scale-[1.1] duration-300">
                                {/* 48 - Красный */}
                                {/* 169 - Зелёный */}
                                {/* 170 - сервый */}
                                <img className="not-hover h-full w-full object-cover" src={getPhoto(p.id === 14 ? p.redFileId : p.fileId)} />
                            </div>


                            {p.id === 14 &&
                                <div className='absolute top-[20%] left-[-30%] w-[30%]'>
                                    <img src={accident} alt="" />
                                </div>
                            }
                        </div>
                    </div>
                ))}

                <img ref={imgRef}
                    src={tabScheme == 6 ? image : image2}
                    alt="scheme"
                    className="scheme-view__image"
                />

                {tabScheme == 6 && scheme1DataPoints.map((point, key) => (
                    <div className="relative" key={key} style={{ top: point.top, left: point.left, position: "absolute", zIndex: 5 }}>
                        <div className="not-hover bg-gray-700 backdrop-blur-sm border border-gray-800 text-white text-xs font-sans z-8 rounded-lg px-1.5 py-1 shadow-sm">
                            <div className="text-[10px] uppercase tracking-wide text-gray-100 mb-0">{point.name}</div>
                            <div className="flex items-baseline gap-1">
                                <span className=" text-emerald-400 font-semibold ">{point.value}</span>
                                <span className="text-[10px] text-gray-400">{point.type}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {tabScheme != 6 && scheme2DataPoints.map((point, key) => (
                    <div className="relative" key={key} style={{ top: point.top, left: point.left, position: "absolute", zIndex: 5 }}>
                        <div className="not-hover bg-gray-700 backdrop-blur-sm border border-gray-800 text-white text-xs font-sans z-8 rounded-lg px-1.5 py-1 shadow-sm">
                            <div className="text-[10px] uppercase tracking-wide text-gray-100 mb-0">{point.name}</div>
                            <div className="flex items-baseline gap-1">
                                <span className=" text-emerald-400 font-semibold ">{point.value}</span>
                                <span className="text-[10px] text-gray-400">{point.type}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
)