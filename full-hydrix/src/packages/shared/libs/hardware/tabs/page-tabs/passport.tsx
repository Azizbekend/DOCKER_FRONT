import { Icon } from "@/packages/shared-ui/icon";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { getValue } from "../../functions/functions";
import { HardwarePassportProps } from "@/packages/entities/hardware/type";
import { getHardwareStatus } from "../../components/hardware-status";
import accident from "@/app/static/img/accident.svg";
import { Link } from "react-router-dom";
import { PassportBlockContainer } from "../../components/passport-block-container";
import { svodStatistics } from "@/packages/entities/hardware/data";
import { LogEventCard } from "@/packages/shared-components/log-event-card";
import { Button } from "@/packages/shared-ui/button/button";
import { HardwareEventsPanel } from "./events-panel";

export const HardwarePassport = observer(({ getInfoNodeInfoAll, evengLogLinksTo, model, documents, сharacteristic, commandsInfo, incidentList, status, evengLog = "none" }: HardwarePassportProps) => {

    useEffect(() => {
        getInfoNodeInfoAll();
        const interval = setInterval(getInfoNodeInfoAll, 3000);
        return () => clearInterval(interval);
    }, []);

    const [show, setShow] = useState(false);


    return (
        <>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 relative">
                <div className="space-y-4">
                    <PassportBlockContainer className="p-3"
                        children={
                            <>
                                <div className="relative overflow-hidden mb-6 rounded-2xl bg-gray-100">
                                    <img src={`https://triapi.ru/research/api/FileStorage/images/download?id=${model?.fileId || ''}`} alt="Оборудование"
                                        className="w-30 h-60 object-cover center mx-auto rounded-2xl"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/400x224/e2e8f0/94a3b8?text=Изображение\nнедоступно";
                                            e.currentTarget.className = "w-full h-56 object-contain";
                                        }}
                                    />
                                    <span className={`absolute right-4 top-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        <span className={`w-2 h-2 rounded-full mr-2 ${true ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {true ? 'Подключено' : 'Не подключено'}
                                    </span>
                                </div>

                                {getHardwareStatus({
                                    status: status,
                                    incidentCount: incidentList.length,
                                    className: { container: "mb-5 py-3 px-6 justify-center rounded-2xl !bg-gray-100" }
                                })}

                                {incidentList.length > 0 && incidentList.map((incident, _) => {
                                    return (
                                        <div key={incident.nodeId} className="mt-3">
                                            <div className="border border-red-300 bg-red-50 rounded-lg mb-5 p-4 flex items-start gap-3">
                                                <img src={accident} alt="Авария" width={24} height={24} />
                                                <div className="text-red-800 font-medium">
                                                    {incident.nodeName}
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mb-4">
                                                <div className="w-full py-2 text-center rounded-lg bg-green-500 text-white hover:opacity-50 duration-300 cursor-pointer">Устранено</div>
                                                <Link to={'/dispatcher/orders/create/form'} className="w-full py-2 text-center rounded-lg bg-gray-500 text-white hover:opacity-50 duration-300 cursor-pointer">Создать заявку</Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }
                    />

                    <PassportBlockContainer className="p-6"
                        children={
                            <>
                                <h2 className="pb-6 text-xl font-bold text-gray-800">{model.name || '—'}</h2>
                                <div className="space-y-4">
                                    <div className={`info-comp__item border-b border-gray-300 pb-4 `}>
                                        <div className="info-comp__title">Модель</div>
                                        <div className="info-comp__description">{model.model || '—'}</div>
                                    </div>
                                    <div className={`info-comp__item border-b border-gray-300 pb-4 `}>
                                        <div className="info-comp__title">Поставщик</div>
                                        <div className="info-comp__description">{model.supplierName || '—'}</div>
                                    </div>
                                    <div className={`info-comp__item border-b border-gray-300 pb-4 `}>
                                        <div className="info-comp__title">Производитель</div>
                                        <div className="info-comp__description">{model.developerName || '—'}</div>
                                    </div>
                                </div>
                            </>
                        }
                    />

                    {documents.length > 0 &&
                        <PassportBlockContainer className="p-6"
                            title="Документация"
                            children={
                                <div className="space-y-2">
                                    {documents.map((item, key) => (
                                        <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150 cursor-pointer">
                                            {/* // <a key={key} href={"https://triapi.ru/research/api/FileStorage/document/download?id=" + item.id} download={true} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150 cursor-pointer"> */}
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Icon systemName="docs" className="text-blue-700" />
                                            </div>
                                            <span className="text-gray-800 font-medium">{item.title}</span>
                                            {/* // </a> */}
                                        </div>
                                    ))}
                                </div>
                            }
                        />
                    }
                </div>

                <div className="space-y-4">
                    {(сharacteristic.length > 0 || commandsInfo.length > 0) && (
                        <PassportBlockContainer className="p-6"
                            title="Характеристики"
                            children={
                                <div className="space-y-4">
                                    {сharacteristic.map((item, key) => {
                                        return (
                                            <div className={`info-comp__item ${(сharacteristic.length > 1 || commandsInfo.length > 1) && "border-b border-gray-300 pb-4"} `} key={key}>
                                                <div className="info-comp__title">{item.name}</div>
                                                <div className="info-comp__description">{item.value}</div>
                                            </div>
                                        )
                                    })}

                                    {commandsInfo.map((item, key) => {
                                        return ((item.name != "Состояние") &&
                                            <div className={`info-comp__item ${commandsInfo.length > 1 && "border-b border-gray-300 pb-4"}`} key={key}>
                                                <div className="info-comp__title">{item.name}</div>

                                                <div className='flex'>
                                                    <div className="info-comp__description">{getValue(item.name, item.value)}</div>
                                                    {item.mesurement.trim().length != 0 &&
                                                        <span className='ml-[3px]'>
                                                            {item.mesurement}
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        />
                    )}

                    <PassportBlockContainer className="p-6"
                        title="Сводная статистика"
                        children={
                            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                                {svodStatistics.map((item, key) =>
                                    <div className="bg-gray-200 rounded-[12px] p-[16px] text-[13px]">{item.label}<br /><b className="mt-[6px] text-[18px]">{item.value}</b></div>
                                )}
                            </div>
                        }
                    />


                    {evengLog != "none" &&
                        <PassportBlockContainer className="p-4"
                            title={
                                <div className="mb-5 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800">Журнал событий</h3>
                                    <div className="text-right">
                                        {/* <Link to={evengLogLinksTo} className="text-[#4A85F6] text-sm font-medium hover:underline">
                                        Показать все →
                                    </Link> */}
                                        <Button class="text-[#4A85F6] text-sm font-medium hover:underline" onClick={() => setShow(!show)}>
                                            Показать все →
                                        </Button>
                                    </div>
                                </div>
                            }
                            children={evengLog.length > 0 ?
                                <div className="space-y-2 mb-3 max-h-[400px] overflow-y-auto">
                                    {evengLog && evengLog.map((event, key) => (<LogEventCard event={event} key={key} />))}
                                </div>
                                :
                                <div className="text-center text-gray-500">
                                    Нет данных
                                </div>
                            }
                        />
                    }
                </div>

                {show && <HardwareEventsPanel hardwareId={model.id} show={show} setShow={setShow} />}

            </div >
        </>
    );
});
