import { HardwareEvents } from "@/packages/widgets/hardware-page-tabs/events";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export const HardwareInformationLogs = observer(() => {

    const { id } = useParams();

    return id && <HardwareEvents hardwareId={Number(id)} />;
});
