import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/modules/domain/features/hardware/model";
import Loader from "@/packages/shared-ui/loader/loader";
import { HardwarePassport } from "@/packages/shared/libs/hardware/tabs/page-tabs";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";

export const HardwareInformationPassport = observer(() => {

    const { model, status, isLoading, getInfoNodeInfoAll, documents, сharacteristic, incidentList, commandsInfo, evengLog } = hardwareModel
    const objectId = getObjectId()

    return <div>
        {isLoading ? <Loader /> :
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
