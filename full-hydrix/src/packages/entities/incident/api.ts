import { Incident } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"

export const getAllIncedent = () => {
    return reserchInstance.get(Incident.allIncedent)
}

export const getAllFull = () => {
    return reserchInstance.get(Incident.allFull)
}

export const getByObject = (params: { id: number }) => {
    return reserchInstance.get(Incident.byObject, { params })
}

export const getForTableByObject = (params: { id: number }) => {
    return reserchInstance.get(Incident.forTableByObject, { params })
}

export const getForTableAllFull = () => {
    return reserchInstance.get(Incident.forTableAllFull)
}

export const getByHardware = (params: { id: number }) => {
    return reserchInstance.get(Incident.byHardware, { params })
}