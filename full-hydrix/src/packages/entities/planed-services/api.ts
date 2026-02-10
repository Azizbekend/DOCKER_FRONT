import { reserchInstance } from "@/app/api/instances"
import { PlanedServices } from "@/app/routers/api-router"
import { PlanedServicesCreate } from "./type"

export const getFactWorkTime = (params: { hardware: number }) => {
    return reserchInstance.get(PlanedServices.factWorkTime, { params })
}
export const getListByHardware = (params: { id: number }) => {
    return reserchInstance.get(PlanedServices.byHardware, { params })
}
export const postCreatePlanedServices = (params: PlanedServicesCreate) => {
    return reserchInstance.post(PlanedServices.create, params)
}