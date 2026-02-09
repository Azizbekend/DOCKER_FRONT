import { ObjectStages } from "./config"

export interface PassportModelType {
    id?: number,
    name: string,
    latitude: string,
    longitude: string,
    adress: string,
    operatingOrganization: string,
    customerName: string,
    generalContractorName: string,
    projectEfficiency: number,
    fileId: number,
}



export interface PassportPlcDataType {
    plcId: number,
    plcName: string,
    plcIpAdress: string,
    status: boolean,
}

export interface PassportDataType extends PassportModelType {
    objectDiscription: string,
    objectDiscriptionFileId: number,
    hourEfficiency: number,
    powerConsump: number,
    waterConsump: number,
    wetExcessSludge: number,
    dryExcessSludge: number,
    trash: number,
    peskoPulpa: number,
    ufoAcid: number,
    mbrAcid: number,
    gypochloride: number
    aquaPack30: number,
    aquaFlock650: number,
    stage: ObjectStages,
    commissioningDate: Date | null,
}


export interface PassportRegistryDataType extends PassportDataType {
    plcList: PassportPlcDataType[]
}


export interface PassportModelIndicatorType {
    key: string,
    name: string,
    projectValue: string | number,
    value: string,
    unit: string,
    plcNodes?: string[]
}

export interface PassportStatisticType {
    name: string,
    area?: string,
    projectConsumption: number,
    unit: string,
}


export interface PassportStatisticReagentListType {
    aquaPack30: PassportStatisticType,
    aquaFlock650: PassportStatisticType,
    ufoAcid: PassportStatisticType,
    mbrAcid: PassportStatisticType,
    gypochloride: PassportStatisticType,
}

export interface PassportStatisticSedimentListType {
    wetExcessSludge: PassportStatisticType,
    dryExcessSludge: PassportStatisticType,
    trash: PassportStatisticType,
    peskoPulpa: PassportStatisticType,
}

export interface TechnicalSpecificationsType extends PassportStatisticType {
    plcNodes?: string[],
    value?: number,
}

export interface PassportTechnicalSpecificationsType {
    hourEfficiency: TechnicalSpecificationsType,
    electroConsumption: TechnicalSpecificationsType,
    projectEfficiency: TechnicalSpecificationsType,
    waterConsumption: TechnicalSpecificationsType,
}




export interface userListType {
    id: number,
    name: string
}