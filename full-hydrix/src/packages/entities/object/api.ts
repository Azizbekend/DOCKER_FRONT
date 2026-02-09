import { NodeIndicates, PassportObject } from "@/app/routers/api-router";
import { reserchInstance } from "@/app/api/instances";
import { PassportDataType } from "./type";


export const getTechnicalCharsShapshi = () => {
    return reserchInstance.get(NodeIndicates.technicalChars)
}

export const getTechSpecsStatisticsByPeriod = (params: { plcNodeId: string, startTime: Date, endTime: Date }) => {
    return reserchInstance.post(NodeIndicates.getTechSpecsStatisticsByPeriod, params)
}

export const getAllObjects = () => {
    return reserchInstance.get(PassportObject.all)
}

export const getAllUserObjects = (params: { userId: number }) => {
    return reserchInstance.get(PassportObject.getAllUserObjects, { params })
}

export const getOneData = (params: { id: number }) => {
    return reserchInstance.get(PassportObject.single, { params })
}

export const objectCreate = (params: PassportDataType) => {
    return reserchInstance.post(PassportObject.create, params)
}

export const objectUpdate = (params: PassportDataType) => {
    return reserchInstance.put(PassportObject.update, params)
}