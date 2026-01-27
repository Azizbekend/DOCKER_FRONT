import { Hardware, NodeIndicates } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"
import { CreateHardwareInterface, HardwareEventsType } from "./type"

export const getAllHardware = () => {
    return reserchInstance.get(Hardware.all)
}

export const getInfoHardware = (params: { id: number }) => {
    return reserchInstance.get(Hardware.one, { params })
}

export const updateInfoHardware = (params: CreateHardwareInterface) => {
    return reserchInstance.put(Hardware.update, params)
}

export const deleteInfoHardware = (params: { id: number }) => {
    return reserchInstance.delete(Hardware.delete, { params })
}

export const createHardware = (params: CreateHardwareInterface) => {
    return reserchInstance.post(Hardware.create, params)
}

export const activeHardware = (params: { id: number }) => {
    return reserchInstance.post(Hardware.active, params)
}

export const statusHardwaresCheck = (params: { ids: number[] }) => {
    return reserchInstance.post(Hardware.statusHardwaresCheck, params)
}

export const hardwaresEvents = (params: HardwareEventsType) => {
    return reserchInstance.post(Hardware.events, params)
}

export const hardwaresLogs = (params: HardwareEventsType) => {
    return reserchInstance.post(NodeIndicates.getLogs, params)
}
