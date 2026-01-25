import { HardwareEvents } from "@/packages/shared/libs/hardware/tabs/page-tabs/events";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export const HardwareInformationLogs = observer(() => {

    const { id } = useParams();

    return id && <HardwareEvents hardwareId={Number(id)} />;
});
