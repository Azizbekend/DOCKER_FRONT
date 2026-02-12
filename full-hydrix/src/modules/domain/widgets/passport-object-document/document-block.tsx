import { observer } from 'mobx-react-lite';
import { DocumentCard } from './document-card';
import { DocumentFormCard } from './document-form-card';
import { useState } from 'react';
import { Button } from '@/packages/shared-ui/button/button';
import { passportDocuments } from '../../features/passport/passport-documents';
import { isAdmin } from '@/packages/entities/user/utils';
import { FileViewer } from '@/packages/shared-ui/file-viewer';

interface DocumentBlockProps {
  title: string;
  category: string;
  list: any;
}

export const DocumentBlock = observer(({ title, list, category }: DocumentBlockProps) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { deleteDoc } = passportDocuments;

  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [fileId, setFileId] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const openFileViewer = (id: number) => {
    setFileId(id);
    setOpenViewer(true);
  };

  const closeFileViewer = () => {
    setFileId(0);
    setOpenViewer(false);
  };

  const filteredDocuments = list.filter(doc => doc.category === category);
  const visibleDocuments = isExpanded ? filteredDocuments : filteredDocuments.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Модальное окно просмотра файла */}
      {openViewer && (
        <FileViewer 
          fileId={fileId} 
          isOpen={openViewer} 
          onClose={closeFileViewer} 
        />
      )}

      {/* Заголовок блока */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
      </div>


        

        {/* Список документов */}
        
          <div className="space-y-3">
            {filteredDocuments.length > 0 ? (
              <>
                {visibleDocuments.map((doc) => (
                  <DocumentCard 
                    key={doc.id} 
                    doc={doc} 
                    onFileViewer={openFileViewer} 
                  />
                ))}
                
                {filteredDocuments.length > 5 && (
                  <Button
                    class="w-full px-4 py-2 text-sm font-medium text-[#4A85F6] hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Свернуть список" : `Показать все (${filteredDocuments.length})`}
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-gray-500">Нет документов в категории</p>
              </div>
            )}

            {/* Форма добавления документа */}
            {isAdmin() && openForm && (
              <DocumentFormCard 
                category={category} 
                onClose={() => setOpenForm(false)} 
              />
            )}

            {/* Кнопка добавления */}
        {isAdmin() && (
  <div className="flex justify-end">
    <Button
      class={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        openForm 
          ? 'border border-blue-500 text-blue-600 bg-white hover:bg-blue-50' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      onClick={() => setOpenForm(!openForm)}
    >
      {openForm ? "Отмена" : "Добавить документ"}
    </Button>
  </div>
)}
          </div>
        </div>
      
    
  );
});
