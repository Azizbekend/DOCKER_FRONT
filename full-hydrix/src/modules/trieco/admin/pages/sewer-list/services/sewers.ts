import { UserRoutes } from "@/app/api/api-router"
import instance from "@/app/api/instances"
import { SewersRoutes } from "@/app/cores/core-trieco/network/api-routes"

export const getSewersByCompanyId = (params: SewersGetByCompanyRequest) => {
    return instance.get(SewersRoutes.GetByCompanyId, { params })
}

export const getSewersByUserId = (params: SewersGetByUserRequest) => {
    return instance.get(SewersRoutes.GetByUserId, { params })
}

export const getAllSewers = () => {
    return instance.get(SewersRoutes.GetAll)
}

export const createSewer = (data: CreateSewerRequest) => {
    return instance.post(SewersRoutes.Create, data)
}

export const createSewerUser = (data: CreateSewerUserRequest) => {
    return instance.post(UserRoutes.Create, data)
}

export type CreateSewerUserRequest = {
    login: string,
    password: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    companyId?: number,
    email?: string,
    phoneNumber?: string,
    roleId: number,
}

export type CreateSewerRequest = {
    userId: number,
    sewerBusinessType: string,
    sewerCarModel: string,
    sewerNumberPlate: string,
    tankVolume: number
    companyId: number,
    email: string,
    phoneNumber: string,
    name: string,
    login?: string,
    password?: string
}

export type SewersGetByCompanyRequest = {
    Id: number
}

export type SewersGetByUserRequest = {
    userId: number
}

export type Sewer = {
    id: number,
    sewerNumberPlate: string,
    sewerCarModel: string,
    sewerBusinessType: string,
    tankVolume: number,
    companyId: number,
    companyName?: string,
    userId: number,
    firstName: string,
    lastName: string,
    rating: number,
    patronymic: string,
    email?: string,
    phoneNumber?: string
}