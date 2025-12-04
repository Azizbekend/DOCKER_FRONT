import instance from "@/app/api/instances";
import { UserRoutes, CompanyRoutes } from "@/app/api/instances-routes";

export const identifyByPhone = (params: IdentifyByPhoneRequest) => {
    return instance.get(UserRoutes.IdentifyByPhone, { params })
}

export const authorization = (params: AuthRequest) => {
    return instance.get(UserRoutes.Authorization, { params })
}

export const authAdmin = (params: AuthRequest) => {
    return instance.get(UserRoutes.Authorization, { params })
}

export const getUserById = (params: GetUserById) => {
    return instance.get(UserRoutes.GetById, { params })
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

export type GetUserById = {
    id: number
}

export type AuthRequest = {
    username: string,
    password: string
}

export type IdentifyByPhoneRequest = {
    phone: string;
}

export type IdentifyByPhoneResponse = {
    id: number;
}

export type AuthResponse = {
    id: number;
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