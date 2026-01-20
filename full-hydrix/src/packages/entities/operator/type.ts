
export type Operator = {
    userId?: number,
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    login: string;
    roleName?: string | OperatorRole;
    isRevoked?: boolean;
    waterCompanyId?: number;
    plantId?: number;
    workplace?: string;
}

export enum OperatorRole {
    WaterCompany = "WaterCompanyOperator",
    Plant = "TreatmentPlantOperator",
    WaterCompanyAdmin = "WaterCompanyAdmin",
}