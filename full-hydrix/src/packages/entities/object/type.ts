

export interface PassportModelType {
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    adress: string,
    operatingOrganization: string,
    customerName: string,
    generalContractorName: string,
    projectEfficiency: number,
    fileId: number
}


export interface PassportModelIndicatorType {
    designPerformance: {
        name: string,
        value: string,
    }
    hourEfficiency: {
        name: string,
        value: string,
    }
    dayEfficiency: {
        name: string,
        value: string,
    }
    electroConsumption: {
        name: string,
        value: string,
    }
    waterConsumption: {
        name: string,
        value: string,
    }
}



export interface userListType {
    id: number,
    name: string
}