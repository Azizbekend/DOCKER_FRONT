// hooks/useCharacteristics.ts
import { useState } from 'react';
import { Characteristic } from './type';

export const useCharacteristics = () => {
    const [characteristics, setCharacteristics] = useState<Characteristic[]>([
        {
            id: '1',
            name: '',
            value: ''
        }
    ]);

    // Добавление новой характеристики
    const addCharacteristic = () => {
        const newCharacteristic: Characteristic = {
            id: Date.now().toString(),
            name: '',
            value: ''
        };
        setCharacteristics(prev => [...prev, newCharacteristic]);
    };

    // Удаление характеристики
    const removeCharacteristic = (id: string) => {
        if (characteristics.length <= 1) {
            // Не даем удалить последнюю характеристику
            return;
        }
        setCharacteristics(prev => prev.filter(item => item.id !== id));
    };

    // Обновление названия характеристики
    const updateCharacteristicName = (id: string, name: string) => {
        setCharacteristics(prev =>
            prev.map(item =>
                item.id === id ? { ...item, name } : item
            )
        );
    };

    // Обновление значения характеристики
    const updateCharacteristicValue = (id: string, value: string) => {
        setCharacteristics(prev =>
            prev.map(item =>
                item.id === id ? { ...item, value } : item
            )
        );
    };

    // Получение всех характеристик
    const getCharacteristics = () => {
        return characteristics.filter(char => char.name.trim() !== '' && char.value.trim() !== '');
    };

    // Сброс всех характеристик
    const resetCharacteristics = () => {
        setCharacteristics([{ id: '1', name: '', value: '' }]);
    };

    return {
        characteristics,
        addCharacteristic,
        removeCharacteristic,
        updateCharacteristicName,
        updateCharacteristicValue,
        getCharacteristics,
        resetCharacteristics
    };
};