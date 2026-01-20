export type ClientCompany = {
    waterCompanyName: string,
    companyName: string,
    contractId: number,
    municipalityName: string
}

export type GetClientCompanyByWaterCompanyRequest = {
    WaterCompanyId: number;
}



export type CompanyCreate = {
    companyName: string,
    shortName: string,
    kpp: string,
    juridicalAddress: string,
    directorName: string,
    phoneNumber: string,
    ogrn: string,
    inn: string,
    factAdress: string
}

export type CompanyType = {
    id: number,
    companyName: string,
    shortName: string,
    kpp: number,
    juridicalAddress: string,
    directorName: string,
    phoneNumber: number,
    ogrn: number,
    inn: number,
    factAdress: string
}



