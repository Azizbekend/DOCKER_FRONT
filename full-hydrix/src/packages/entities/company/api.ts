import { instance, reserchInstance } from "@/app/api/instances"
import { authorizationInstance } from "@/app/api/instances/instance-authorization"
import { WaterCompanyRoutes } from "@/app/cores/core-gis/network/api-routes"
import { Company, PassportObject } from "@/app/routers/api-router"
import { CompanyCreate } from "./type"

export const getAllClientCompanies = () => {
    return instance.get(WaterCompanyRoutes.GetAll)
}

export const getCompanyOne = (params: {id: number}) => {
    return authorizationInstance.get(Company.getOne, {params})
}

export const getCompanyByName = () => {
    return authorizationInstance.get(Company.byName)
}

export const getCompanyByInn = (params: { inn: number | string }) => {
    return authorizationInstance.get(Company.byInn, { params })
}

export const createCompany = (params: CompanyCreate) => {
    return authorizationInstance.post(Company.create, params)
}

export const getCompanyByObject = (params: { id: number }) => {
    return reserchInstance.get(PassportObject.byObject, { params })
}