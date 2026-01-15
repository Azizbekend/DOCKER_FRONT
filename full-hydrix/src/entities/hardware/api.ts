import { Hardware } from "@/app/api/api-router"
import { reserchInstance } from "@/app/api/instances"
import { CreateHardwareInterface } from "./type"

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

export const statusCheck = (params: { ids: number[] }) => {
    return reserchInstance.post(Hardware.statusCheck, params)
}
