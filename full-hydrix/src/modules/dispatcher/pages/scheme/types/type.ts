import { SchemaObjectType } from "@/packages/entities/hardware/type-general"
import { SchemaCardInterface } from "@/packages/entities/sensor/type"

export type InformationsComponentsType = {
    title: string,
    img: string,
    items: InformationsType[]
}


export type InformationsType = {
    title: string,
    value: string
}


export type SchemeViewerType = {
    setInfo: (id: number, status: boolean) => void,
    tabScheme: number,
    switchColo: boolean,

    points: SchemaObjectType[],
    listSensore: SchemaCardInterface[]

    model: SchemaObjectType[],
    timesFunctions: () => void,

    setSchemeObjectData: (id: number) => void,
    setSchemeSensoreData: (id: number) => void,
}

export type SchemeViewerPointType = {
    top: string,
    left: string,
    size: [number, number],
    label: string,
    id: number,
    accident?: boolean,
    control?: SchemeViewerPointControlType,
    status?: HardWareStatus,
    image?: string,
}


export enum HardWareStatus {
    OK = 1,
    WORK = 2,
    ERROR = 3,
}


export type SchemeViewerPointControlType = {
    type: "auto" | "manual",
    top: string,
    left: string,
}


export type InfoCompType = {
    key?: number,
    id?: number,
    className: string,
    focusHardwareStatus: boolean,
    item?: InformationsComponentsType,
    onClick: (id: number, status: boolean) => void,
}

export type CountersType = {
    id: number,
    name: string,
    value: number,
    unit: string,
    top: string,
    left: string,
    min: number,
    max: number
}

export interface SchemeDragType {
    offset: OffsetType,
    setOffset: (IOffset: OffsetType) => void,
}

export interface OffsetType {
    x: number,
    y: number
}
export interface BoundsType {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
}
