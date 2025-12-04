import { observer } from "mobx-react-lite"
import statsModel from "./models/stats-model"
import { useEffect } from "react"
import { Role } from "@/entities/user/role"
import { InfoCards } from "./components/info-cards"
import { StatsFilter } from "./components/filter"
import { MunicipalitiesStats } from "./stats-municipalities"
import { PlantsStats } from "./stats-plants"


export const Stats = observer(() => {
    const { setPageName, pageName, breadCrumbs, changeBreadCrumbsPlant, changeBreadCrumbsOrder, loader } = statsModel
    // const { user } = gisModel;

    useEffect(() => {
        const user: { roleId: Role } = {
            roleId: Role.Ministry
        }
        if (user?.roleId == Role.WaterCompany) setPageName("plants")
        if (user?.roleId == Role.Ministry) setPageName("municipalities")
    }, [])

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col w-[94%] gap-6">
                    <span className="text-[34px] font-semibold">Статистика</span>

                    <div className="text-[28px] -mt-6">
                        {
                            breadCrumbs.plant &&
                            <span className={`${!breadCrumbs.order && 'font-bold'} cursor-pointer`} onClick={() => { changeBreadCrumbsPlant(""); changeBreadCrumbsOrder(""); setPageName('municipalities') }}>{breadCrumbs?.plant}</span>
                        }

                        {
                            breadCrumbs.order &&
                            <span className=" font-bold cursor-pointer" onClick={() => { changeBreadCrumbsOrder(""); setPageName('plants') }}>{breadCrumbs.plant && <> - </>}{breadCrumbs.order}</span>
                        }
                    </div>

                    {(pageName === "municipalities" || pageName === "orders" || loader) &&
                        <InfoCards />
                    }

                    <StatsFilter />
                </div>
            </div>


            {pageName === "municipalities" && <MunicipalitiesStats />}
            {pageName === "plants" && <PlantsStats />}
            {/* {pageName === "orders" && <OrdersStats />} */}
        </>
    )
})