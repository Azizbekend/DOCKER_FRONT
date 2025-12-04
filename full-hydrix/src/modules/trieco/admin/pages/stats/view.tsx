import { useEffect, useState } from "react"
import LineStatistic from "./components/graphs/line"
import { observer } from "mobx-react-lite"
import { Table } from "@/app/cores/core-trieco/UIKit/table"
import statModel from "./models/stat-model"
import adminModel from "../../kernel/model/admin-model"
import { getLineData } from "@/app/cores/core-trieco/lib/getData"

export const StatsView = observer(() => {
    const [view, setView] = useState(StatsVariants[0].value)

    useEffect(() => {
        getStat(adminModel.companyId || 0);
    }, [])

    const { avgPriceStat, exportedStat, getStat, meta, transportIncomeStat } = statModel

    const avgPriceStatDaily = getLineData(avgPriceStat, "priceByDays")
    const avgPriceStatWeek = getLineData(avgPriceStat, "priceByWeeks")
    const avgPriceStatMonth = getLineData(avgPriceStat, "priceByMonths")
    const avgPriceStatYear = getLineData(avgPriceStat, "priceByYears")

    const exportedStatDaily = getLineData(exportedStat, "wasteByDays")
    const exportedStatWeek = getLineData(exportedStat, "wasteByWeeks")
    const exportedStatMonth = getLineData(exportedStat, "wasteByMonths")
    const exportedStatYear = getLineData(exportedStat, "wasteByYears")

    const transportIncomeStatDaily = getLineData(transportIncomeStat, "incomeByDays")
    const transportIncomeStatWeek = getLineData(transportIncomeStat, "incomeByWeeks")
    const transportIncomeStatMonth = getLineData(transportIncomeStat, "incomeByMonths")
    const transportIncomeStatYear = getLineData(transportIncomeStat, "incomeByYears")

    if (!meta) return <></>
    return (
        <div className="mt-12 pb-4 w-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col w-[50%] gap-6">
                    <span className="text-[34px] font-semibold">Статистика</span>
                </div>
            </div>
            <div className="flex flex-row gap-9">
                {/* <StatBlock icon="stat-sewer" title={`Объем ${'\n'} вывозимого жбо`} value="400 м3" />
                <StatBlock icon="stat-waste" title={`Объем ${'\n'} утилизируемого ${'\n'} жбо`} value="400 м3" />
                <StatBlock icon="stat-profit" title="Объем прибыли" value="500 000" /> */}
            </div>

            {/* <SelectionComponent items={StatsVariants} className="mt-10" selected={view} onSelect={(item) => setView(item.value)} /> */}
            {
                // view === 0 ?
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex flex-row gap-2">
                        <LineStatistic title="Средняя цена заявки" dailyData={avgPriceStatDaily} weeklyData={avgPriceStatWeek} monthlyData={avgPriceStatMonth} yearlyData={avgPriceStatYear} />
                        <LineStatistic title="Вывезенное ЖБО" dailyData={exportedStatDaily} weeklyData={exportedStatWeek} monthlyData={exportedStatMonth} yearlyData={exportedStatYear} />
                    </div>

                    <LineStatistic title="Прибыль от транспортировки" dailyData={transportIncomeStatDaily} weeklyData={transportIncomeStatWeek} monthlyData={transportIncomeStatMonth} yearlyData={transportIncomeStatYear} />
                </div>
                // : <Table columns={[]} data={[]} />
            }

        </div>
    )
})

const StatsVariants = [
    {
        label: "Графики",
        value: 0
    },
    {
        label: "Статистика по ассенизаторам",
        value: 1
    },

]
