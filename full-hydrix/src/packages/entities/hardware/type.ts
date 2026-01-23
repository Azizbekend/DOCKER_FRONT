import { ControlType, ServiceHistoryType, ServiceModelType } from "@/packages/shared/libs/hardware-form/components/control/type";
import { Characteristic } from "@/packages/shared/libs/hardware-form/components/documents/type";
import { DocumentsModelType, DocumentsType } from "../documents/type";

export interface HardwareInterface {
    id: number,
    name: string,
    category: string,
    controlBlockId: number,
    developerName: string,
    opcDescription: string,
    photoName: string,
    position: string,
    supplierName: string,
    activatedAt?: string,
    model: string,
    createdAt?: string,
    fileId?: number,
    fileModel?: string,
}



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
    documents: DocumentsModelType[],
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

export interface HardwarePassportProps {
    getInfoNodeInfoAll: () => void,
    model: HardwareInterface,
    documents: DocumentsType[],
    сharacteristic: Characteristic[],
    commandsInfo: ControlType[],
    status: boolean,
    incidentList: { nodeId: number, nodeName: string }[],
}


export interface HardwareServiceProps {
    getCommands: ServiceModelType[],
    servicesWeek: ServiceModelType[],
    servicesHistory: ServiceHistoryType[],
    serviceStatistic: ServiceStatisticType[],

    checkedService: (id: string) => void,
}
