import { reserchInstance } from "@/app/api/instances"
import { CancelStageType, CompleteCancelType, CompleteCommonStageType, CompleteEngineerStageType, FormCommonServiceModelType, FormIncidentServiceModelType, ServiceStageType, SupplyRequestType } from "./type"
import { ServiceRequests, ServiceStageRequests, SupplyRequest } from "@/app/routers/api-router"


// ServiceRequests
export const getServiceRequestsAll = () => {
    return reserchInstance.get(ServiceRequests.all)
}
export const getByObjectServiceRequests = (params: { id: number }) => {
    return reserchInstance.post(ServiceRequests.byObject, params)
}
export const createServiceRequests = (params: FormCommonServiceModelType) => {
    return reserchInstance.post(ServiceRequests.create, params)
}
export const createIncidentServiceRequests = (params: FormIncidentServiceModelType) => {
    return reserchInstance.post(ServiceRequests.createIncident, params)
}
export const completeServiceRequests = (params: CompleteCancelType) => {
    return reserchInstance.post(ServiceRequests.complete, params)
}
export const cancelServiceRequests = (params: CompleteCancelType) => {
    return reserchInstance.post(ServiceRequests.cancel, params)
}

// ServiceStageRequests
export const getServiceStageRequestsAll = (params: { id: number }) => {
    return reserchInstance.post(ServiceStageRequests.all, params)
}
export const getByUserStageRequests = (params: { id: number }) => {
    return reserchInstance.get(ServiceStageRequests.byUser, { params })
}
export const createServiceStageRequests = (params: ServiceStageType) => {
    return reserchInstance.post(ServiceStageRequests.create, params)
}
export const completeCommonServiceStageRequests = (params: CompleteCommonStageType) => {
    return reserchInstance.post(ServiceStageRequests.completeCommon, params)
}
export const completeServiceStageRequests = (params: CompleteEngineerStageType) => {
    return reserchInstance.post(ServiceStageRequests.complete, params)
}
export const cancelServiceStageRequests = (params: CancelStageType) => {
    return reserchInstance.post(ServiceStageRequests.cancel, params)
}



export const supplyRequestCreateStage = (params: SupplyRequestType) => {
    return reserchInstance.post(SupplyRequest.createStage, params)
}