import { HardwareCreate } from "@/shared/libs/hardware-form";
import { PassportHeaderPanel } from "../../components/header-panel";

export const HardwareForm = () => {
    return (
        <>
            <PassportHeaderPanel title="Оборудования" />
            <HardwareCreate toBack="/domain/passport/hardwares" />
        </>
    )
};