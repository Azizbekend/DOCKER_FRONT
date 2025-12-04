import { Table } from "@/app/cores/core-trieco/UIKit/table"
import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect } from "react"
import { observer } from "mobx-react-lite"
import statsModel from "./models/stats-model"
import { OrderStatus, OrderStatusText, StatusColor } from "../orders/utils/getStatus"

export const OrdersStats = observer(() => {

    const columns: ColumnDef<any, any>[] = [
        {
            header: "№",
            accessorKey: 'id',
            size: 20,
            cell: info => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold">{info.getValue()}</span>
                )
            },
        },
        {
            header: "Дата регистрации заявки",
            accessorKey: 'arrivalEndDate',
            cell: info => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold">{dateInYMD(info.getValue())}</span>
                )
            },
        },
        {
            header: "Дата вывоза ЖБО",
            accessorKey: 'completionDate',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{dateInYMD(info.getValue())}</span>
                )
            },
        },
        {
            header: 'Объем утилизированного ЖБО',
            accessorKey: 'wasteVolume',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()} м³</span>
                )
            },
        },
        {
            header: 'Стоимость вывоза',
            accessorKey: 'recycleVolume',
            cell: ({ row }) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{(Number(row.original['сost']) * Number(row.original['wasteVolume']))}</span>
                )
            },
        },
        {
            header: 'ФИО Заказчика',
            accessorKey: 'recycleVolume',
            cell: ({ row }) => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold" > {row.original['userLastName']} {row.original['userFirstName']} {row.original['userPatronymi']}</span>
                )
            },
        },
        {
            header: "Адрес сбора ЖБО",
            accessorKey: 'address',
            cell: info => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold">{info.getValue()}</span>
                )
            },
        },
        {
            header: "ФИО Исполнителя",
            accessorKey: 'municipalityName',
            cell: ({ row }) => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold" > {row.original['sewerLastName']} {row.original['sewerFirstName']} {row.original['sewerPatronymic']}</span>
                )
            },
        },
        {
            header: "Предприятие",
            accessorKey: 'companyName',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'ИНН Предприятия',
            accessorKey: 'companyINN',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'Стоимость утилизации',
            accessorKey: 'сost',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'Статус заявки',
            accessorKey: 'orderStatusId',
            cell: info => {
                let el = Number(info.getValue()) as OrderStatus

                if (info.getValue() === undefined) {
                    el = OrderStatus.Cancelled
                }
                const bgColor = `${StatusColor(el)} `
                const style = `text-white rounded-[30px] py-[6px] px-[32px] text-center m-auto w-max whitespace-nowrap`

                return (
                    <div className={style} style={{ backgroundColor: bgColor }}>
                        <span>{OrderStatusText[el]}</span>
                    </div>
                )
            },
        },
    ]


    const dateInYMD = (dateString: string) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }


    const { getOrdersStats, model, switchLoader, loader } = statsModel

    useEffect(() => {
        switchLoader(false)
    }, [])

    return (
        <>
            {loader &&
                <Table pageSize={10} class="w-[94%] table-fixed border-separate border-spacing-0"
                    maxWidth={true}
                    columns={columns}
                    data={model} />
            }
        </>
    )
})