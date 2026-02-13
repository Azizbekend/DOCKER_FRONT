import { Button } from '@/packages/shared-ui/button/button';
import { Icon } from '@/packages/shared-ui/icon';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface Props {
    addFile: (file: File, name: string) => void;
}

export const StageFormFileInput = observer(({ addFile }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>('');

    const onAddFile = (selectedFile: File) => {
        setFile(selectedFile);
        // Автоматически подставить имя файла без расширения как название
        const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
        if (!name) setName(fileNameWithoutExt);
    };

    const onSaveData = () => {
        if (file && name.trim() !== '') {
            addFile(file, name);
            setFile(null);
            setName('');
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        }
    };

    return (
        <InputContainer key="Документы" headerText="Документы" classNames={{ children: "w-full flex-col !items-start" }}>
            <div className="flex gap-3 items-center w-full">
                <label className="cursor-pointer">
                    <div className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors min-w-[35px] w-[35px] flex items-center justify-center">
                        <Icon systemName="docs" />
                    </div>
                    <input
                        type="file"
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
                        multiple={false}
                        className="hidden"
                        onChange={(e) =>
                            Array.from(e.target.files || []).forEach((file) => onAddFile(file))
                        }
                    />
                </label>

                <Input
                    className="px-2 py-1 flex-1"
                    value={name}
                    onChange={setName}
                    placeholder="Введите название файла"
                    type="text"
                />

                <Button
                    styleColor={"blue"}
                    class='px-2 py-1.5 text-sm'
                    onClick={onSaveData}
                    disabled={!file || !name.trim()}
                >
                    Добавить
                </Button>
            </div>

            {file ? (
                <p className="text-sm text-gray-600 mt-2">
                    Выбран файл: <span className="font-medium">{file.name}</span>
                </p>
            ) : (
                <p className="text-sm text-gray-400 mt-2">Файл не выбран</p>
            )}
        </InputContainer>
    );
});
