import instance from "../api"
import { CompanyRoutes, UserRoutes } from "../api-routes"

export const GetUserById = (params: GetUserByIdRequest) => {
    return instance.get(UserRoutes.GetById, { params })
}

export const emailConfirm = (params: ConfirmEmailRequest) => {
    return instance.get(UserRoutes.EmailConfirm, { params })
}

export const emailApprove = (params: UserEmailApproveRequest) => {
    return instance.patch(UserRoutes.Approve, {}, { params })
}

export const getUserCompany = (params: GetCompanyIdRequest) => {
    return instance.get(CompanyRoutes.GetByUserId, { params })
}

export const recoveryPassword = (params: RecoveryPasswordRequest) => {
    return instance.put(UserRoutes.PasswordRecovery, {}, { params })
}

export const updateMunicipalities = (data: UpdateMunicipalitiesRequest) => {
    return instance.put(CompanyRoutes.UpdateMunicipality, data);
}

export const deleteMunicipalities = (data: DeleteMunicipalitiesRequest) => {
    return instance.delete(CompanyRoutes.DeleteMunicipality, { data });
}

export type UpdateMunicipalitiesRequest = {
    companyId: number;
    municipalityIds: number[];
};

export type DeleteMunicipalitiesRequest = {
    companyId: number;
    municipalityIds: number[];
};

export type RecoveryPasswordRequest = {
    Email: string;
}

export type GetCompanyIdRequest = {
    UserId: number;
}

export type UserEmailApproveRequest = {
    UserId: number;
}

export type ConfirmEmailRequest = {
    UserId: number;
    EmailAddress: string;
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