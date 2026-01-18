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
    hardwareId: number,
    objectId: number
}


export type FormCommonServiceModelType = {
    title: string,
    discription: string,
    type: string,
    creatorId: number,
    implementerId: number,
    hardwareId: number,
    objectId: number
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
    engineerId: number
}

export type CancelStageType = {
    stageId: number,
    cancelDiscriprion: string
}

export type ServiceStageType = {
    discription: string,
    stageType: string,
    serviceId: number,
    creatorId: number,
    implementerId: number
}
