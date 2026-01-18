import { Table } from "@/packages/shared-ui/table-old"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "./components/columns";
import { incidents } from "./data/data";
import { FilterButton } from "./components/FilterButton";
import { PassportHeaderPanel } from "../../components/header-panel";

export const Incident = () => {
    const navigate = useNavigate();
    const [filterBtn, setFilterBtn] = useState<"all" | "critical" | "important" | "planned">("all");

    const handleRow = () => {
        navigate("/domain/passport/information")
    }

    return (<>

        <PassportHeaderPanel
            title="Аварии"
        />

        <div className='flex items-center gap-3 mb-7'>
            <FilterButton name='Все' isActive={filterBtn == "all"} onClick={() => setFilterBtn("all")} />
            <FilterButton name='Критичные' isActive={filterBtn == "critical"} onClick={() => setFilterBtn("critical")} />
            <FilterButton name='Важные' isActive={filterBtn == "important"} onClick={() => setFilterBtn("important")} />
        </div>

        <Table
            onRowClick={handleRow}
            columns={columns}
            countActive
            data={incidents}
        />

    </>)
}


