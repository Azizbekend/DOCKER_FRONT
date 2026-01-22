import { Incident } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"

export const getAllIncedent = () => {
    return reserchInstance.get(Incident.allIncedent)
}

export const getAllFull = () => {
    return reserchInstance.get(Incident.allFull)
}

export const getByObject = () => {
    return reserchInstance.get(Incident.byObject)
}

export const getForTableByObject = () => {
    return reserchInstance.get(Incident.forTableByObject)
}

export const getForTableAllFull = () => {
    return reserchInstance.get(Incident.forTableAllFull)
}

export const getByHardware = () => {
    return reserchInstance.get(Incident.byHardware)
}