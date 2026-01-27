import { reserchInstance } from "@/app/api/instances"
import { Documents } from "@/app/routers/api-router"

export const objectDocumentUpload = (params: any) => {
    return reserchInstance.post(Documents.objectDocumentUpload, params)
}
export const objectDocumenAll = (params: {id: number}) => {
    return reserchInstance.get(Documents.objectDocumenAll, {params})
}
export const objectDocumentDelete = (params: {id: number}) => {
    return reserchInstance.delete(Documents.objectDocumentDelete, {params})
}