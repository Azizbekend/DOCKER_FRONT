import { Table } from "@/packages/shared-ui/table-old"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "./components/columns";
import { incidents } from "./data/data";

export const Incident = () => {

    const navigate = useNavigate();

    const [typeTable, setTypeTable] = useState<"orders" | "incident">("orders");
    const [filterBtn, setFilterBtn] = useState<"all" | "critical" | "important" | "planned">("all");


    const handleRow = () => {
        navigate("/domain/passport/information")
    }


    return (<>


        <div className='flex items-center gap-3 mb-7'>
            <FilterButton name='Все' isActive={filterBtn == "all"} onClick={() => setFilterBtn("all")} />
            <FilterButton name='Критичные' isActive={filterBtn == "critical"} onClick={() => setFilterBtn("critical")} />
            <FilterButton name='Важные' isActive={filterBtn == "important"} onClick={() => setFilterBtn("important")} />
            <FilterButton name='Плановые' isActive={filterBtn == "planned"} onClick={() => setFilterBtn("planned")} />
        </div>

        <Table
            onRowClick={handleRow}
            columns={columns}
            countActive
            data={incidents}
        />

    </>)
}



const TypeButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
    return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}


const FilterButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
    return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}