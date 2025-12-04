
import instance from "@/app/api/instances"
import { WaterCompanyRoutes } from "@/app/cores/core-gis/network/api-routes"
import { GetWaterCompanyOperatorsRequest } from "./types"

// export const getAllCompanies = () => {
//     return instance.get(WaterCompanyRoutes.GetAll)
// }

// export const createCompany = (data: CreateCompanyRequest) => {
//     return instance.post(WaterCompanyRoutes.Create, data)
// }

// export const deleteCompany = (params: DeleteCompanyRequest) => {
//     return instance.delete(WaterCompanyRoutes.Delete, { params })
// }

// export const getWaterCompany = (params: GetWaterCompanyRequest) => {
//     return instance.get(WaterCompanyRoutes.Get, { params })
// }

// export const getWaterCompanyByUserId = (params: GetWaterCompanyByUserRequest) => {
//     return instance.get(WaterCompanyRoutes.GetByUserId, { params })
// }

export const getWaterCompanyOperators = (params: GetWaterCompanyOperatorsRequest) => {
    return instance.get(WaterCompanyRoutes.GetAllOperators, { params })
}

// export const createWaterCompanyOperator = (data: Operator) => {
//     return instance.post(WaterCompanyRoutes.CreateOperator, data)
// }