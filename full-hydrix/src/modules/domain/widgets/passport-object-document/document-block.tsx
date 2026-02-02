import { observer } from 'mobx-react-lite';
import { DocumentCard } from './document-card';
import { DocumentFormCard } from './document-form-card';
import { useState } from 'react';
import { Button } from '@/packages/shared-ui/button/button';
import { passportDocuments } from '../../features/passport/passport-documents';


interface DocumentBlockProps {
    title: string,
    category: string,
    list: any,
}

export const DocumentBlock = observer(({ title, list, category }: DocumentBlockProps) => {

    const [openForm, setOpaneForm] = useState<boolean>(false)
    const { deleteDoc } = passportDocuments


    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-800" onClick={() => deleteDoc(1)}>{title}</h2>
            </div>

            <div className="space-y-3">
                {list.filter(doc => doc.category === category).map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                ))
                }
                {list.filter(doc => doc.category === category).length === 0 && (
                    <div className="text-center px-3 py-2.5 lg:px-4 lg:py-3 bg-white rounded-lg shadow">
                        <p>Нет документов</p>
                    </div>
                )}

                {false && openForm && <DocumentFormCard category={category} onClose={() => setOpaneForm(false)} />}
                {false &&
                    <Button class='px-4 py-2' styleColor={openForm ? 'blueOutline' : "gray"} onClick={() => setOpaneForm(!openForm)}>
                        {openForm ? "Отмена" : "Добавить документ"}
                    </Button>
                }
            </div>
        </div>

    );
});