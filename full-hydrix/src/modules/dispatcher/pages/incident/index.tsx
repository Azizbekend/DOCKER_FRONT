import { Table } from "@/packages/shared-ui/table-old"
import { useEffect, useState } from "react";
import { columns } from "../../features/incident/columns";
import { incedentListModel } from "../../features/incident/list-model";
import Loader from "@/packages/shared-ui/loader/loader";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { PanelIncedentRequests } from "../../features/panel-incedent-requests/panel-incedent-requests";
import { observer } from "mobx-react-lite";
import { ServiceStagesPanel } from "@/packages/shared-components/stage/stages-panel";

export const Incident = observer(() => {
    const [filterBtn, setFilterBtn] = useState<"all" | "critical" | "important" | "planned">("all");


    const { model, isLoader, init, showPanel, focusIncedent, setShowPanel, showStagePanel, setShowStagePanel, completeService, cancelService, focusService } = incedentListModel

    const handleRow = (row: any) => {
        setShowPanel(true, row)
    }

    useEffect(() => {
        init(getObjectId())
    }, [])



    const stagePanelOpen = (service: any) => {
        setShowPanel(false, focusIncedent)
        setShowStagePanel(true, service)
    }

    const StagePanelClose = () => {
        setShowStagePanel(false, null)
        setShowPanel(true, focusIncedent)
    }

    return isLoader ? <Loader /> : (<>

        <PanelIncedentRequests
            show={showPanel}
            onClose={(value) => setShowPanel(value, null)}
            incident={focusIncedent}
            stagePanelOpen={stagePanelOpen}
        />

        <ServiceStagesPanel
            completeService={completeService}
            cancelService={cancelService}
            show={showStagePanel}
            onClose={StagePanelClose}
            isService={focusService}
        />

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
            data={model}
        />

    </>)
})

const TypeButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
    return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}

const FilterButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
    return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}