import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate, useParams } from "react-router-dom"
import StatBar from "../company/components/graphs/bar"
import { Button } from "@/app/cores/core-trieco/UIKit"
import statsModel from "../../kernel/model/stats-model"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import summaryStatsModel from "./summary-stats-model"
import { getData } from "../stats-recycling/helper/getData"


export const AllStatsView = observer(() => {
    const { companyId } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        summaryStatsModel.getStats(Number(companyId));
    }, [])

    if (!summaryStatsModel.isInit) return <></>

    const recycleStatDaily = getData(summaryStatsModel.recycleCompanyStat, "recyclesByDays")
    const recycleStatWeek = getData(summaryStatsModel.recycleCompanyStat, "recyclesByWeeks")
    const recycleStatMonth = getData(summaryStatsModel.recycleCompanyStat, "recyclesByMonths")
    const recycleStatYear = getData(summaryStatsModel.recycleCompanyStat, "recyclesByYears")

    const priceStatDaily = getData(summaryStatsModel.plantTariffStat, "priceByDays")
    const priceStatWeek = getData(summaryStatsModel.plantTariffStat, "priceByWeeks")
    const priceStatMonth = getData(summaryStatsModel.plantTariffStat, "priceByMonths")
    const priceStatYear = getData(summaryStatsModel.plantTariffStat, "priceByTears")

    const sewersOrdersStatDaily = getData(summaryStatsModel.ordersSewersStat, "ordersByDays")
    const sewersOrdersStatWeek = getData(summaryStatsModel.ordersSewersStat, "ordersByWeeks")
    const sewersOrdersStatMonth = getData(summaryStatsModel.ordersSewersStat, "ordersByMonths")
    const sewersOrdersStatYear = getData(summaryStatsModel.ordersSewersStat, "ordersByYears")

    const plantOrdersStatDaily = getData(summaryStatsModel.plantOrdersStat, "recyclesByDays")
    const plantOrdersStatWeek = getData(summaryStatsModel.plantOrdersStat, "recyclesByWeeks")
    const plantOrdersStatMonth = getData(summaryStatsModel.plantOrdersStat, "recyclesByMonths")
    const plantOrdersStatYear = getData(summaryStatsModel.plantOrdersStat, "recyclesByYears")

    return (
        <div className="flex flex-row ml-16 justify-between h-full mb-10">
            <div>
                <div className="flex flex-row gap-[28px] items-center  mt-8">
                    <div className="bg-[#4A85F6] rounded-md w-[42px] h-[30px] flex items-center justify-center cursor-pointer" onClick={() => navigate(`/admin/company/${Number(companyId)}`)}>
                        <Icon systemName="arrow-left" />
                    </div>
                    <span className="text-[#222B45] font-bold text-[34px]">Сводная статистика</span>
                    <Button children="Скачать" class="bg-[#4A85F6] p-5 flex flex-row rounded-lg text-white py-2" onClick={() => statsModel.getExportSummaryStats(Number(companyId))} />
                </div>
                <div className="flex mt-7 flex-col gap-5">
                    <div className="flex flex-row gap-5">
                        <StatBar title="Тарифы на очистных сооружениях" dailyData={priceStatDaily} monthlyData={priceStatMonth} weeklyData={priceStatWeek} yearlyData={priceStatYear} />
                        {/* <StatBar title="Расчет заявок" dailyData={recycleStatDaily} monthlyData={recycleStatMonth} weeklyData={recycleStatWeek} yearlyData={recycleStatYear} /> */}
                        <StatBar title="Утилизация от предприятий" dailyData={recycleStatDaily} monthlyData={recycleStatMonth} weeklyData={recycleStatWeek} yearlyData={recycleStatYear} />
                    </div>
                    <div className="flex flex-row gap-5">
                        <StatBar title="Занятость ассенизаторных машин" dailyData={sewersOrdersStatDaily} monthlyData={sewersOrdersStatMonth} weeklyData={sewersOrdersStatWeek} yearlyData={sewersOrdersStatYear} />
                        <StatBar title="Утилизация на очистных сооружениях" dailyData={plantOrdersStatDaily} monthlyData={plantOrdersStatMonth} weeklyData={plantOrdersStatWeek} yearlyData={plantOrdersStatYear} />
                    </div>
                    <div className="flex flex-row gap-5">
                    </div>
                </div>
            </div>
        </div>

    )
})