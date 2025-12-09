// hooks/useCharacteristics.ts
import { Documents } from '@/entities/hardware/api';
import { useState } from 'react';

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Documents[]>([
        {
            id: '',
            title: "",
            file: null,
        }
    ]);

    // Добавление новой характеристики
    const addDocuments = () => {
        const newDocuments: Documents = {
            id: Date.now().toString(),
            title: '',
            file: null
        };
        setDocuments(prev => [...prev, newDocuments]);
    };

    // Удаление характеристики
    const removeDocumnts = (id: string) => {
        if (documents.length <= 1) {
            // Не даем удалить последнюю характеристику
            return;
        }
        setDocuments(prev => prev.filter(item => item.id !== id));
    };

    // Обновление названия характеристики
    const updateDocumntsName = (id: string, name: string) => {
        setDocuments(prev =>
            prev.map(item =>
                item.id === id ? { ...item, name } : item
            )
        );
    };

    // Обновление значения характеристики
    const updateDocumntsValue = (id: string, value: string) => {
        setDocuments(prev =>
            prev.map(item =>
                item.id === id ? { ...item, value } : item
            )
        );
    };

    // Получение всех характеристик
    const getDocumntss = () => {
        return documents.filter(char => char.name.trim() !== '' && char.value.trim() !== '');
    };

    // Сброс всех характеристик
    const resetDocumnts = () => {
        setDocuments([{ id: '1', name: '', value: '' }]);
    };

    return {
        documents,
        addCharacteristic,
        removeCharacteristic,
        updateCharacteristicName,
        updateCharacteristicValue,
        getCharacteristics,
        resetCharacteristics
    };
};