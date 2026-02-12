import { observer } from 'mobx-react-lite';
import { DocumentCard } from './document-card';
import { DocumentFormCard } from './document-form-card';
import { useState } from 'react';
import { Button } from '@/packages/shared-ui/button/button';
import { passportDocuments } from '../../features/passport/passport-documents';
import { isAdmin } from '@/packages/entities/user/utils';
import { FileViewer } from '@/packages/shared-ui/file-viewer';


interface DocumentBlockProps {
    title: string,
    category: string,
    list: any,
}

export const DocumentBlock = observer(({ title, list, category }: DocumentBlockProps) => {

    const [openForm, setOpaneForm] = useState<boolean>(false)
    const { deleteDoc } = passportDocuments


    const [openViewer, setOpenViewer] = useState<boolean>(false)
    const [fileId, setFileId] = useState<number>(0)
    const openFileViewer = (id: number) => {
        setFileId(id)
        setOpenViewer(true)
    }

    const closeFileViewer = () => {
        setFileId(0)
        setOpenViewer(false)
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            {openViewer && <FileViewer fileId={fileId} isOpen={openViewer} onClose={closeFileViewer} />}

            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-800" onClick={() => deleteDoc(1)}>{title}</h2>
            </div>

            <div className="space-y-3">
                {list.filter(doc => doc.category === category).map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} onFileViewer={openFileViewer} />
                ))
                }
                {list.filter(doc => doc.category === category).length === 0 && (
                    <div className="text-center px-3 py-2.5 xl:px-4 xl:py-3 bg-white rounded-lg shadow">
                        <p>Нет документов</p>
                    </div>
                )}

                {isAdmin() && openForm && <DocumentFormCard category={category} onClose={() => setOpaneForm(false)} />}
                {isAdmin() &&
                    <Button class='px-4 py-2' styleColor={openForm ? 'blueOutline' : "gray"} onClick={() => setOpaneForm(!openForm)}>
                        {openForm ? "Отмена" : "Добавить документ"}
                    </Button>
                }
            </div>
        </div>

    );
});