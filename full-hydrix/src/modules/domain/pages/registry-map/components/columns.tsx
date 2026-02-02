import { TableColumn } from "@/packages/shared-ui/table/types";
import { ServiceType } from "@/packages/entities/service-requests/type";
import { getDate } from "@/packages/functions/get-data/get-date";
import { Incident } from "@/packages/entities/incident/type";
import { getIncidentColor, getIncidentText } from "@/packages/functions/get-data/get-incident-status";

export const columnsIncidents: TableColumn<Incident>[] = [
    {
        header: "Объект",
        key: 'object',
        cell: ({ object }) => {
            return (
                <div className='font-semibold text-sm'>{object.name}</div>
            )
        },
    },
    {
        header: "Оборудование",
        key: 'hardwareName',
        cell: ({ hardwareName }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{hardwareName}</div>
            );
        },
    },
    {
        header: "Авария",
        key: 'nodeName',
        cell: ({ nodeName }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{nodeName || '—'}</div>
            );
        },
    },
    {
        header: "Время",
        key: 'createdAt',
        cell: ({ createdAt }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{getDate(createdAt)}</div>
            );
        },
    },
    // {
    //     header: "Затрачено",
    //     key: 'duration',
    //     cell: ({ duration }) => {
    //         return (
    //             <div className='text-center w-full text-gray-800 font-medium text-sm'>{duration}</div>
    //         );
    //     },
    // },
    // {
    //     header: "Исполнитель",
    //     key: 'responsible',
    //     cell: ({ serviceUserId }) => {
    //         return (
    //             <div className='text-center w-full text-gray-800 font-medium text-sm'>{serviceUserId}</div>
    //         );
    //     },
    // },
    {
        header: "Статус работы",
        key: 'status',
        cell: ({ status }) => {
            return (
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${getIncidentColor(status)}`}>
                        {getIncidentText(status)}
                    </div>
                </div >
            );
        },
    },
];

export const columnsService: TableColumn<ServiceType>[] = [
    {
        header: "Оборудование",
        key: 'hardwareName',
        cell: ({ hardwareName }) => {
            return (
                <div className='font-semibold text-sm'>{hardwareName}</div>
            )
        },
    },
    {
        header: "Наименование",
        key: 'title',
        cell: ({ title }) => {
            return (
                <div className='font-semibold text-sm'>{title}</div>
            )
        },
    },
    {
        header: "Дата создания",
        key: 'createdAt',
        cell: ({ createdAt }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{getDate(createdAt)}</div>
            );
        },
    },
    {
        header: "Дата завершения",
        key: 'closedAt',
        cell: ({ closedAt }) => {
            if (!closedAt) {
                return "-";
            }
            // Проверяем строковое представление
            const dateString = String(closedAt);
            const isInvalidDate =
                dateString === "01.01.1, 00:00" ||
                dateString.includes("Invalid Date") ||
                dateString === "Invalid Date" ||
                dateString === "null" ||
                dateString === "undefined";

            if (isInvalidDate) {
                return "-";
            }

            // Проверяем через Date
            const date = new Date(closedAt);
            if (isNaN(date.getTime())) {
                return "-";
            }

            // Если все проверки пройдены, показываем дату
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>
                    {getDate(closedAt)}
                </div>
            );
        },
    },
    {
        header: "Ответственный исполнитель",
        key: 'userName',
        cell: ({ userName }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{userName}</div>
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
                        ${status == "New" && "bg-blue-100 text-blue-800 border border-blue-200"}
                        ${status == "Completed" && "bg-green-100 text-green-800 border border-green-200"}
                        ${status == "Canceled" && "bg-red-100 text-red-800 border border-red-200"}
                    `}>
                        {status == "New" && "Новый"}
                        {status == "Completed" && "Завершён"}
                        {status == "Canceled" && "Отменён"}
                    </div>
                </div >
            );
        },
    },
];