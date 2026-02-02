import { IncidentColumn } from "@/packages/entities/incident/type";
import { getBetweenTimeByHour } from "@/packages/functions/get-data/get-between-time-by-hour";
import { getDate } from "@/packages/functions/get-data/get-date";
import { getIncidentColor, getIncidentText } from "@/packages/functions/get-data/get-incident-status";
import { TableColumn } from "@/packages/shared-ui/table/types";


export const columns: TableColumn<IncidentColumn>[] = [
    {
        header: "Оборудование",
        key: 'hardware.name',
        cell: ({ hardware }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-sm'>{hardware.name}</div>
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
    //     cell: (row) => {
    //         return (
    //             <div className='text-center w-full text-gray-800 font-medium text-sm'>{row.isClosed ? (getDate(row.createdAt, "short") + " — " + getDate(row.closedAt, "short")) : "—"}</div>
    //         );
    //     },
    // },
    {
        header: "Статус работы",
        key: 'status',
        width: "200px",
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