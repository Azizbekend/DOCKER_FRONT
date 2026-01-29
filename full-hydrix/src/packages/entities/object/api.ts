import { NodeIndicates, PassportObject } from "@/app/routers/api-router";
import { reserchInstance } from "@/app/api/instances";


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