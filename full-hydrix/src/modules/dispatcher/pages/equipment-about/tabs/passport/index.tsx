import { Icon } from "@/shared/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/entities/hardware/model";
import { Button } from "@/shared/ui/button";
import { hardwareListModel } from "../../../equipment/model/hardware-list-model";
import { ModalServiceCreate } from "../../../equipment/components/modal-service-create";
import { Documents } from "@/entities/hardware/api";

export const EquipmentPassport = observer(() => {
    const { model, documents, сharacteristic, commandsInfo } = hardwareModel;
    const { modalService, closeModal } = hardwareListModel;
    const navigate = useNavigate();

    // Статус подключения
    const isConnected = false; // заменить на реальное значение при интеграции

    // Расширенный журнал событий (аналогично странице "Управление")
    const eventLog = [
        {
            timestamp: "08.12.2025 12:34",
            action: "Отключение",
            initiator: "Система защиты",
            status: "warning",
            description: "Аварийное отключение из-за превышения давления"
        },
        {
            timestamp: "05.12.2025 12:36",
            action: "Запуск",
            initiator: "Оператор Иванов И.И.",
            status: "success",
            description: "Ручной запуск после устранения неисправности"
        },
        {
            timestamp: "05.12.2025 12:10",
            action: "ТО1",
            initiator: "Служба техобслуживания",
            status: "info",
            description: "Плановое техническое обслуживание (уровень 1)"
        },
        {
            timestamp: "01.12.2025 09:22",
            action: "Изменение параметра",
            initiator: "Диспетчер Сидоров А.В.",
            status: "neutral",
            description: "Установлен расход 150 м³/ч"
        }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'warning': return 'text-red-700 bg-red-100';
            case 'success': return 'text-green-700 bg-green-100';
            case 'info': return 'text-blue-700 bg-blue-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 min-h-[80vh]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
            <ModalServiceCreate isOpen={modalService} setShow={closeModal} />

            {/* Top Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-3 z-10">
                <Link
                    to="/dispatcher/orders/create"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#4A85F6] text-white rounded-lg font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
                >
                    <Icon systemName="file-plus" />
                    Создать заявку
                </Link>

                <Button
                    class="px-4 py-2.5 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors shadow-sm"
                    onClick={() => hardwareListModel.setModalService(true, model.id)}
                >
                    + сервис
                </Button>

                <Button
                    class="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    onClick={() => navigate(`/dispatcher/equipment/form/${model.id}`)}
                >
                    <Icon systemName="edit-white" width={20} height={20} />
                </Button>
            </div>

            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <Link
                    to="/dispatcher/equipment"
                    className="flex items-center justify-center w-10 h-10 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
                >
                    <Icon systemName="arrow-left" className="text-white" />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Паспорт оборудования</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-7">
                    {/* Image */}
                    <div className="py-2 rounded-xl overflow-hidden border border-gray-200 ">
                        <img
                            src={`https://triapi.ru/research/api/FileStorage/images/download?id=${model?.fileId || ''}`}
                            alt="Оборудование"
                            className="w-30 h-60 object-cover center mx-auto"
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/400x224/e2e8f0/94a3b8?text=Изображение\nнедоступно";
                                e.currentTarget.className = "w-full h-56 object-contain bg-gray-100";
                            }}
                        />
                    </div>

                    {/* Connection Status */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Статус подключения к ИАС</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                }`}></span>
                            {isConnected ? 'Подключено' : 'Не подключено'}
                        </span>
                    </div>

                    {/* Documentation */}
                    {
                        documents.length > 0 &&
                        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
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
                    }
                        </div>

                    {/* Enhanced Event Log — как в "Управление" */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h3 className="font-bold text-gray-800 mb-4">Журнал событий</h3>
                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                            {eventLog.map((event, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-3 rounded-lg border-l-4"
                                    style={{
                                        borderLeftColor: event.status === 'warning' ? '#f87171' :
                                            event.status === 'success' ? '#4ade80' :
                                                event.status === 'info' ? '#60a5fa' : '#9ca3af'
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs text-gray-500 font-mono">{event.timestamp}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusClass(event.status).split(' ')[0]
                                            } ${getStatusClass(event.status).split(' ')[1]}`}>
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

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Equipment Name */}
                    <div className="pb-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">{model.name || '—'}</h2>
                    </div>

                    {/* General Info */}
                    <div className="max-w-[700px] p-6 border border-gray-300 rounded-xl">
                        <h3 className="font-bold text-gray-800 mb-5">Общая информация</h3>
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

                    {/* Characteristics */}
                    {(сharacteristic && сharacteristic.length > 0 || commandsInfo.length > 0) && (
                        <div className="max-w-[700px] p-6 border border-gray-300 rounded-xl">
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
                                    return (
                                        <div className={`info-comp__item ${commandsInfo.length > 1 && "border-b border-gray-300 pb-4"}`} key={key}>
                                            <div className="info-comp__title">{item.name}</div>

                                            <div className='flex'>
                                                {item.isCommand ?
                                                    <div className="info-comp__description">{item.value || "_"}</div>
                                                    :
                                                    <div className="info-comp__description">{item.value || "_"}</div>
                                                }
                                                <div className='w-3'></div>
                                                <span>
                                                    {item.mesurement}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});