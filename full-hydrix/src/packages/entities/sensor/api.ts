import { SchemaCard } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"
import { SchemaCardInterface, SchemaCardUpdateInterface } from "./type"

export const ApiSchemaCardCreate = (params: SchemaCardInterface) => {
    return reserchInstance.post(SchemaCard.create, params)
}
export const ApiSchemaCardAll = (params: { id: number }) => {
    return reserchInstance.get(SchemaCard.all, { params })
}
export const ApiSchemaCardUpdate = (params: SchemaCardUpdateInterface) => {
    return reserchInstance.put(SchemaCard.update, params)
}
export const ApiSchemaCardDelete = (params: { id: number }) => {
    return reserchInstance.delete(SchemaCard.delete, { params })
}