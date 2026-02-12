export interface IdPlanedServicesInterface {
    id: number
}

export interface CreatePlanedServicesInterface {
    title: string,
    periodInHours: number,
    hardwareId: number
}

export interface PlanedServicesInstructionInterface {
    id: number,
    title: string,
    instructions: string,
}

export interface PlanedServicesInterface {
    id: number,
    title: string,
    periodInHours: number,
    factWorkTime: number,
    hardwareId: number,
    instructionListId: number,
    time?: number
}


export interface CreatePlanedCommonServicesInterface {
    discription: string,
    creatorId: number,
    creatorsCompanyId: number,
    implementerId: number,
    implementersCompaneId: number,
    planServiceId: number,
    objectId: number
}

export interface CompletePlanedCommonServicesInterface {
    requestId: number,
    implementerId: number,
    implementerCompanyId: number
}

export interface CreatePlanedServicesStageInterface {
    discription: string,
    stageType: string,
    serviceId: number,
    creatorId: number,
    creatorsCompanyId: number,
    implementerId: number,
    implementersCompanyId: number
}

export interface IdPlanedServicesStageInterface {
    // НАЗВАНИЕ ПЕРЕПУТАНО, ДОЛЖНО БЫТЬ stageId
    commonServiceId: string
}

export interface SimpleCompletePlanedServicesInstructionInterface {
    stageId: number,
    discription: string
}

export interface CreatePlanedServicesInstructionInterface {
    title: string,
    discription: string
}

export interface PlanedServicesInstructionInterface {
    id: number,
    title: string,
    discription: string
}

export interface AttachMainPlanedServiceInterface {
    plannedServiceId: number,
    instructionId: number
}

export interface EnginnerCompletePlanedServicesStageInterface {
    stageId: number,
    engineerId: number,
    discription: string
}

export interface EnginnerCancelPlanedServicesStageInterface {
    stageId: number,
    cancelDiscriprion: string
}

export interface CreateAttachPlanedServicesInstructionInterface {
    title: string,
    discription: string,
    planServiceId: number
}

export interface FactWorkTimeInterface {
    time: string
}