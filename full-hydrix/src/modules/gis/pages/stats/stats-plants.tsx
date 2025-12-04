import { ColumnDef } from "@tanstack/react-table"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import statsModel from "./models/stats-model"
import { useParams } from "react-router-dom"

export const PlantsStats = observer(() => {

    const columns: ColumnDef<any, any>[] = [
        {
            header: "№",
            accessorKey: 'plantId',
            size: 20,
            cell: info => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold">{info.getValue()}</span>
                )
            },
        },
        {
            header: "Наименование",
            accessorKey: 'plantName',
            cell: ({ row }) => {
                return (
                    <span className="text-[14px] text-[#222B45] font-semibold text-[#4A85F6] underline decoration-1" onClick={(e) => { e.preventDefault(); changeBreadCrumbsOrder(row.original["plantName"]); setPageName("orders"); getOrdersStats(row.original["plantId"]) }}>{row.original["plantName"]}</span>
                )
            },
        },
        {
            header: "Завершено заявок",
            accessorKey: 'orderCount',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'Объем утилизированного ЖБО',
            accessorKey: 'recycleVolume',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'Суточный лимит',
            accessorKey: 'dailyLimit',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'Адрес',
            accessorKey: 'address',
            cell: (info) => {
                return (
                    <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
                )
            },
        },
    ]

    const { getPlantsStats, model, plantsResult, switchLoader, loader, setPageName,
        getOrdersStats, changeBreadCrumbsOrder } = statsModel

    const { user } = gisModel;
    const { companyId } = useParams();

    useEffect(() => {
        switchLoader(false)
        if (user?.roleId == Role.WaterCompany) {
            const id = Number(companyId);
            getPlantsStats(id ?? 0)
        }
    }, [])



    return (
        <div className="mt-12 ml-10">
            {loader &&
                <>
                    <Table pageSize={10} class="max-w-[94%] table-fixed border-separate border-spacing-0"
                        plantsResult={plantsResult}
                        columns={columns}
                        data={model} />
                </>
            }
        </div>
    )
})