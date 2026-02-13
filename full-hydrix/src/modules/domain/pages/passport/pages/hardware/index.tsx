import { observer } from "mobx-react-lite";
import { PassportHeaderPanel } from "../../components/header-panel";
import { hardwareModel } from "@/modules/domain/features/hardware/model";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { getTimeRanges } from "@/packages/functions/get-data/get-time-ranges";
import Loader from "@/packages/shared-ui/loader/loader";
import { HardwarePassport } from "@/packages/widgets/hardware-page-tabs";

export const HardwareInformation = observer(() => {
    const { id } = useParams();
    const objectId = getObjectId()
    const { init, model, status, isLoading, getInfoNodeInfoAll, documents, сharacteristic, incidentList, commandsInfo, evengLog } = hardwareModel

    useEffect(() => {
        const { weekRange } = getTimeRanges()
        init(Number(id), weekRange)
    }, [])


    return <div>
        <PassportHeaderPanel to={`/domain/passport/${objectId}/hardwares/${window.location.pathname.includes('/logs') ? `${id}/` : ``}`} title={model.name || '—'} />
        {isLoading ?
            <Loader />
            :
            <HardwarePassport
                model={model}
                getInfoNodeInfoAll={getInfoNodeInfoAll}
                documents={documents}
                сharacteristic={сharacteristic}
                commandsInfo={commandsInfo}
                incidentList={incidentList}
                status={status}
                evengLog={evengLog}
                evengLogLinksTo={`/domain/passport/${objectId}/hardwares/${model?.id}/logs`}
            />
        }
    </div>
});
