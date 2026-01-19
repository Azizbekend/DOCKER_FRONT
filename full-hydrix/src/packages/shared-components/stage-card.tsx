    import { ServiceStageType } from "../entities/service-requests/type";
import { getDate } from "../hook/get-date";

export const StageCard = ({ stage, footerBlock }: { stage: ServiceStageType, footerBlock?: React.ReactNode }) => {
    return (
        <div key={stage.id} className="border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-gray-800 mb-2">Этап {stage.id}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>id:</b> {stage.id}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>discription:</b> {stage.discription}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>stageType:</b> {stage.stageType}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>cancelDiscription:</b> {stage.cancelDiscription}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>serviceId:</b> {stage.serviceId}</p>

            <p className="text-sm font-medium text-gray-800 mb-2"><b>creatorId:</b> {stage.creatorId}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>implementerId:</b> {stage.implementerId}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>currentStatus:</b> {stage.currentStatus}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>closedAt:</b> {getDate(stage.closedAt)}</p>
            <p className="text-sm font-medium text-gray-800 mb-2"><b>createdAt:</b> {getDate(stage.createdAt)}</p>

            {footerBlock}

        </div>
    );
}