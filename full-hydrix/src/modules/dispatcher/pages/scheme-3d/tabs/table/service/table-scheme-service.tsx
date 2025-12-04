import instance from "@/app/api/instances";
import { intercept } from "mobx"

export type TableSchemeType = {
    id: number,
    name: string,
    node: string,
}


export type ControlBlockAllType = {
    controlBlock: {
        id: number,
        name: string,
        plcIpAdress: string,
    },
    controlBlockId: number,
    id: number,
    name: string,
    opcDescription: string,
}


export type NodeIndicatesType = {
    id: number,
    indicates: string,
    nodeInfoId: number,
    nodeInfo: null,
    timeStamp: string
}


export const createOrderByPoint = () => {
    return instance.get("/Hardware/all", {});
}


export const getAllClientCompanies = (params: { id: number }) => {
    return instance.get("/NodeIndicates/actual", { params })
}