export type CreateSewerUserRequest = {
    login: string,
    password: string,
    firstName: string,
    lastName: string,
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

    name: string,
    email: string,
    phone: string
    login?: string,
    password?: string
}

export type SewersGetByCompanyRequest = {
    companyId: number
}

export type GetSewersCompanyId = {
    WaterCompanyId: number
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
    companyId?: number,
    companyName?: string,
    email: string,
    phoneNumber: string,
    rating: number,
    userId: number,
    firstName: string,
    lastName: string,
    patronymic: string
}