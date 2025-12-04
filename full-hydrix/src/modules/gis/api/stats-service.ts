
export const getExportSummaryStats = (params: GetStatRequest) => {
    return instance.get(StatsRoutes.ExportSummary, { params, responseType: 'blob' })
}
export const getExportTransportingStats = (params: GetStatRequest) => {
    return instance.get(StatsRoutes.ExportTransporting, { params, responseType: 'blob' })
}
export const getExportUtilizationStats = (params: GetStatRequest) => {
    return instance.get(StatsRoutes.ExportUtilization, { params, responseType: 'blob' })
}

import instance from "@/app/api/instances"
import { StatsRoutes } from "@/app/cores/core-gis/network/api-routes"

// export const getSummaryRecycleByCompanyStat = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.SummaryCompanyRecycle, { params })
// }

// export const getSummaryPlantTariffStat = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.SummaryPlantTariff, { params })
// }

// export const getSummaryOrdersSewersStat = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.SummaryOrdersSewers, { params })
// }

// export const getSummaryOrdersPlantStat = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.SummaryOrdersPlant, { params })
// }

export const getRecycleAllStat = (params: GetStatRequest) => {
    return instance.get(StatsRoutes.RecycleAll, { params })
}

export const getRecycleCompaniesStat = (params: GetStatRequest) => {
    return instance.get(StatsRoutes.RecycleCompany, { params })
}

export const getTariffChanges = (params: GetStatRequest) => {
    return instance.get(StatsRoutes.TariffChanges, { params })
}

// export const getAvgPrice = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.AverageOrderPrice, { params })
// }

// export const getExportedVolume = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.ExportedVolume, { params })
// }

// export const getExportProfit = (params: GetStatRequest) => {
//     return instance.get(StatsRoutes.Profit, { params })
// }

export type GetStatRequest = {
    WaterCompanyId: number;
}