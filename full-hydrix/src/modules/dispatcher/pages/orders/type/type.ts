import { ReactNode } from "react"

export type StatisticsType = {
    name: string,
    value: string,
    color: string,
}
export type TtemsRequestRegistryType = {
    name: string,
    id: string,
    texts: ReactNode[],
    status: {
        name: string,
        color: string,
    }[],
    time: string,
    progress: string,
}


export type CreateRequestModelType = {
    type: number | null,
    description: string,
    company: string,
    forCreate: string,
    fio: string,
    dateCreate: string,
    operator: string,
    phone: string,
    email: string,
}