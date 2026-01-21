import { observer } from "mobx-react-lite";
import { PassportHeaderPanel } from "../../components/header-panel";
import { hardwareModel } from "@/modules/domain/features/hardware/model";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "@/packages/shared-ui/loader/loader";
import { HardwarePassport } from "@/packages/shared/libs/hardware/tabs/page-tabs";
import { getObjectId } from "@/packages/hook/objectData/getObjectData";

export const HardwareInformation = observer(() => {
    const { id } = useParams();
    const objectId = getObjectId()

    const { model, init, status, isLoading, getInfoNodeInfoAll, documents, сharacteristic, incidentList, commandsInfo } = hardwareModel

    useEffect(() => {
        init(Number(id))

        getInfoNodeInfoAll();
        const interval = setInterval(getInfoNodeInfoAll, 3000);
        return () => clearInterval(interval);
    }, [])

    const isConnected = true;

    return isLoading ? <Loader /> :
        <div>
            <PassportHeaderPanel to={`/domain/passport/${objectId}/hardwares`} title={model.name || '—'} />

            <HardwarePassport
                model={model}
                getInfoNodeInfoAll={getInfoNodeInfoAll}
                documents={documents}
                сharacteristic={сharacteristic}
                commandsInfo={commandsInfo}
                incidentList={incidentList}
                status={status}
            />
        </div>
});
