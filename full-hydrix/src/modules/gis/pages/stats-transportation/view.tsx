import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import OrderStatisticsChart from "../company/components/graphs/line"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/app/cores/core-trieco/UIKit"
import statsModel from "../../kernel/model/stats-model"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import transportationStatsModel from "./transportation-stats-model"
import { getLineData } from "../stats-recycling/helper/getData"

export const TransportationStatsView = observer(() => {
    const navigate = useNavigate();
    const { companyId } = useParams()

    useEffect(() => {
        transportationStatsModel.getStats(Number(companyId))
    }, [])

    if (!transportationStatsModel.isInit) return <></>

    const exportVolumeStatDayly = getLineData(transportationStatsModel.exportVolumeStat, "exportsByDays")
    const exportVolumeStatWeekly = getLineData(transportationStatsModel.exportVolumeStat, "exportsByWeeks")
    const exportVolumeStatMonthly = getLineData(transportationStatsModel.exportVolumeStat, "exportsByMonths")
    const exportVolumeStatYearly = getLineData(transportationStatsModel.exportVolumeStat, "exportsByYears")

    const exportProfitStatDayly = getLineData(transportationStatsModel.exportProfitStat, "profitByDays")
    const exportProfitStatWeekly = getLineData(transportationStatsModel.exportProfitStat, "profitByWeeks")
    const exportProfitStatMonthly = getLineData(transportationStatsModel.exportProfitStat, "profitByMonths")
    const exportProfitStatYearly = getLineData(transportationStatsModel.exportProfitStat, "profitByYears")

    const avgPriceStatDayly = getLineData(transportationStatsModel.avgOrderPrice, "priceByDays")
    const avgPriceStatWeekly = getLineData(transportationStatsModel.avgOrderPrice, "priceByWeeks")
    const avgPriceStatMonthly = getLineData(transportationStatsModel.avgOrderPrice, "priceByMonths")
    const avgPriceStatYearly = getLineData(transportationStatsModel.avgOrderPrice, "priceByYears")

    return (
        <div className="flex flex-row ml-16 justify-between h-full">
            <div>
                <div className="flex flex-row gap-[28px] items-center  mt-8">
                    <div className="bg-[#4A85F6] rounded-md w-[42px] h-[30px] flex items-center justify-center cursor-pointer" onClick={() => navigate(`/admin/company/${Number(companyId)}`)}>
                        <Icon systemName="arrow-left" />
                    </div>
                    <span className="text-[#222B45] font-bold text-[34px]">Статистика транспортировки</span>
                    <Button children="Скачать" class="bg-[#4A85F6] p-5 flex flex-row rounded-lg text-white py-2" onClick={() => statsModel.getExportTransportingStats(Number(companyId))} />
                </div>
                <div className="flex mt-7 flex-col gap-5">
                    <div className="flex flex-row gap-5">
                        <OrderStatisticsChart title="Вывезенное ЖБО" dailyData={exportVolumeStatDayly} monthlyData={exportVolumeStatMonthly} weeklyData={exportVolumeStatWeekly} yearlyData={exportVolumeStatYearly} />
                        <OrderStatisticsChart title="Средняя цена заявки" dailyData={avgPriceStatDayly} monthlyData={avgPriceStatMonthly} weeklyData={avgPriceStatWeekly} yearlyData={avgPriceStatYearly} />
                    </div>
                    <div className="flex flex-row gap-5">
                        <OrderStatisticsChart title="Прибыль от транспортировки" dailyData={exportProfitStatDayly} monthlyData={exportProfitStatMonthly} weeklyData={exportProfitStatWeekly} yearlyData={exportProfitStatYearly} />
                    </div>
                </div>
            </div>
        </div>

    )
})