import { ControlType, ServiceHistoryType, ServiceModelType, ServiceStatisticType } from "@/packages/shared/libs/hardware-form/components/control/type";
import { Characteristic } from "@/packages/shared/libs/hardware-form/components/documents/type";
import { DocumentsModelType, DocumentsType } from "../documents/type";
import { PlanedServicesInterface } from "../planed-services/type";

export interface HardwareIdInterface {
    hardwareId: number,
}

export interface IdHardwareInterface {
    id: number,
}

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
    isActiveCommandModal: boolean,
    isLoaderCommand: boolean,
    switchIsCommand: () => void,
    
    evengLog?: HardwareEventsDataType[],
}

export interface HardwareServesProps {
    idHardware: number,
    getCommands: ServiceModelType[],
    servicesWeek: ServiceModelType[],
    missedService: ServiceModelType[],
    checkedService: (id: string) => void,
}

export interface HardwarePassportProps {
    getInfoNodeInfoAll: () => void,
    model: HardwareInterface,
    documents: DocumentsType[],
    сharacteristic: Characteristic[],
    commandsInfo: ControlType[],
    evengLog?: HardwareEventsDataType[] | string,
    evengLogLinksTo?: string,
    status: boolean,
    incidentList: { nodeId: number, nodeName: string }[],
}


export interface HardwareServiceProps {
    getCommands: ServiceModelType[],
    servicesWeek: ServiceModelType[],
    servicesHistory: ServiceHistoryType[],
    serviceStatistic: ServiceStatisticType[],
    planedServicesList: PlanedServicesInterface[],

    checkedService: (id: string) => void,
}


export type HardwareEventsType = {
    hadrwareId: number,
    start: Date,
    end: Date
}

export type StartEndDates = { start: Date | string, end: Date | string }


export type HardwareEventsDataType = {
    id: number,
    discription?: string,
    indicates?: string,
    timeStamp: Date,
    hardwareId: number,
    userId: number
}




// Типы данных
export interface EquipmentLogEntry {
    id: number;
    indicates: string; // "Вкл" или "Выкл"
    plcNodeId: string;
    timestamp: string;
    details?: string;
}

export interface EventLogEntry {
    id: number;
    description: string;
    timestamp: string;
}