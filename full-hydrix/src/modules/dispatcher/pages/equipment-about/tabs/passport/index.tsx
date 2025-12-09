import { Icon } from "@/shared/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/entities/hardware/model";
import { Button } from "@/shared/ui/button";
import { hardwareListModel } from "../../../equipment/model/hardware-list-model";
import { ModalServiceCreate } from "../../../equipment/components/modal-service-create";

export const EquipmentPassport = observer(() => {
    const { model, сharacteristic } = hardwareModel;
    const { modalService, closeModal } = hardwareListModel;
    const navigate = useNavigate();

    // Вспомогательные функции
    const getStatusBadge = () => {
        const isConnected = false; // замените на реальный флаг, если будет доступен
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                {isConnected ? 'Подключено' : 'Не подключено'}
            </span>
        );
    };

    const renderEvent = (date, text) => {
        const getColorClass = () => {
            if (text.includes('отключение')) return 'text-red-700 bg-red-100';
            if (text.includes('запуск')) return 'text-green-700 bg-green-100';
            if (text.includes('ТО')) return 'text-blue-700 bg-blue-100';
            return 'text-gray-700 bg-gray-100';
        };

        return (
            <div className="flex items-center gap-3 p-2 rounded-lg">
                <span className="text-xs text-gray-500 min-w-[110px]">{date}</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getColorClass()}`}>
                    {text}
                </span>
            </div>
        );
    };

    const renderDocument = (name) => (
        <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150 cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon systemName="docs" className="text-blue-700" />
            </div>
            <span className="text-gray-800 font-medium">{name}</span>
        </div>
    );

    return (
        <div className="mb-[100px] bg-white rounded-2xl shadow-xl border border-gray-100 p-7 min-h-[80vh]">
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
                        {getStatusBadge()}
                    </div>

                    {/* Documentation */}
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-300">
                        <h3 className="font-bold text-gray-800 mb-4">Документация</h3>
                        <div className="space-y-2">
                            {renderDocument('Паспорт')}
                            {renderDocument('Инструкция')}
                            {renderDocument('Гарантийный талон')}
                        </div>
                    </div>

                    {/* Event Log */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-300">
                        <h3 className="font-bold text-gray-800 mb-4">Журнал событий</h3>
                        <div className="space-y-2">
                            {renderEvent('18.10.2025 12:34', 'отключение')}
                            {renderEvent('18.10.2025 12:36', 'запуск')}
                            {renderEvent('20.12.2025 12:10', 'ТО1')}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Equipment Name */}
                    <div className="pb-6 border-b border-gray-400">
                        <h2 className="text-xl font-bold text-gray-800">{model.name || '—'}</h2>
                    </div>

                    {/* General Info */}
                    <div className="bg-white rounded-xl p-6 border border-gray-400">
                        <h3 className="font-bold text-gray-800 mb-5">Общая информация</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs uppercase text-gray-500 tracking-wider mb-1">Модель</div>
                                    <div className="font-medium text-gray-800">{model.position || '—'}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-gray-500 tracking-wider mb-1">Поставщик</div>
                                    <div className="font-medium text-gray-800">{model.supplierName || '—'}</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-gray-500 tracking-wider mb-1">Производитель</div>
                                <div className="font-medium text-gray-800">{model.developerName || '—'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Characteristics */}
                    {сharacteristic && сharacteristic.length > 0 && (
                        <div className="bg-white rounded-xl p-6 border border-gray-400">
                            <h3 className="font-bold text-gray-800 mb-5">Характеристики</h3>
                            <div className="space-y-4">
                                {сharacteristic.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-xs uppercase text-gray-500 tracking-wider">{item.name}</div>
                                        <div className="font-medium text-gray-800">{item.value || '—'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
