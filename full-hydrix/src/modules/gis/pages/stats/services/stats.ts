import instance from "@/app/cores/core-gis/network/api"
import { SewersRoutes, StatsRoutes } from "@/app/cores/core-gis/network/api-routes"

export const getTableMunicipalities = (params: getDateMunicipalities) => {
    return instance.get(StatsRoutes.TableMunicipalities, { params })
}
export const getTablePlants = (params: getDatePlants) => {
    return instance.get(StatsRoutes.TablePlants, { params })
}
export const getTableOrders = (params: getDateOrders) => {
    return instance.get(StatsRoutes.TableOrders, { params })
}

export const asdGetByIdWaterCompany = (params: asd) => {
    return instance.get(SewersRoutes.GetByIdWaterCompany, { params })
}

type asd = {
    WaterCompanyId: number,
}
type getDateMunicipalities = {
    StartDate: string,
    EndDate: string,
}
type getDatePlants = {
    WaterCompanyId: number,
    StartDate: string,
    EndDate: string,
}
type getDateOrders = {
    PlantId: number,
    StartDate: string,
    EndDate: string,
}

export type MunicipalityStats = {
    municipalityName: string,
    totalCount: number,
    extractVolume: number,
    recycleVolume: number,
}

export type PlantsStats = {
    plantId: number,
    plantName: string,
    orderCount: number,
    recycleVolume: number,
    dailyLimit: number,
    address: string
}

export type MunicipalitiesResult = {
    totalCount: number,
    extractVolume: number,
    recycleVolume: number,
}

export type PlantsStatsResult = {
    orderCount: number,
    recycleVolume: number,
    dailyLimit: number,
}

export type OrdersStatsResult = {
    countOrders: number,
    totalVolumeExported: number,
    costExported: number,
    costDisposed: number,
}

export type OrdersStats = {
    id: string,
    arrivalEndDate: string,
    completionDate: string,
    wasteVolume: number,
    userFirstName: string,
    userLastName: string,
    userPatronymic: string,
    sewerFirstName: string,
    sewerLastName: string,
    sewerPatronymic: string,
    companyName: string,
    companyINN: string,
    address: string,
    orderStatusId: number
}