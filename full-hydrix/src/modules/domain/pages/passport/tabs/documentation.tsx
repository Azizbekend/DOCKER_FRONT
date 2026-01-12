import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { Table } from '@/shared/ui/table/index';
import { TableColumn } from '@/shared/ui/table/types';

// Данные для таблицы
const documents = [
  {
    id: 1,
    number: "1",
    name: "Фотоотчет",
    type: "Фотоотчет",
    date: "2025-06-02 00:00:00",
    changedDate: "25.06.2025, 10:28:11",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/photo-report.pdf"
  },
  {
    id: 2,
    number: "16-1-1-2-065197.2023",
    name: "Заключение государственной экспертизы",
    type: "Заключение экспертизы",
    date: "2023-10-27 10:56:45",
    changedDate: "29.12.2025, 01:23:16",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/expertise-conclusion.pdf"
  },
  {
    id: 3,
    number: "2165301484323000017",
    name: "Выполнение проектно-изыскательских работ",
    type: "Договор",
    date: "2023-09-12 12:51:14",
    changedDate: "29.12.2025, 02:28:06",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/survey-works.pdf"
  },
  {
    id: 4,
    number: "2165301484325000007",
    name: "Реконструкция водовода в г. Лениногорск",
    type: "Договор",
    date: "2025-03-21 09:00:41",
    changedDate: "29.12.2025, 01:06:24",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/water-pipe-reconstruction.pdf"
  },
  {
    id: 5,
    number: "2165301484325000021",
    name: "Выполнение работ по реконструкции",
    type: "Договор",
    date: "2025-10-20 00:00:00",
    changedDate: "29.12.2025, 01:06:24",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/reconstruction-works.pdf"
  },
  {
    id: 6,
    number: "КСГ",
    name: "План работ",
    type: "План работ",
    date: "2025-07-08 00:00:00",
    changedDate: "08.07.2025, 11:18:48",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/work-plan.pdf"
  },
  {
    id: 7,
    number: "КСГ",
    name: "План работ",
    type: "План работ",
    date: "2025-07-08 00:00:00",
    changedDate: "08.07.2025, 11:18:48",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/work-plan-2.pdf"
  },
  {
    id: 8,
    number: "КСГ",
    name: "План работ",
    type: "План работ",
    date: "2025-07-08 00:00:00",
    changedDate: "08.07.2025, 11:18:48",
    ekn: "253755699",
    changedBy: "Сидоров Андрей",
    fileUrl: "/docs/work-plan-3.pdf"
  }
];

// Колонки таблицы
const columns: TableColumn<typeof documents[0]>[] = [
  {
    header: "Номер документа",
    key: "number",
    width: "120px",
    cell: ({ number }) => <span className="text-sm">{number}</span>
  },
  {
    header: "Наименование",
    key: "name",
    cell: ({ name }) => <span className="text-sm">{name}</span>
  },
  {
    header: "Вид документа",
    key: "type",
    width: "180px",
    cell: ({ type }) => <span className="text-sm">{type}</span>
  },
  {
    header: "Дата документа",
    key: "date",
    width: "160px",
    cell: ({ date }) => <span className="text-sm">{new Date(date).toLocaleString()}</span>
  },
  {
    header: "Изменено (дата)",
    key: "changedDate",
    width: "160px",
    cell: ({ changedDate }) => <span className="text-sm">{changedDate}</span>
  },
  {
    header: "ЕКНД",
    key: "ekn",
    width: "140px",
    cell: ({ ekn }) => <span className="text-sm">{ekn}</span>
  },
  {
    header: "Изменено (сотрудник)",
    key: "changedBy",
    width: "200px",
    cell: ({ changedBy }) => <span className="text-sm">{changedBy}</span>
  }
];

export const PassportDocumentation = observer(() => {
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<typeof documents[0] | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Фильтрация документов
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = search === "" ||
      doc.number.toLowerCase().includes(search.toLowerCase()) ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.type.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" ||
      (filter === "contracts" && doc.type.includes("Договор")) ||
      (filter === "reports" && doc.type.includes("Отчет")) ||
      (filter === "plans" && doc.type.includes("План"));

    return matchesSearch && matchesFilter;
  });

  // Пагинация
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedDocuments.length === paginatedDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(paginatedDocuments.map(doc => doc.id));
    }
  };

  const handleSelectDocument = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter(docId => docId !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  const handleRowClick = (document: typeof documents[0]) => {
    setSelectedDocument(document);
  };

  const handleDelete = () => {
    console.log("Удалить документы:", selectedDocuments);
    // Здесь логика удаления
  };

  const handleCreate = () => {
    console.log("Создать новый документ");
    // Здесь логика создания
  };

  return (
    <div className="mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>


      {/* Инструментальная панель */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
              >
                <option value="all">По всем разделам</option>
                <option value="contracts">Договоры</option>
                <option value="reports">Отчёты</option>
                <option value="plans">Планы</option>
              </select>
              <Icon systemName="arrow-down" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
              />
              <Icon systemName="search" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleCreate}
              class="flex items-center gap-2 px-4 py-2 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors"
            >
              <Icon systemName="plus-white" />
              Создать
            </Button>
            <Button
              onClick={handleDelete}
              disabled={selectedDocuments.length === 0}
              class={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg ${selectedDocuments.length > 0
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <Icon systemName="delete" />
              Удалить
            </Button>
            <Button
              onClick={() => console.log("Обновить")}
              class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Icon systemName="refresh" />
              Обновить
            </Button>
          </div>
        </div>
      </div>

      {/* Основной контент: таблица + просмотрщик */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Таблица документов */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedDocuments.length === paginatedDocuments.length && paginatedDocuments.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-[#4A85F6] rounded border border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#4A85F6]"
                />
                <span className="text-sm text-gray-600">
                  {selectedDocuments.length > 0 ? `${selectedDocuments.length} выбрано` : "Нет данных"}
                </span>
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            data={paginatedDocuments}
            countActive
            onRowClick={handleRowClick}
            classNames={{
              thead: "bg-gray-50",
              body: "max-h-[60vh] overflow-y-auto",
              table: "table-fixed"
            }}

          />

          {/* Пагинация */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredDocuments.length)} из {filteredDocuments.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded ${page === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                ←
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = page - 2 + i;
                if (pageNum < 1 || pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded ${pageNum === page ? 'bg-[#4A85F6] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {pageNum}
                  </button>
                );
              }).filter(Boolean)}
              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded ${page === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Просмотрщик документов */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Просмотр документа</h2>

          {selectedDocument ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon systemName="docs" className="text-blue-600 w-5 h-5" />
                  <span className="font-semibold text-gray-800">{selectedDocument.name}</span>
                </div>
                <div className="text-sm text-gray-600">{selectedDocument.number}</div>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Дата:</span> {new Date(selectedDocument.date).toLocaleString('ru-RU')}
                </div>
              </div>

              {/* Просмотрщик PDF */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={`${selectedDocument.fileUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-96"
                  title={`Документ: ${selectedDocument.name}`}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => window.open(selectedDocument.fileUrl, '_blank')}
                  class="flex items-center gap-2 px-4 py-2 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors"
                >
                  <Icon systemName="download" />
                  Скачать
                </Button>
                <Button
                  onClick={() => window.print()}
                  class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Icon systemName="print" />
                  Печать
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Icon systemName="docs" className="text-gray-400 w-12 h-12 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Выберите документ для просмотра</h3>
              <p className="text-gray-500">Кликните по строке в таблице, чтобы увидеть содержимое документа</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});