export type User = {
    id: number,
    login: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    email: string,
    phoneNumber: string,
    adress: string,
    roleId: number,
    isEmailApproved: boolean,
}

export type Company = {
    companyId: number
}
