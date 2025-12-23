import image from '../../assets/scheme.png'
import image2 from '../../assets/scheme2-need.png'

import accident from '../../assets/icons/accident.svg'

import "./ViewScheme.scss";
import { observer } from "mobx-react-lite";
import { scheme1DataPoints, scheme2DataPoints } from './data/data';
import { useScheme } from './hooks/useScheme';
import { schemeModel } from '../../model/scheme-model';
import { SchemeViewerType } from '../../types/type';
import { useEffect } from 'react';
import { Role } from '@/entities/user/role';
import { useAuth } from '@/entities/user/context';


export const SchemeViewer = observer(({ setInfo, points, tabScheme, setSchemeObjectData, switchColo, listSensore }: SchemeViewerType) => {
    const { containerRef, imgRef, scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp, lockScroll, unlockScroll, getPhoto, onTouchStart, onTouchMove, onTouchEnd } = useScheme(1);

    const { timesFunctions, model } = schemeModel
    const { user } = useAuth()


    useEffect(() => {
        const intervalId = setInterval(() => {
            timesFunctions()
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);



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

                {model.map((p, _) => p.hardwareSchemaId == tabScheme && (
                    <div
                        key={p.id}
                        onDoubleClickCapture={() => { if (user?.roleId !== Role.Guest) setSchemeObjectData(p.id) }}
                        onClick={() => setInfo(p.hardwareId)}
                        className="absolute cursor-pointer z-3"
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

                                {/* {p.id === 14 && <img className="not-hover h-full w-full object-cover" src={getPhoto(switchColo ? p.greenFileId : p.redFileId)} />} */}

                                {p.focusFileId && <img className="not-hover h-full w-full object-cover" src={getPhoto(p.focusFileId)} />}
                            </div>


                            {p.id === 14 && !switchColo &&
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

                {/* {listSensore.map((point, key) => (
                    <div className="relative" key={point.id} style={{ top: point.top + "%", left: point.left + "%", position: "absolute", zIndex: 8 }}>
                        <div className="not-hover max-w-[150px] bg-gray-700 backdrop-blur-sm border border-gray-800 text-white text-xs font-sans z-8 rounded-lg px-1.5 py-1 shadow-sm">
                            <div className="text-[10px] uppercase tracking-wide text-gray-100 mb-0">{point.nodeName}</div>
                            <div className="flex items-baseline gap-1">
                                <span className=" text-emerald-400 font-semibold ">{point.value}</span>
                                <span className="text-[10px] text-gray-400">{point.measurementName}</span>
                            </div>
                        </div>
                    </div>
                ))} */}

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