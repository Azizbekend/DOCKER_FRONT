import { PassportDataType } from "../object/type";

export interface ControlBlockType {
    id: number,
    name: string,
    plcIpAdress: string,
    staticObjectInfoId: number,
    staticObjectInfo: PassportDataType
}