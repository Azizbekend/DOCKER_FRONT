import { observer } from "mobx-react-lite";
import { PassportHeaderPanel } from "../../components/header-panel";
import { hardwareModel } from "@/modules/domain/features/hardware/model";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { getTimeRanges } from "@/packages/functions/get-data/get-time-ranges";

export const HardwareInformation = observer(() => {
    const { id } = useParams();
    const objectId = getObjectId()
    const { model, init } = hardwareModel


    useEffect(() => {
        const { weekRange } = getTimeRanges()
        init(Number(id), weekRange)
    }, [])


    return <div>
        <PassportHeaderPanel to={`/domain/passport/${objectId}/hardwares/${window.location.pathname.includes('/logs') ? `${id}/` : ``}`} title={model.name || '—'} />
        <Outlet />
    </div>
});
