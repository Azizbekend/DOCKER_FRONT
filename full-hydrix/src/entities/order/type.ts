export type AttachSewerRequest = {
    orderId: number;
    sewerId: number;
}

export type GetOrderCustomerRequest = {
    id: number;
}

export type GetOrderWaterCompanyId = {
    WaterCompanyId: number
}

export type GetOrderCompanyId = {
    CompanyId: number
}

export type GetAllOrdersRequest = {
    id: number,
}

export type Order = {
    userFirstName: string;
    userLastName: string;
    userPatronymic: string;
    userPhone: string;

    id: number,
    comment?: string,
    wasteVolume: number,
    adress?: string,
    timeOfPublication: string,
    orderStatusId: number,
    userId: number,
    latitude?: number,
    longitude?: number
    arrivalStartDate?: string,
    arrivalEndDate?: string
    municipalityId: number,
    selfCreated?: boolean,

    sewerFirstName: string;
    sewerId: number;
    sewerLastName: string;
    sewerPatronymic: string;
}
