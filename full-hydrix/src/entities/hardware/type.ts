import { Characteristic } from "@/modules/dispatcher/pages/hardware-form/components/characteristic/type";
import { ControlType, ServiceModelType } from "@/modules/dispatcher/pages/hardware-form/components/control/type";
import { Documents } from "./api-general";

export interface CreateHardwareInterface {
    id?: number,
    name: string,
    category: string,
    developerName: string,
    supplierName: string,
    photoName?: string,
    fileId: string,
    position: string,
    opcDescription?: string,
    model: string,
    controlBlockId?: number,
}


export interface HardwareReviewProps {
    сharacteristic: Characteristic[],
    commandsInfo: ControlType[],
    documents: Documents[],
    getInfoNodeInfoAll: () => void,

    data: {
        model: string,
        position: string,
        supplierName: string,
        developerName: string,
    }
}


export interface HardwareControlleProps {
    commands: ControlType[],
    changeCommands: (value: string, id: string) => void,
    isActiveCommand: boolean,
    isLoaderCommand: boolean,
    switchIsCommand: () => void,
}

export interface HardwareServesProps {
    getCommands: ServiceModelType[],
    servicesWeek: ServiceModelType[],
    checkedService: (id: string) => void,
}