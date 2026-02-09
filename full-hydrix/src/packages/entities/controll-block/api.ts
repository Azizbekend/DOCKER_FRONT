import { reserchInstance } from "@/app/api/instances"
import { ControlBlock } from "@/app/routers/api-router"

export const getOneObjectData = (params: { id: number }) => {
    return reserchInstance.get(ControlBlock.getOne, { params })
}

export const checkObjectPlc = (params: { plcIp: string }) => {
    return reserchInstance.get(ControlBlock.checkPlc, { params })
}