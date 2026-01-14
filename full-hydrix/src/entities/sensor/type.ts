export interface SchemaCardInterface {
    id?: number,
    top: string,
    left: string,
    nodeInfoId: number,
    schemeId?: number,
    nodeName?: string,
    value?: number | null,
    measurementName?: number,
    hardwareId?: number,
    hardwareStatus?: boolean,
}
export interface SchemaCardUpdateInterface {
    id: number,
    top: string,
    left: string,
}