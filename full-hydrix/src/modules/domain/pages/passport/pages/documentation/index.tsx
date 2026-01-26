import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Icon } from '@/packages/shared-ui/icon';
import { Button } from '@/packages/shared-ui/button';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { documentModel } from '@/modules/domain/features/document/model';
import { categories, documents } from '@/modules/domain/features/document/data';
// import { DocumentCard } from '@/modules/domain/widgets/document-card/index';
import { DocumentCard } from '@/modules/domain/widgets/document-card/index-2';


export const PassportDocumentation = observer(() => {
  const { reset, onChange, setDocumentName, isValue, getData } = documentModel;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    reset();
  }, []);

  // Фильтрация документов
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.number.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  return (
    <div className="max-w mx-auto">
      <PassportHeaderPanel title="Документация" />

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Поиск */}
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Поиск по названию или номеру..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
            />
          </div>

          {/* Фильтры категорий */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === category.key
                  ? 'bg-[#4A85F6] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >

                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Загрузка документа */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border h-fit sticky top-1 border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Загрузить документ</h2>

          <label className="bg-gray-50 rounded-xl h-64 block flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
            <input type="file" onChange={onChange} className="hidden" />

            <Icon
              systemName={isValue ? "docs" : "upload"}
              className="text-gray-400 mb-3 w-12 h-12"
            />
            <h3 className="text-base font-semibold text-gray-700 mb-1">
              {isValue ? "Файл готов к загрузке" : "Перетащите файл или нажмите"}
            </h3>
            <p className="text-xs text-gray-500">Поддерживаемые форматы: PDF, DOC, JPG</p>

            {isValue && (
              <p className="text-sm text-green-600 font-medium mt-2">
                {getData.fileName}
              </p>
            )}
          </label>

          <Input
            type="text"
            placeholder="Наименование документа"
            value={getData.documentName}
            onChange={setDocumentName}
            className="border border-gray-300 px-3 py-2.5 mt-4 rounded-lg text-gray-900 w-full"
          />

          <Button class="mt-4 w-full bg-[#4A85F6] text-white hover:bg-[#3a6bc9] py-2.5 rounded-lg font-medium">
            Добавить документ
          </Button>
        </div>

        <div className="space-y-6">

          {activeCategory === 'all' || activeCategory === 'PIR' ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">

                <h2 className="text-xl font-bold text-gray-800">ПИР</h2>
              </div>

              <div className="space-y-3">
                {filteredDocuments
                  .filter(doc => doc.category === 'PIR')
                  .map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))
                }
                {filteredDocuments.filter(doc => doc.category === 'PIR').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Icon systemName="folder-empty" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>Нет документов в категории ПИР</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}


          {activeCategory === 'all' || activeCategory === 'ITD' ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">

                <h2 className="text-xl font-bold text-gray-800">ИТД</h2>
              </div>

              <div className="space-y-3">
                {filteredDocuments
                  .filter(doc => doc.category === 'ITD')
                  .map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))
                }
                {filteredDocuments.filter(doc => doc.category === 'ITD').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Icon systemName="folder-empty" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>Нет документов в категории ИТД</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}


          {activeCategory === 'all' || activeCategory === 'EXPLOITATION' ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">

                <h2 className="text-xl font-bold text-gray-800">Документация в период эксплуатации</h2>
              </div>

              <div className="space-y-3">
                {filteredDocuments
                  .filter(doc => doc.category === 'EXPLOITATION')
                  .map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                    // <DocumentCard key={doc.id} doc={doc} />
                  ))
                }
                {filteredDocuments.filter(doc => doc.category === 'EXPLOITATION').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Icon systemName="folder-empty" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>Нет документов в категории эксплуатации</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});