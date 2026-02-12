import { observer } from 'mobx-react-lite';
import { Icon } from "@/packages/shared-ui/icon"
import { useEffect } from 'react';
import { HardwareReviewProps } from '@/packages/entities/hardware/type';
import { getValue } from '../../functions/get-data/get-hardware-functions';

export const HardwareReview = observer(({ сharacteristic, getInfoNodeInfoAll, commandsInfo, documents, data }: HardwareReviewProps) => {

    useEffect(() => {
        getInfoNodeInfoAll();
        const interval = setInterval(getInfoNodeInfoAll, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="info-comp__content">
            <div className="info-comp__section">
                <div className="info-comp__item gap-3 border-b border-gray-300 pb-4 mt-8">
                    <div className="info-comp__title">Модель</div>
                    <div className="info-comp__description text-right">{data.model}</div>
                </div>
                <div className="info-comp__item gap-3 border-b border-gray-300 pb-4">
                    <div className="info-comp__title">Расположение</div>
                    <div className="info-comp__description text-right">{data.position}</div>
                </div>
                <div className="info-comp__item gap-3 border-b border-gray-300 pb-4">
                    <div className="info-comp__title">Поставщик</div>
                    <div className="info-comp__description text-right">{data.supplierName}</div>
                </div>
                <div className="info-comp__item gap-3 border-b border-gray-300 pb-4">
                    <div className="info-comp__title">Производитель</div>
                    <div className="info-comp__description text-right">{data.developerName}</div>
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
                                    <div className="info-comp__description text-right">{getValue(item.name, item.value)}</div>
                                    {item.mesurement.trim().length != 0 &&
                                        <span className='ml-[3px]'>
                                            {item.mesurement}
                                        </span>
                                    }
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
                        <a key={key} href={"https://triapi.ru/research/api/FileStorage/documentStorage/download?id=" + item.id} download={true} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150 cursor-pointer">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Icon systemName="docs" className="text-blue-700" />
                            </div>
                            <span className="text-gray-800 font-medium">{item.title}</span>
                        </a>
                    ))}
                </div>
            }

        </div >
    );
});