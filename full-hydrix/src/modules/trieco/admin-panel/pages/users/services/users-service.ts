import instance from "@/app/api/instances"
import { CompanyRoutes, UserRoutes } from "@/app/cores/core-trieco/network/api-routes"

export const GetAllUsers = () => {
    return instance.get(UserRoutes.GetAllUsers)
}
export const GetById = (params: UserId) => {
    return instance.get(UserRoutes.GetById, { params })
}
export const UserPasswordRecovery = (data: string) => {
    return instance.put(`${UserRoutes.PasswordRecovery}/?Email=${data}`)
}

export const DeleteUser = (data: number) => {
    return instance.delete(`${UserRoutes.Delete}/?UserId=${data}`)
}

export const createCompany = (data: CompanyRegistrateRequest) => {
    return instance.post(CompanyRoutes.Create, data)
}

export const createClientCompany = (data: CompanyRegistrateRequest) => {
    return instance.post(CompanyRoutes.CreateClientCompany, data)
}

export const registrate = (params: RegistrationRequest) => {
    return instance.post(UserRoutes.Create, params)
}

export type User = {
    id: number,
    login: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    email: string,
    phoneNumber: string,
    adress: string,
    companyId: number,
    roleId: number,
}

export type UserId = {
    Id: number
}


export type CompanyRegistrateRequest = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    companyName: string;
    phoneNumber: string;
    ogrn: string;
    inn: string;
    adress: string;
    juridicalAddress?: string;
    companyTypeId: number,
    directorName: string,
    kpp: string,
    shortName: string;
    repeatPassword?: string;
    roleId?: number,
}

export type RegistrationRequest = {
    email: string,
    password: string,
    repeatPassword?: string,
    login: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    adress: string,
    roleId: number,
    companyName: string
}