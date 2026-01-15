import { observer } from "mobx-react-lite";
import { PassportHeaderPanel } from "../../components/header-panel";
import { hardwareModel } from "@/features/hardware/model";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "@/shared/ui/loader/loader";
import { Icon } from "@/shared/ui/icon";
import { formatToTwoDecimalsSafe } from "@/shared/libs/hardware/functions/formatToTwoDecimalsSafe";
import { eventLog } from "@/features/hardware/data";
import HardwareStatistics from "@/shared/libs/hardware/components/hardware-statistic";
import { HardwarePassport } from "@/shared/libs/hardware/tabs/page-tabs";

export const HardwareInformation = observer(() => {
    const { id } = useParams();
    const { model, init, isLoading, getInfoNodeInfoAll, documents, сharacteristic, commandsInfo } = hardwareModel

    useEffect(() => {
        init(Number(id))

        getInfoNodeInfoAll();
        const interval = setInterval(getInfoNodeInfoAll, 3000);
        return () => clearInterval(interval);
    }, [])

    const isConnected = true;

    return isLoading ? <Loader /> :
        <div>
            <PassportHeaderPanel to={"/domain/passport/hardwares"} title={model.name || '—'} />

            <HardwarePassport
                model={model}
                getInfoNodeInfoAll={getInfoNodeInfoAll}
                documents={documents}
                сharacteristic={сharacteristic}
                commandsInfo={commandsInfo}
            />
        </div>
});
