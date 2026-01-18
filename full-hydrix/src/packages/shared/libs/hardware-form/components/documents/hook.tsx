// hooks/useCharacteristics.ts
import { Documents } from '@/packages/entities/hardware/api-general';
import { useState } from 'react';

export const useDocuments = () => {
    const [documents, setDocuments] = useState<Documents[]>([
        {
            id: '',
            title: "",
            file: null,
            fileName: null,
        }
    ]);

    // Добавление новой характеристики
    const addDocuments = () => {
        const newDocuments: Documents = {
            id: Date.now().toString(),
            title: '',
            file: null,
            fileName: null
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
        console.log(file[0])
        setDocuments(prev => prev.map(item => item.id === id ? { id: item.id, title: item.title, file: file, fileName: file.name } : item))
    };

    // Получение всех характеристик
    const getDocumnts = () => {
        return documents.filter(char => char.title.trim() !== '' && char.file == null);
    };

    // Сброс всех характеристик
    const resetDocumnts = () => {
        setDocuments([{ id: '1', title: '', file: null, fileName: null }]);
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