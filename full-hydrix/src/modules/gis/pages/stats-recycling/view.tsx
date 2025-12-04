import OrderStatisticsChart from "../company/components/graphs/line"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import recyclingStatsModel from "./recycling-stats-model"
import { getLineData } from "./helper/getData"
import { Icon } from "@/shared/ui/icon"
import { Button } from "@/shared/ui/button"
import statsModel from "../../layout/model/stats-model"

export const RecyclingStatsView = observer(() => {
    const { companyId } = useParams()
    useEffect(() => {
        recyclingStatsModel.getStats(Number(companyId));
    }, [])
    const navigate = useNavigate();

    if (!recyclingStatsModel.isInit) return <></>

    const recycleAllStatDayly = getLineData(recyclingStatsModel.recycleAllStat, "recyclesByDays")
    const recycleAllStatWeekly = getLineData(recyclingStatsModel.recycleAllStat, "recyclesByWeeks")
    const recycleAllStatMonthly = getLineData(recyclingStatsModel.recycleAllStat, "recyclesByMonths")
    const recycleAllStatYearly = getLineData(recyclingStatsModel.recycleAllStat, "recyclesByYears")

    const recycleCompanyStatDayly = getLineData(recyclingStatsModel.recycleCompaniesStat, "recyclesByDays")
    const recycleCompanyStatWeekly = getLineData(recyclingStatsModel.recycleCompaniesStat, "recyclesByWeeks")
    const recycleCompanyStatMonthly = getLineData(recyclingStatsModel.recycleCompaniesStat, "recyclesByMonths")
    const recycleCompanyStatYearly = getLineData(recyclingStatsModel.recycleCompaniesStat, "recyclesByYears")

    const tariffChangesStatDayly = getLineData(recyclingStatsModel.tariffChanges, "changesByDays")
    const tariffChangesStatWeekly = getLineData(recyclingStatsModel.tariffChanges, "changesByWeeks")
    const tariffChangesStatMonthly = getLineData(recyclingStatsModel.tariffChanges, "changesByMonths")
    const tariffChangesStatYearly = getLineData(recyclingStatsModel.tariffChanges, "changesByYears")

    return (
        <div className="flex flex-row ml-16 justify-between h-full">
            <div>
                <div className="flex flex-row gap-[28px] items-center  mt-8">
                    <div className="bg-[#4A85F6] rounded-md w-[42px] h-[30px] flex items-center justify-center cursor-pointer" onClick={() => navigate(-1)}>
                        <Icon systemName="arrow-left" />
                    </div>
                    <span className="text-[#222B45] font-bold text-[34px]">Статистика утилизации</span>
                    <Button children="Скачать" class="bg-[#4A85F6] p-5 flex flex-row rounded-lg text-white py-2" onClick={() =>
                        statsModel.getExportUtilizationStats(Number(companyId))
                    }
                    />
                </div>
                <div className="flex mt-7 flex-col gap-5">
                    <div className="flex flex-row gap-5">
                        <OrderStatisticsChart title="Утилизированное ЖБО" dailyData={recycleAllStatDayly} monthlyData={recycleAllStatMonthly} weeklyData={recycleAllStatWeekly} yearlyData={recycleAllStatYearly} />
                        <OrderStatisticsChart title="Утилизированное ЖБО с предприятий" dailyData={recycleCompanyStatDayly} monthlyData={recycleCompanyStatMonthly} weeklyData={recycleCompanyStatWeekly} yearlyData={recycleCompanyStatYearly} />
                    </div>
                    <div className="flex flex-row gap-5">
                        <OrderStatisticsChart title="Динамика тарифа на очистных сооружений" dailyData={tariffChangesStatDayly} monthlyData={tariffChangesStatMonthly} weeklyData={tariffChangesStatWeekly} yearlyData={tariffChangesStatYearly} />
                        {/* <OrderStatisticsChart title="Прибыль на очистных сооружений" dailyData={recycleStatDaily} monthlyData={recycleStatMonth} weeklyData={recycleStatWeek} yearlyData={recycleStatYear} /> */}
                    </div>
                </div>
            </div>
        </div>

    )
})
