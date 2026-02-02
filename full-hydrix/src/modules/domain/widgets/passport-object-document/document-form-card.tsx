import { Button } from '@/packages/shared-ui/button/button'
import { Icon } from '@/packages/shared-ui/icon'
import { Input } from '@/packages/shared-ui/Inputs/input-text'
import { ChangeEvent, useState } from 'react'
import { passportDocuments } from '../../features/passport/passport-documents'

interface UploadDocData {
    name: string
    category: string
    file?: File
}

export const DocumentFormCard = ({ category, onClose }: { category: string, onClose: () => void }) => {
    const { uploadDoc } = passportDocuments

    const [data, setData] = useState<UploadDocData>({
        name: '',
        category: category,
    })

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setData(prev => ({
            ...prev,
            file: file,
        }))
    }

    const handleSave = async () => {
        console.log(data.file)
        if (!data.file || !data.name || !data.category) return
        await uploadDoc(data)
        onClose()
    }

    return (
        <div>
            <div className="px-3 py-2.5 bg-white rounded-lg shadow flex gap-3 items-center">
                <label className="bg-gray-50 rounded-lg border-2 border-dashed border-[var(--clr-border-gray)] cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={onFileChange}
                        />
                        <Icon systemName="docs" />
                    </div>
                </label>

                <Input
                    className='border-[1.5px] px-3 py-2 rounded-lg'
                    type='string'
                    placeholder="Название документа"
                    value={data.name}
                    onChange={(e) =>
                        setData(prev => ({ ...prev, name: e }))
                    }
                />

                <Button
                    class='w-max px-4 py-2'
                    styleColor="blue"
                    onClick={handleSave}
                >
                    Добавить
                </Button>
            </div>

            {data.file && (
                <p className="text-sm text-green-600 mt-2 truncate">
                    {data.file.name}
                </p>
            )}
        </div>
    )
}
