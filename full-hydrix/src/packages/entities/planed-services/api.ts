import { reserchInstance } from "@/app/api/instances"
import { PlanedCommonServices, PlanedServices, PlanedServicesInstruction, PlanedServicesStage } from "@/app/routers/api-router"
import { AttachMainPlanedServiceInterface, CompletePlanedCommonServicesInterface, CreateAttachPlanedServicesInstructionInterface, CreatePlanedCommonServicesInterface, CreatePlanedServicesInstructionInterface, CreatePlanedServicesStageInterface, CreatePlanedServicesInterface, IdPlanedServicesInterface, EnginnerCompletePlanedServicesStageInterface, EnginnerCancelPlanedServicesStageInterface, SimpleCompletePlanedServicesInstructionInterface, IdPlanedServicesStageInterface } from "./type"
import { HardwareIdInterface, IdHardwareInterface } from "../hardware/type"

export const getFactWorkTimeApi = (params: HardwareIdInterface) => {
    return reserchInstance.get(PlanedServices.factWorkTime, { params })
}

export const getPlanedServicesByHardwareApi = (params: IdHardwareInterface) => {
    return reserchInstance.get(PlanedServices.byHardware, { params })
}

export const getPlanedServiceTimeLeftApi = (params: IdPlanedServicesInterface) => {
    return reserchInstance.get(PlanedServices.timeLeft, { params })
}

export const createPlanedServiceApi = (params: CreatePlanedServicesInterface) => {
    return reserchInstance.post(PlanedServices.create, params)
}

export const createPlanedCommonServiceApi = (params: CreatePlanedCommonServicesInterface) => {
    return reserchInstance.post(PlanedCommonServices.create, params)
}

export const completePlanedCommonServiceApi = (params: CompletePlanedCommonServicesInterface) => {
    return reserchInstance.post(PlanedCommonServices.complete, params)
}

export const createPlanedServicesStageApi = (params: CreatePlanedServicesStageInterface) => {
    return reserchInstance.post(PlanedServicesStage.create, params)
}

export const getFileLinkCommonPlanedServicesStageApi = (params: IdPlanedServicesStageInterface) => {
    return reserchInstance.get(PlanedServicesStage.fileLink, { params })
}

export const completeCommonPlanedServicesStageApi = (params: SimpleCompletePlanedServicesInstructionInterface) => {
    return reserchInstance.post(PlanedServicesStage.commonComplete, params)
}

export const completeEngineerPlanedServicesStageApi = (params: EnginnerCompletePlanedServicesStageInterface) => {
    return reserchInstance.post(PlanedServicesStage.engineerComplete, params)
}

export const cancelEngineerPlanedServicesStageApi = (params: EnginnerCancelPlanedServicesStageInterface) => {
    return reserchInstance.post(PlanedServicesStage.engineerCancel, params)
}

export const getAllPlanedServicesInstructionApi = () => {
    return reserchInstance.get(PlanedServicesInstruction.all)
}

export const getPlanedServicesInstructionApi = (params: IdPlanedServicesInterface) => {
    return reserchInstance.get(PlanedServicesInstruction.getInstruction, { params })
}

export const createPlanedServicesInstructionApi = (params: CreatePlanedServicesInstructionInterface) => {
    return reserchInstance.post(PlanedServicesInstruction.create, params)
}

export const attachPlanedServicesInstructionApi = (params: AttachMainPlanedServiceInterface) => {
    return reserchInstance.post(PlanedServicesInstruction.attach, params)
}

export const createAndAttachPlanedServicesInstructionApi = (params: CreateAttachPlanedServicesInstructionInterface) => {
    return reserchInstance.post(PlanedServicesInstruction.createAttach, params)
}