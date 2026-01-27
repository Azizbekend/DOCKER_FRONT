export type CreateParticipantType = {
    login: string,
    password: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    email: string,
    phoneNumber: string,
    adress: string,
    isEmailApproved: boolean,
    baseRoleId: number
    docs: File | null
}


export type UserAttachCompanyType = {
    userId: number,
    companyId: number
}


export type AttachCompanyType = {
    objectId: number,
    companyId: number,
    companyName: string,
    companyRole: string
}



export interface ReagentStat {
    id: number;
    name: string;
    area: string;
    projectConsumption: string;
    actualConsumption: string;
    unit: string;
    economy: string;
}

