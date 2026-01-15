import { Icon } from "@/shared/ui/icon";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import HardwareStatistics from "../../components/hardware-statistic";
import { eventLog } from "@/features/hardware/data";
import { getStatusClass, getValue } from "../../functions/functions";
import { HardwarePassportProps } from "@/entities/hardware/type";
import { getHardwareStatus } from "../../components/hardware-status";
import accident from "@/app/static/img/accident.svg";
import { Link } from "react-router-dom";

export const HardwarePassport = observer(({ getInfoNodeInfoAll, model, documents, сharacteristic, commandsInfo, isConnected, incidentList, status }: HardwarePassportProps) => {

    useEffect(() => {
        getInfoNodeInfoAll();
        const interval = setInterval(getInfoNodeInfoAll, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white shadow-sm py-2 px-2">
                    <div className="relative overflow-hidden mb-6 rounded-2xl bg-gray-100 p-2">
                        <img src={`https://triapi.ru/research/api/FileStorage/images/download?id=${model?.fileId || ''}`} alt="Оборудование"
                            className="w-30 h-60 object-cover center mx-auto rounded-2xl"
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/400x224/e2e8f0/94a3b8?text=Изображение\nнедоступно";
                                e.currentTarget.className = "w-full h-56 object-contain";
                            }}
                        />

                        {/* <div className="flex justify-between items-center gap-2"> */}
                            {/* <p className="text-sm text-gray-600">Статус подключения к ИАС</p> */}
                            <span className={`absolute right-4 top-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${true ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                {true ? 'Подключено' : 'Не подключено'}
                            </span>
                        {/* </div> */}
                    </div>

                    {getHardwareStatus({
                        status: status,
                        incidentCount: incidentList.length,
                        className: { container: "mb-5 py-3 px-6 justify-center  rounded-2xl !bg-gray-100" }
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
                </div>

                {(сharacteristic.length > 0 || commandsInfo.length > 0) && (
                    <div className="rounded-2xl bg-white shadow-sm p-6">
                        <h3 className="font-bold text-gray-800 mb-5">Характеристики</h3>
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
                    </div>
                )}

                <div className="space-y-4">

                    <div className="rounded-2xl bg-white shadow-sm p-6">

                        <h2 className=" pb-6 text-xl font-bold text-gray-800">{model.name || '—'}</h2>

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
                    </div>
                    {documents.length > 0 &&
                        <div className="rounded-2xl bg-white shadow-sm p-5">
                            <h3 className="font-bold text-gray-800 mb-4">Документация</h3>
                            <div className="space-y-2">
                                {documents.map((item, key) => (
                                    <a key={key} href={"https://triapi.ru/research/api/FileStorage/document/download?id=" + item.id} download={true} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150 cursor-pointer">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Icon systemName="docs" className="text-blue-700" />
                                        </div>
                                        <span className="text-gray-800 font-medium">{item.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    }
                    <div className="rounded-2xl bg-white shadow-sm p-5">
                        <h3 className="font-bold text-gray-800 mb-4">Журнал событий</h3>
                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                            {eventLog.map((event, idx) => (
                                <div
                                    key={idx}
                                    className="border bg-white p-3 rounded-lg border-l-4"
                                    style={{
                                        borderLeftColor: event.status === 'warning' ? '#f87171' :
                                            event.status === 'success' ? '#4ade80' :
                                                event.status === 'info' ? '#60a5fa' : '#9ca3af'
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs text-gray-500 font-mono">{event.timestamp}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusClass(event.status).badge
                                            } ${getStatusClass(event.status).border}`}>
                                            {event.action}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                                    <p className="text-xs text-gray-500 mt-1">Инициатор: {event.initiator}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <HardwareStatistics />

            </div>
        </div>
    );
});