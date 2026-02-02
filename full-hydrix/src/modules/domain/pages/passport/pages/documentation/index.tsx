import { observer } from 'mobx-react-lite';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { categories } from '@/modules/domain/features/document/data';
import { DocumentBlock } from '@/modules/domain/widgets/passport-object-document/document-block';
import { useEffect, useMemo, useState } from 'react';
import { passportDocuments } from '@/modules/domain/features/passport/passport-documents';
import { getObjectId } from '@/packages/functions/get-data/get-object-data';
import Loader from '@/packages/shared-ui/loader/loader';
import { Icon } from '@/packages/shared-ui/icon';


export const PassportDocumentation = observer(() => {


  const { model, isLoader, init } = passportDocuments

  useEffect(() => {
    init(getObjectId())
  }, [])

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredDocuments = model.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    return matchesCategory;
  });


  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim() || !text) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              className="text-blue-500 font-medium"
            >
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  const filteredDocumentsFilter = useMemo(() => {
    if (!searchTerm.trim() || !model) {
      return [];
    }

    const searchLower = searchTerm.toLowerCase();

    return model.filter(item => {
      if (!item.name || item.name.trim() === '') {
        return false;
      }

      const nameMatch = item.name.toLowerCase().includes(searchLower);
      return nameMatch;
    });
  }, [model, searchTerm]);


  return (
    <div className="max-w mx-auto">
      <PassportHeaderPanel title="Документация" />
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Поиск по названию или номеру..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
            />


            {searchTerm.length > 0 && (
              <div className="absolute top-[120%] rounded-lg left-0 w-full bg-white border shadow-lg border border-gray-200 p-4">
                <div className="text-sm text-gray-500 mb-4">
                  Найдено документов: {filteredDocumentsFilter.length}
                </div>

                {filteredDocumentsFilter.length > 0 ? filteredDocumentsFilter.map((document) => (
                  <a href={"https://triapi.ru/research/api/FileStorage/images/download?id=" + document.docId}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={true}
                    className="flex mb-3 items-center justify-between px-3 py-2.5 lg:px-4 lg:py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <Icon systemName="docs-blue" className="text-gray-400 w-6 h-6" />
                      <div className="font-medium text-gray-800 text-sm lg:text-base">{highlightText(document.name, searchTerm)}</div>
                    </div>
                    <div></div>
                  </a>
                )) : (
                  <div className="text-center py-8 text-gray-400 border border-gray-200 rounded-lg">
                    <div className="text-lg mb-2">Ничего не найдено</div>
                    <div className="text-sm">
                      Попробуйте изменить запрос или проверьте правильность написания
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

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

      {isLoader ? <Loader /> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(activeCategory === 'all' || activeCategory === 'PORJECTS') && <DocumentBlock title="Проектная документация" category="PORJECTS" list={filteredDocuments} />}
          {(activeCategory === 'all' || activeCategory === 'PIR') && <DocumentBlock title="Рабочая документация" category="PIR" list={filteredDocuments} />}
          {(activeCategory === 'all' || activeCategory === 'ITD') && <DocumentBlock title="Исполнительно-техническая документация" category="ITD" list={filteredDocuments} />}
          {(activeCategory === 'all' || activeCategory === 'EXPLOITATION') && <DocumentBlock title="Документация в период эксплуатации" category="EXPLOITATION" list={filteredDocuments} />}
        </div>
      )}

    </div>
  );
});