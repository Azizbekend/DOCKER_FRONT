export interface SchemaCardInterface {
    id?: number,
    top: string,
    left: string,
    nodeInfoId: number,
    schemeId?: number,
    nodeName?: number,
    value?: number | null,
    measurementName?: number,
}
export interface SchemaCardUpdateInterface {
    id: number,
    top: string,
    left: string,
}