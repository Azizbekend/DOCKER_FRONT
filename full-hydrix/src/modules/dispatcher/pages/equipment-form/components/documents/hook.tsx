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
            return;
        }
        setDocuments(prev => prev.filter(item => item.id !== id));
    };

    // Обновление названия характеристики
    const updateDocumntsTitle = (id: string, title: string) => {
        setDocuments(prev =>
            prev.map(item =>
                item.id === id ? { ...item, title } : item
            )
        );
    };

    // Обновление значения характеристики
    const updateDocumntsFile = (id: string, file: File) => {
        setDocuments(prev =>
            prev.map(item => item.id === id ? { ...item, file } : item)
        );
    };

    // Получение всех характеристик
    const getDocumnts = () => {
        return documents.filter(char => char.title.trim() !== '' && char.file == null);
    };

    // Сброс всех характеристик
    const resetDocumnts = () => {
        setDocuments([{ id: '1', title: '', file: null }]);
    };

    return {
        documents,
        addDocuments,
        removeDocumnts,
        getDocumnts,
        resetDocumnts,
        updateDocumntsTitle,
        updateDocumntsFile
    };
};