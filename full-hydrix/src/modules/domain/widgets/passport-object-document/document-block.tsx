import { observer } from 'mobx-react-lite';
import { DocumentCard } from './document-card';
import { Icon } from '@/packages/shared-ui/icon';
import { DocumentFormCard } from './document-form-card';
import { useState } from 'react';
import { Button } from '@/packages/shared-ui/button';


interface DocumentBlockProps {
    title: string,
    category: string,
    list: any,
}

export const DocumentBlock = observer(({ title, list, category }: DocumentBlockProps) => {

    const [openForm, setOpaneForm] = useState<boolean>(false)


    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">

                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>

            <div className="space-y-3">
                {list
                    .filter(doc => doc.category === category)
                    .map((doc) => (
                        <DocumentCard key={doc.id} doc={doc} />
                    ))
                }
                {list.filter(doc => doc.category === category).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Icon systemName="folder-empty" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p>Нет документов в категории ПИР</p>
                    </div>
                )}

                {openForm && <DocumentFormCard />}
                <Button class='px-4 py-2' styleColor={openForm ? 'blueOutline' : "gray"} onClick={() => setOpaneForm(!openForm)}>
                    {openForm ? "Отмена" : "Добавить документ"}
                </Button>
            </div>
        </div>

    );
});