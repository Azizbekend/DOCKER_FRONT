import instance from "../api"
import { WaterCompanyRoutes } from "../api-routes"

export type GetWaterCompanyRequest = {
    id: number
}

export type CreateCompanyRequest = {
    name: string,
    operatorFirstName: string,
    operatorLastName: string,
    operatorPatronymic: string,
    operatorPhone: string,
    operatorEmail: string,
    municipalityId: number,
    address: string,
    ogrn: string,
    inn: string,
    kpp: string,
    login: string
}

export type WaterCompany = {
    id: number,
    name: string,
    waterCompanyName?: string,
    address: string,
    municipality: Municipality,
    municipalityName?: string,
    ogrn: string,
    inn: string,
    kpp: string,
    operator: Operator,
    isTransporter: boolean,
    isDeleted: boolean,
    email?: string,
    phoneNumber?: string;
}

export type Operator = {
    userId?: number,
    firstName: string;
    lastName: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    login: string;
    roleName?: string;
    isRevoked?: boolean;
    waterCompanyId?: number;
    plantId?: number;
    workplace?: string;
}

export type Municipality = {
    id: number,
    name: string
}

export type DeleteCompanyRequest = {
    WaterCompanyId: number,
}

export type GetWaterCompanyByUserRequest = {
    UserId: number
}

export type GetWaterCompanyOperatorsRequest = {
    WaterCompanyId: number
}

export const getAllCompanies = () => {
    return instance.get(WaterCompanyRoutes.GetAll)
}

export const createCompany = (data: CreateCompanyRequest) => {
    return instance.post(WaterCompanyRoutes.Create, data)
}

export const deleteCompany = (params: DeleteCompanyRequest) => {
    return instance.delete(WaterCompanyRoutes.Delete, { params })
}

export const getWaterCompany = (params: GetWaterCompanyRequest) => {
    return instance.get(WaterCompanyRoutes.Get, { params })
}

export const getWaterCompanyByUserId = (params: GetWaterCompanyByUserRequest) => {
    return instance.get(WaterCompanyRoutes.GetByUserId, { params })
}

export const getWaterCompanyOperators = (params: GetWaterCompanyOperatorsRequest) => {
    return instance.get(WaterCompanyRoutes.GetAllOperators, { params })
}

export const createWaterCompanyOperator = (data: Operator) => {
    return instance.post(WaterCompanyRoutes.CreateOperator, data)
}