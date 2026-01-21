import { NodeIndicates, PassportObject } from "@/app/routers/api-router";
import { reserchInstance } from "@/app/api/instances";

export const getTechnicalCharsShapshi = () => {
    return reserchInstance.get(NodeIndicates.technicalChars)
}

export const getAllUserObjects = (params: { userId: number }) => {
    return reserchInstance.get(PassportObject.getAllUserObjects, { params })
}

export const getOneData = (params: { id: number }) => {
    return reserchInstance.get(PassportObject.single, { params })
}