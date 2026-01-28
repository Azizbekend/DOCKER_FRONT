import { HardwareInterface } from "../hardware/type"

export type IncedentRequestType = {
    title: string,
    discription: string,
    incidentId: number,
    creatorId: number,
    creatorsCompanyId: number,
    implementerId: number,
    implementersCompaneId: number,
    hardwareId: number,
    objectId: number
}

export interface Incident {
    id: number,
    nodeName: string,
    discription: null,
    status: string,
    isClosed: boolean,
    createdAt: string,
    closedAt: string,
    hardwareId: number,
    hardwareName?: string,
    controlBlockId: number,
    objectId: number,
    serviceUserId: number
    
    object?: any
}

export interface IncidentColumn {
    id: number,
    nodeName: string,
    discription: null,
    status: string,
    isClosed: false,
    createdAt: Date,
    closedAt: Date,
    hardwareId: number,
    controlBlockId: number,
    objectId: number,
    serviceUserId: number,
    hardware: HardwareInterface
}