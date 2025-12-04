import { ExtendedColumnDef, Table } from "@/app/cores/core-trieco/UIKit/table";

export const TableView = () => {
    return (
        <Table columns={columns} data={data} />
    )
}
const data: any[] = [
    {
        date: '31.07.2024',
        type: 'Наличные',
        summ: 5000,
        remark: 'Текст',
    },
    {
        date: '01.08.2024',
        type: 'Безналичные',
        summ: 5000,
        remark: 'Текст',
    },
    {
        date: '31.07.2024',
        type: 'Наличные',
        summ: 5000,
        remark: 'Текст',
    },
    {
        date: '01.08.2024',
        type: 'Безналичные',
        summ: 5000,
        remark: 'Текст',
    },
]
const columns: ExtendedColumnDef<any, any>[] = [
    {
        header: "Дата операции",
        accessorKey: 'date',
        size: 240,
        cell: info => {
            return (
                <p className="text-center text-[14px] text-[#222B45] font-semibold">{info.getValue()}</p>
            )
        },
    },
    {
        header: `Тип`,
        filterOptions: [{ title: 'Наличные' }, { title: 'Безналичные' }],
        accessorKey: 'type',
        cell: info => {
            return (
                <>
                    <p className="text-center text-[14px] text-[#222B45] font-semibold">{info.getValue()}</p>
                </>
            )
        },
    },
    {
        header: `Сумма`,
        accessorKey: 'summ',
        cell: info => {
            return (
                <>
                    <p className="text-center text-[14px] text-[#222B45] font-semibold">{info.getValue()}</p>
                </>
            )
        },
    },
    {
        header: `Примечание`,
        accessorKey: 'remark',
        cell: info => {
            return (
                <>
                    <p className="text-center text-[14px] text-[#222B45] font-semibold">{info.getValue()}</p>
                </>
            )
        },
    },

]