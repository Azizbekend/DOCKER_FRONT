import { observer } from "mobx-react-lite"
import statsModel from "../models/stats-model"
// import { DateFilter } from "./date-filter"
import { Search } from "@/shared/ui/Inputs/input-search"
import { Button } from "@/shared/ui/button"
import { DateFilter } from "./date-filter"

type Props = {
    title: string,
    meaning: string | number,
    specChar?: string
}

export const StatsFilter = observer(() => {
    const { searchValue, search, filterTerm, filterTermChange } = statsModel

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-row gap-8 items-center">
                <Button children="Экспорт" class="text-white hover:opacity-50 bg-[#4A85F6] py-2.5 px-6 flex items-center" onClick={() => { console.log("экспорт") }} />

                <Search placeholder="Поиск (название, адрес)" value={searchValue} onChange={search} classNames={{
                    container: "w-min rounded-lg h-[38px]",
                    input: "border-[#EFF4FA] !w-[400px]",
                }} />
            </div>

            <div className="flex items-center gap-[30px] text-[14px] font-semibold">

                <DateFilter />

                <div className="flex bg-[#F0F0F0] p-[7px] rounded-3xl">
                    <button className={`px-4 py-1 rounded-xl font-semibold ${filterTerm === "day" ? "bg-white" : "text-[#656565]"}`}
                        onClick={() => filterTermChange('day')} >По дням</button>

                    <button className={`px-4 py-1 rounded-xl font-semibold ${filterTerm === "week" ? "bg-white" : "text-[#656565]"}`}
                        onClick={() => filterTermChange('week')} >По неделям</button>

                    <button className={`px-4 py-1 rounded-xl font-semibold ${filterTerm === "month" ? "bg-white" : "text-[#656565]"}`}
                        onClick={() => filterTermChange('month')} >По месяцам</button>

                    <button className={`px-4 py-1 rounded-xl font-semibold ${filterTerm === "year" ? "bg-white" : "text-[#656565]"}`}
                        onClick={() => filterTermChange('year')} >По годам</button>
                </div>
            </div>
        </div>
    )
})