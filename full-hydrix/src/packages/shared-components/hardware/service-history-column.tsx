import { TableColumn } from "@/packages/shared-ui/table/types";
import { ServiceHistoryType } from "../../shared/libs/hardware-form/components/control/type";

export const columns: TableColumn<ServiceHistoryType>[] = [
    {
        header: 'Наименование',
        key: 'name',
        width: "1fr",
        cell: ({ title }) => (
            <span className="text-sm text-gray-800 font-medium line-clamp-2 h-10 overflow-hidden">{title}</span>
        ),
    },
    {
        header: "Плановая дата",
        key: 'position',
        width: "1fr",
        cell: ({ sheduleMaintenanceDate }) => {

            const date = new Date(sheduleMaintenanceDate).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '.')

            return (
                <span className='font-bold text-[var(--clr-accent)] mt-1 text-sm'>
                    {date}
                </span>
            )
        },
    },
    {
        header: "Фактическая дата",
        key: 'completedMaintenanceDate',
        cell: (row) => {
            const scheduleDate = new Date(row.sheduleMaintenanceDate);
            const actualDate = new Date(row.completedMaintenanceDate);
            // const isOnTime = actualDate < scheduleDate;


            const formattedDate = actualDate.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '.');

            const formattedDate2 = scheduleDate.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '.');

            const isOnTime = formattedDate <= formattedDate2

            return (
                <span
                    className={`font-bold text-sm ${isOnTime
                        ? "text-green-600"
                        : "text-red-500"
                        }`}
                >
                    {formattedDate}
                </span>
            );
        },
    },
];