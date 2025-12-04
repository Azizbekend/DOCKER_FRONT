import { ColumnDef } from "@tanstack/react-table"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import statsModel from "./models/stats-model"
import { Table } from "@/shared/ui/table/index"
import { TableColumn } from "@/shared/ui/table/setting/types"
import { MunicipalityStats, OrdersStats, PlantsStats } from "./services/stats"

const columns: TableColumn<MunicipalityStats>[] = [
    {
        header: "№",
        key: '',
        width: "100px",
        cell: () => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{count++}</span>
            )
        },
    },
    {
        header: "Муниципальное образование",
        key: 'municipalityName',
        cell: ({ municipalityName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold text-[#4A85F6] underline decoration-1" onClick={(e) => { e.preventDefault(); getPlantsStats(-1, municipalityName); changeBreadCrumbsPlant(municipalityName); setPageName("plants") }}>{municipalityName}</span>
            )
        },
    },
    {
        header: "Количество  заявок",
        key: 'totalCount',
        cell: ({ totalCount }) => {
            return (
                <span className="text-[14px] text-[#222B45]">{totalCount}</span>
            )
        },
    },
    {
        header: 'Объем вывозимого ЖБО',
        key: 'extractVolume',
        cell: ({ extractVolume }) => {
            return (
                <span className="text-[14px] text-[#222B45]">{extractVolume}</span>
            )
        },
    },
    {
        header: 'Объем утилизированного ЖБО',
        key: 'recycleVolume',
        cell: ({ recycleVolume }) => {
            return (
                <span className="text-[14px] text-[#222B45]">{recycleVolume}</span>
            )
        },
    },
    {
        header: 'Общая стоимость вывозимого',
        key: 'recycleVolume',
        cell: (info) => {
            return (
                <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
            )
        },
    },
    {
        header: 'Общая стоимость утилизированного',
        key: 'recycleVolume',
        cell: (info) => {
            return (
                <span className="text-[14px] text-[#222B45]">{info.getValue()}</span>
            )
        },
    },
]

export const MunicipalitiesStats = observer(() => {
    const { getMunicipalitiesStats, model, setPageName, getPlantsStats,
        isSearch, searchedModel, changeBreadCrumbsPlant, switchLoader, loader
    } = statsModel

    useEffect(() => {
        switchLoader(false)
        getMunicipalitiesStats()
    }, [])

    return (
        <>
            <Table
                classNames={{
                    body: 'mt-4'
                }}
                columns={columns}
                data={isSearch ? searchedModel : model} />
        </>
    )
})