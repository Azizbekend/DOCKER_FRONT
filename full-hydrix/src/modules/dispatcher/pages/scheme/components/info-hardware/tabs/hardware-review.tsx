import { observer } from 'mobx-react-lite';
import { Icon } from "@/shared/ui/icon"
import { hardwareModel } from '@/entities/hardware/model';
import { useEffect } from 'react';
import { formatToTwoDecimalsSafe } from '@/shared/functions/formatToTwoDecimalsSafe';

export const HardwareReview = observer(() => {

    const { сharacteristic, getInfoNodeInfoAll, model, commandsInfo, documents } = hardwareModel


    useEffect(() => {
        getInfoNodeInfoAll();
        const interval = setInterval(getInfoNodeInfoAll, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="info-comp__content">
                <div className="info-comp__section">
                    <div className="info-comp__item gap-3 border-b border-gray-300 pb-4 mt-8">
                        <div className="info-comp__title">Модель</div>
                        <div className="info-comp__description text-right">{model.model}</div>
                    </div>
                    <div className="info-comp__item gap-3 border-b border-gray-300 pb-4">
                        <div className="info-comp__title">Расположение</div>
                        <div className="info-comp__description text-right">{model.position}</div>
                    </div>
                    <div className="info-comp__item gap-3 border-b border-gray-300 pb-4">
                        <div className="info-comp__title">Поставщик</div>
                        <div className="info-comp__description text-right">{model.supplierName}</div>
                    </div>
                    <div className="info-comp__item gap-3 border-b border-gray-300 pb-4">
                        <div className="info-comp__title">Производитель</div>
                        <div className="info-comp__description text-right">{model.developerName}</div>
                    </div>
                </div>
                <div className="info-comp__section">
                    {(сharacteristic.length > 0 || commandsInfo.length > 0) && <>
                        <div className="info-comp__subtitle mt-8">Характеристики</div>

                        {сharacteristic.map((item, key) => {
                            return (
                                <div className={`info-comp__item ${(сharacteristic.length > 1 || commandsInfo.length > 1) && "border-b border-gray-300 pb-4"} `} key={key}>
                                    <div className="info-comp__title">{item.name}</div>
                                    <div className="info-comp__description text-right">{item.value}</div>
                                </div>
                            )
                        })}

                        {commandsInfo.map((item, key) => {
                            return ((item.name != "Состояние") &&
                                <div className={`info-comp__item ${commandsInfo.length > 1 && "border-b border-gray-300 pb-4"}`} key={key}>
                                    <div className="info-comp__title">{item.name}</div>

                                    <div className='flex'>
                                        <div className="info-comp__description text-right">{formatToTwoDecimalsSafe(item.value)}</div>
                                        <div className='w-3'></div>
                                        <span>
                                            {item.mesurement}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </>}

                </div>

                {documents.length > 0 &&
                    <div className="info-comp__section">
                        <div className="info-comp__subtitle">Документация</div>
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

            </div >
        </>
    );
});