export interface DocumentsType {
    id?: number | string,
    title: string,
    file?: File | null,
    fileName?: string | null,
    hardwareId?: number,
    contentType?: number,
    fileSize?: number,
    downloadUrl?: string,
}
export interface DocumentsModelType {
    file: File | null,
    fileName: string,
    documentName?: string,
}


export interface UploadObjectDocumentType {
    docId: number,
    objectId: number
}

Document

