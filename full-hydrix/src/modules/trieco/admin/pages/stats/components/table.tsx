import { Table } from "@/app/cores/core-trieco/UIKit/table"
import { ColumnDef } from "@tanstack/react-table"

export const TableView = () => {
    return (
        <Table columns={columns} data={data} />
    )
}

const data: any[] = [
    {
        lastName: "Иванов",
        firstName: "Иван",
        type: "Частный",
        model: "МАЗ",
        carNumber: "О777ОО116",
        exportedVolume: 400,
        recycledVolume: 500,
        cost: 200000,
    },
    {
        lastName: "Иванов",
        firstName: "Иван",
        type: "Государственный",
        model: "ГАЗ",
        carNumber: "О777ОО116",
        exportedVolume: 500,
        recycledVolume: 300,
        cost: 300000,
    },
    {
        lastName: "Иванов",
        firstName: "Иван",
        type: "Государственный",
        model: "МАЗ",
        carNumber: "О777ОО116",
        exportedVolume: 300,
        recycledVolume: 500,
        cost: 400000,
    }
]


const columns: ColumnDef<any, any>[] = [
    {
        header: "ФИО Водителя",
        accessorKey: 'name',
        cell: ({ row }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{row.original['lastName']} {row.original['firstName']}</span>)
        },
    },
    {
        header: "Виды предпринимательства",
        accessorKey: 'type',
        size: 280,
        cell: info => {
            return (
                <span className="text-[12px] ml-10">{info.getValue()}</span>
            )
        },
    },
    {
        header: 'Марка',
        accessorKey: 'model',
        cell: info => {
            return (
                <span className="text-[12px]">{info.getValue()}</span>
            )
        },

    },
    {
        header: 'Номер автомобиля',
        accessorKey: 'carNumber',
        cell: info => {
            return (
                <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">{info.getValue()}</div>
            )
        }
    },
    {
        header: 'Объем вывозимого ЖБО',
        accessorKey: 'exportedVolume',
        size: 180,
        cell: info => {
            return (
                <div className="text-[14px] text-[#222B45] font-semibold w-full text-center">{info.getValue()} м3</div>
            )
        }
    },
    {
        header: 'Объем утилизируемого ЖБО',
        accessorKey: 'recycledVolume',
        size: 220,
        cell: info => {
            return (
                <div className="text-[14px] text-[#222B45] font-semibold w-full text-center">{info.getValue()} м3</div>
            )
        }
    },
    {
        header: 'Полная стоимость утилизации',
        accessorKey: 'cost',
        cell: info => {
            return (
                <div className="text-[14px] text-[#222B45] font-semibold w-full text-center">{info.getValue()}</div>
            )
        }
    },

]