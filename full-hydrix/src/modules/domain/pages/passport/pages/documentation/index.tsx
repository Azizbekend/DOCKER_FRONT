import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Icon } from '@/packages/shared-ui/icon';
import { Button } from '@/packages/shared-ui/button';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { documentModel } from '@/modules/domain/features/document/model';

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


export const PassportDocumentation = observer(() => {

  const { reset, onChange, setDocumentName, isValue, getData } = documentModel;

  useEffect(() => {
    reset()
  }, [])

  return (
    <div className="mx-auto">
      <PassportHeaderPanel title="Документация" />
      <div className="grid grid-cols-2 gap-4">
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 h-min'>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Загрузить документ</h2>
          <label className="bg-gray-50 rounded-xl shadow-sm h-[350px]  block flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300">
            <input type="file" onChange={onChange} className='hidden' />

            <Icon systemName={isValue ? "docs" : "checkmate"} className="text-gray-400 mb-4" width={30} height={30} />
            <h3 className="text-lg font-semibold text-gray-700">{isValue ? "Загрузить файл" : "Файл загружен"}</h3>
            <p className='text-sm text-green-600 font-medium mt-3'>{getData.fileName}</p>
          </label>

          <Input type='text' placeholder='Неименование' value={getData.documentName} onChange={setDocumentName}
            className="border border-gray-300 px-4 py-3 mt-5 rounded-lg text-gray-900  transition-all duration-200"
          />

          <Button class="mt-10 rounded-lg w-full justify-center bg-[var(--clr-accent)] text-white hover:opacity-50" >Добавить</Button>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100'>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Документы</h2>

          <div className="flex flex-col gap-10">
            {documents.map((doc, key) => {
              return (
                <div key={key} className='flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow hover:shadow-lg duration-300 cursor-pointer' >
                  <div className='flex items-center gap-4 text-lg'>
                    <Icon systemName="docs-blue" className="text-gray-400" width={30} />
                    <div className='font-semibold'>{doc.name}</div>
                  </div>
                  <Button>
                    <Icon systemName='delete-red' />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  );
});