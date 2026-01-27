import { Button } from '@/packages/shared-ui/button';
import { Icon } from '@/packages/shared-ui/icon';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { useState } from 'react';


interface DocumentCardData {
    id?: number;
    fileName: string;
    documentName: string;
    file?: File;
    uploadedAt?: Date;
}

export const DocumentFormCard = () => {
    const [getData, setGetData] = useState<DocumentCardData>({
        fileName: '',
        documentName: ''
    });
    const [isValue, setIsValue] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setGetData(prev => ({
                ...prev,
                fileName: file.name,
                file: file
            }));
            setIsValue(true);
            setIsEditing(true);
        }
    };

    const setDocumentName = (value: string) => {
        setGetData(prev => ({ ...prev, documentName: value }));
    };

    const handleSave = () => {
        console.log('Сохранение документа:', getData);
        setIsEditing(false);
    };

    return (
        <div
            className="px-3 py-2.5 lg:px-4 lg:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
        >
            <div className='flex items-strech gap-3'>
                <label className="bg-gray-50 rounded-lg block border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="relative w-full aspect-square w-12 h-12 flex items-center justify-center">
                        <input
                            type="file"
                            onChange={onChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <Icon systemName="docs" />
                    </div>
                </label>

                <Input
                    type="text"
                    placeholder="Введите название документа"
                    value={getData.documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    className="border border-gray-300 px-3 py-2.5 rounded-lg text-gray-900 w-full text-sm"
                />

                <div className="flex gap-3">
                    <Button
                        class='w-max px-4'
                        styleColor="blue"
                        onClick={handleSave}
                        disabled={!getData.fileName}
                    >
                        Добавить документ
                    </Button>
                </div>
            </div>

            {isValue && (
                <p className="text-sm text-green-600 font-medium truncate max-w-xs">
                    {getData.fileName}
                </p>
            )}
        </div>
    );
};