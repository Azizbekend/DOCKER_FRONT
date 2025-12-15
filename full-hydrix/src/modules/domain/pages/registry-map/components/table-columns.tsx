import { TableColumn } from "@/shared/ui/table/setting/types";
import { Incident } from "../data/data";

export const columns: TableColumn<Incident>[] = [
    {
        header: "Объект",
        key: 'nameMinin',
        cell: ({ object }) => {
            return (
                <div className='font-semibold text-sm text-left'>{object}</div>
            )
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
        header: "Статус работы",
        key: 'status',
        cell: ({ status }) => {
            return (
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold 
                        ${status == "Новый" && "bg-blue-100 text-blue-800 border border-blue-200"}
                        ${status == "В работе" && "bbg-gray-100 text-gray-800 border border-gray-200"}
                        ${status == "Завершён" && "bg-blue-100 text-gray-800 border border-blue-200"}
                    `}>
                        {status}
                    </div>
                </div >
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
        header: "Компнаия",
        key: 'company',
        cell: ({ company }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{company}</div>
            );
        },
    },
];