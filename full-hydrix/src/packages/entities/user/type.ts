
export type User = {
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
    dateAuthConnect?: Date,
}

export type UserType = {
    id?: number,
    login?: string,
    password?: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    email: string,
    phoneNumber: string,
    adress: string,
    isEmailApproved?: boolean,
    baseRoleId: number
    baseRole?: null
    companyId?: number
    dateAuthConnect?: any
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