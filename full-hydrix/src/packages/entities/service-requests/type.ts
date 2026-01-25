
export type ServiceType = {
    id: number,
    title: string,
    type: string,
    status: 'New' | 'Completed' | 'Canceled',
    createdAt: Date,
    closedAt: Date,
    cancelDiscription: string,
    creatorId: number,
    implementerId: number,
    objectId: number,
    hardwareId: number,
    hardwareName?: string

    creatorsCompany?: any,
    implementersCompany?: any,
    creator?: any,
    implementer?: any,
    hardware?: any,
    userName?: any,
}


export type FormCommonServiceModelType = {
    title: string,
    discription: string,
    type: string,
    creatorId: number,
    creatorsCompanyId?: number,
    implementerId: number,
    implementersCompaneId?: number,
    hardwareId: number,
    objectId: number,
    requiredCount?: number
}

export type FormSupplyServiceModelType = {
    creatorId: number,
    creatorsCompanyId: number,
    productName: string,
    requiredCount: number,
    hardwareId: number,
    objectId: number
    nextImplementerId: number,
    nextImplementerCompanyId: number,
}


export type FormIncidentServiceModelType = {
    title: string,
    discription: string,
    incidentId: number,
    creatorId: number,
    implementerId: number,
    hardwareId: number,
    objectId: number
}

export type CompleteCancelType = {
    requestId: number,
    implementerId: number
}
export type CompleteCommonStageType = {
    stageId: number,
    discription: string
}
export type CompleteEngineerStageType = {
    stageId: number,
    engineerId: number,
    discription: string,
}
export type CancelStageType = {
    stageId: number,
    cancelDiscriprion: string
}

export type ServiceStageType = {
    id?: number,
    discription: string,
    stageType: string,
    cancelDiscription?: string,
    serviceId: number,
    creatorId: number,
    implementerId: number,
    currentStatus?: string,
    closedAt?: Date | null,
    createdAt?: Date,

    implementersCompanyId?: number,
    creatorsCompanyId?: number,
    creatorsCompany?: any,
    implementersCompany?: any,
    creator?: any,
    implementer?: any,
    hardware?: any,
    requiredCount?: number,
}


