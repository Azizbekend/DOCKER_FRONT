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
    setInfo: (id: number) => void,
    points: SchemeViewerPointType[]
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
    id: number,
    className: string,
    onClick: (id: number) => void
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
