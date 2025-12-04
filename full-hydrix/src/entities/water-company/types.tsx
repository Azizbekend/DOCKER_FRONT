import { Municipality } from "../municipality/type"
import { Operator } from "../operator/type"

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

export type DeleteCompanyRequest = {
    WaterCompanyId: number,
}
export type GetWaterCompanyByUserRequest = {
    UserId: number
}

export type GetWaterCompanyOperatorsRequest = {
    WaterCompanyId: number
}