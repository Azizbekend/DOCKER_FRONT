import instance from "../api"
import { StatRoutes } from "../api-routes"

export type GetCompanyStatRequest = {
    CompanyId: number
}

export const getAvgPriceStat = (params: GetCompanyStatRequest) => {
    return instance.get(StatRoutes.GetAvgPrice, {params})
}

export const getTransportIncome = (params: GetCompanyStatRequest) => {
    return instance.get(StatRoutes.GetTransportingIncome, {params})
}

export const getExported = (params: GetCompanyStatRequest) => {
    return instance.get(StatRoutes.GetExported, {params})
}