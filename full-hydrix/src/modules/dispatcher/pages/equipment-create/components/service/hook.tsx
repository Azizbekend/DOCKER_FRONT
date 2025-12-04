// hooks/useControl.ts
import { useState } from 'react';
import { ServiceType } from './type';

export const useService = () => {
    const [service, setService] = useState<ServiceType[]>([
        {
            id: '',
            discription: '',
            time: 1,
        }
    ]);

    // Добавление новой характеристики
    const add = () => {
        const newCharacteristic: ServiceType = {
            id: '',
            discription: '',
            time: 1,
        };
        setService(prev => [...prev, newCharacteristic]);
    };

    // Удаление характеристики
    const remove = (id: string) => {
        if (service.length <= 1) {
            // Не даем удалить последнюю характеристику
            return;
        }
        setService(prev => prev.filter(item => item.id !== id));
    };

    // Обновление названия характеристики
    const updateName = (id: string, name: string) => {
        setService(prev =>
            prev.map(item =>
                item.id === id ? { ...item, name } : item
            )
        );
    };

    // Обновление значения характеристики
    const updateMesurement = (id: string, mesurement: string) => {
        setService(prev =>
            prev.map(item =>
                item.id === id ? { ...item, mesurement } : item
            )
        );
    };
    const updateIsValue = (id: string, isValue: boolean) => {
        setService(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isValue } : item
            )
        );
    };
    const updateIsInfo = (id: string, isInfo: boolean) => {
        setService(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isInfo } : item
            )
        );
    };
    const updatePlcNodeid = (id: string, plcNodeid: string) => {
        setService(prev =>
            prev.map(item =>
                item.id === id ? { ...item, plcNodeid } : item
            )
        );
    };

    // Получение всех характеристик
    const getList = () => {
        return service.filter(char => char.discription.trim() !== '' && char.time.trim() !== 0);
    };

    return {
        service,
        updateIsInfo,
        add,
        remove,
        updateName,
        updateIsValue,
        updateMesurement,
        updatePlcNodeid,
        getList,
    };
};