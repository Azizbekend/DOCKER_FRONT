import { Documents } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"
import { DocumentsType } from "./type"

export const createDocuments = (params: DocumentsType) => {
    return reserchInstance.post(Documents.upload, { params })
}
export const getDocuments = (params: { id: number }) => {
    return reserchInstance.get(Documents.hardware, { params })
}