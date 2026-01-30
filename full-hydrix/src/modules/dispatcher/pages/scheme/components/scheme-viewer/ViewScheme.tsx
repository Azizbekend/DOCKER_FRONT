import image from '../../assets/scheme.png'
import image2 from '../../assets/scheme-biological.png'
import image3 from '../../assets/scheme-post-cleaning.png'
import accident from '../../assets/icons/accident.svg'
import "./ViewScheme.scss";
import { observer } from "mobx-react-lite";
import { useScheme } from './hooks/useScheme';
import { SchemeViewerType } from '../../types/type';
import { useEffect } from 'react';
import { Role } from '@/packages/entities/user/enums';
import { useAuth } from '@/packages/entities/user/context';
import { SchemaCardInterface } from '@/packages/entities/sensor/type';


export const SchemeViewer = observer(({ timesFunctions, model, setInfo, tabScheme, setSchemeObjectData, listSensore, setSchemeSensoreData }: SchemeViewerType) => {
    const { containerRef, imgRef, scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp, lockScroll, unlockScroll, getPhoto, onTouchStart, onTouchMove, onTouchEnd } = useScheme(1);
    const { user } = useAuth()

    const getMaxNodeNameLength = (listSensoresScheme: SchemaCardInterface[]) => {
        let maxLenth = 0;
        listSensoresScheme.forEach(element => {
            maxLenth = element.nodeName!.length > maxLenth ? element.nodeName!.length : maxLenth
        });
        return maxLenth * 7;
    };

    let maxLengthSensore: number = getMaxNodeNameLength(listSensore)

    useEffect(() => {
        const intervalId = setInterval(() => {
            timesFunctions()
        }, 3000);

        return () => { clearInterval(intervalId) };
    }, []);

    const getSchemePhoto = (id: number) => {
        switch (id) {
            case 6:
                return image
            case 8:
                return image2
            case 9:
                return image3
        }
    }

    return (
        <div
            className="scheme-view__container p-10 overflow-hidden h-full "
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
                    <div key={p.id}
                        onDoubleClickCapture={() => { if (user?.login == "admin_god") setSchemeObjectData(p.id) }}
                        onClick={() => setInfo(p.hardwareId, p.status)}
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
                                {/* {p.serviceStatus && <div className={`absolute ${p.width > 40 ? (p.width < 300 ? "-right-[0%] -top-[5%]" : "-left-[0%] -top-[5%]") : "-left-[20%] -top-[20%]"}`} */}
                                {(p.hardwareId == 28 || p.hardwareId == 26) && p.serviceStatus && <div className={`absolute ${p.width < 300 ? "-right-[0%] -top-[5%]" : "-left-[0%] -top-[5%]"}`}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        // width: `${Math.min(p.width * 0.3, 100)}px`,
                                        // height: `${Math.min(p.height * 0.3, 100)}px`,
                                        // maxWidth: '50px',
                                        // maxHeight: '50px',
                                        // minWidth: '10px',
                                        // minHeight: '10px',
                                    }}
                                >
                                    <img src={accident} alt="" />
                                </div>}

                                <img className="not-hover h-full w-full " src={getPhoto(p.focusFileId || p.fileId)} />
                            </div>
                        </div>
                    </div>
                ))}

                {listSensore.map((point, key) => point.schemeId == tabScheme && (
                    <div className="relative" key={point.id} style={{ top: point.top + "%", left: point.left + "%", position: "absolute", zIndex: 8 }}
                        onDoubleClickCapture={() => { if (user?.roleId !== Role.Guest) setSchemeSensoreData(Number(point.id)) }}>
                        <div className={`not-hover ax-w-[150px]  bg-gray-700 backdrop-blur-sm border border-gray-800 text-white font-sans z-8 rounded-lg px-1.5 py-1 shadow-sm`}
                            style={{ width: maxLengthSensore + "px" }}
                            onClick={() => setInfo(Number(point.hardwareId), point.hardwareStatus)}>

                            <div className='relative'>
                                <div className="text-[7px] uppercase tracking-wide text-gray-100 mb-0 text-center">{point.nodeName}</div>
                                <div className="flex items-baseline gap-1 justify-center">
                                    <span className="text-[9px] text-emerald-400 font-semibold ">{point.value}</span>
                                    <span className="text-[9px] text-gray-400">{point.measurementName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <img ref={imgRef} src={getSchemePhoto(tabScheme)} alt="scheme" className="scheme-view__image" />

            </div>
        </div >
    );
}
)