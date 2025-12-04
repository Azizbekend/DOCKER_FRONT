import instance from "@/app/api/instances";
import { UserRoutes } from "@/app/api/instances-routes";

export const GetUserById = (params: GetUserByIdRequest) => {
    return instance.get(UserRoutes.GetById, { params })
}

export type GetUserByIdRequest = {
    id: number;
}

export type GetUserByIdResponse = {
    id: number,
    login: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    email: string,
    phoneNumber: string,
    adress: string,
    companyId: number
    roleId: number,
}

export const recoveryPassword = (params: RecoveryPasswordRequest) => {
    return instance.put(UserRoutes.PasswordRecovery, {}, { params })
}

export type RecoveryPasswordRequest = {
    Email: string;
}