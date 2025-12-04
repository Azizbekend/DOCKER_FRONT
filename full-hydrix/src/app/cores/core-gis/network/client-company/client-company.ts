import instance from "../api";
import { ClientCompanyRoutes } from "../api-routes";

export type GetClientCompanyByWaterCompanyRequest = {
    WaterCompanyId: number;
}

export const getAllClientCompanies = () => {
    return instance.get(ClientCompanyRoutes.GetAll)
}

export type ClientCompany = {
    waterCompanyName: string,
    companyName: string,
    contractId: number,
    municipalityName: string
}