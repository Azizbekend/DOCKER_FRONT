

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
    fileId: number,
}


export interface PassportModelIndicatorType {
    key: string,
    name: string,
    projectValue: string,
    value: string,
    unit: string,
    plcNodes?: string[]

}



export interface userListType {
    id: number,
    name: string
}