export type ClientCompany = {
    waterCompanyName: string,
    companyName: string,
    contractId: number,
    municipalityName: string
}

export type GetClientCompanyByWaterCompanyRequest = {
    WaterCompanyId: number;
}
