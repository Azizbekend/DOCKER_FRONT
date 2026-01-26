import { Documents } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"
import { DocumentsType, UploadObjectDocumentType } from "./type"

export const createDocuments = (params: DocumentsType) => {
    return reserchInstance.post(Documents.upload, { params })
}
export const getDocuments = (params: { id: number }) => {
    return reserchInstance.get(Documents.hardware, { params })
}
export const uploadObjectDocument = (params: UploadObjectDocumentType) => {
    return reserchInstance.get(Documents.objectDocumentUpload, { params })
}