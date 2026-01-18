import { Incident } from "@/modules/domain/pages/registry-objects/data/data";
import { TableColumn } from "@/packages/shared-ui/table/types";

export const columns: TableColumn<Incident>[] = [
    {
        header: "Оборудование",
        key: 'hardware',
        cell: ({ hardware }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{hardware}</div>
            );
        },
    },
    {
        header: "Авария",
        key: 'issue',
        cell: ({ issue }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{issue || '—'}</div>
            );
        },
    },
    {
        header: "Время",
        key: 'time',
        cell: ({ time }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{time}</div>
            );
        },
    },
    {
        header: "Затрачено",
        key: 'duration',
        cell: ({ duration }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{duration}</div>
            );
        },
    },
    {
        header: "Исполнитель",
        key: 'responsible',
        cell: ({ responsible }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{responsible}</div>
            );
        },
    },
    {
        header: "Статус работы",
        key: 'status',
        cell: ({ status }) => {
            return (
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold 
                        ${status == "Новый" && "bg-red-100 text-red-800 border border-red-200"}
                        ${status == "В работе" && "bg-blue-100 text-blue-800 border border-blue-200"}
                        ${status == "Завершён" && "bg-green-100 text-green-800 border border-green-200"}
                    `}>
                        {status}
                    </div>
                </div >
            );
        },
    },
];