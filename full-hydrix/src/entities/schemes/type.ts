export interface SchemaInterface {
    id: number,
    name: string,
    schemaImage: number,
    fileId?: null,
    file?: null,
    staticObjectInfoId: number,
    staticObjectInfo?: null
}

export interface IScheme2DataPoints {
    top: string,
    left: string,
    name: string,
    value: string,
    type: string,
}
