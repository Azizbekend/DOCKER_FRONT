import { HardwareCreate } from "@/packages/shared/libs/hardware-form";
import { PassportHeaderPanel } from "../../components/header-panel";
import { useState } from "react";
import { getObjectId } from "@/packages/hook/objectData/getObjectData";

export const HardwareForm = () => {

    const objectId = getObjectId()


    return (
        <>
            <PassportHeaderPanel title="Оборудования" to="/domain/list" />
            <HardwareCreate toBack={`/domain/passport/${objectId}/hardwares`} />
        </>
    )
};