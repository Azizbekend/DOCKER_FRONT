import { observer } from 'mobx-react-lite';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { categories, documents } from '@/modules/domain/features/document/data';
import { DocumentBlock } from '@/modules/domain/widgets/passport-object-document/document-block';
import { useState } from 'react';


export const PassportDocumentation = observer(() => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Поиск по названию или номеру..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
            />
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

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(activeCategory === 'all' || activeCategory === 'PIR') && <DocumentBlock title="ПИР" category="PIR" list={filteredDocuments} />}
        {(activeCategory === 'all' || activeCategory === 'ITD') && <DocumentBlock title="ИТД" category="ITD" list={filteredDocuments} />}
        {(activeCategory === 'all' || activeCategory === 'EXPLOITATION') && <DocumentBlock title="Документация в период эксплуатации" category="EXPLOITATION" list={filteredDocuments} />}
      </div>
    </div>
  );
});