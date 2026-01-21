export type DespetcherTest = {
    img?: string | number,
    nameMinin?: string,
    company?: string,
    statusСonnection?: boolean,
    volumeProjec?: number,
    dayEfficiency?: string,
    hourEfficiency?: string,
    dispetcher?: boolean,
    adress?: string,
    id?: number,
    operatingOrganization?: string,
    customerName?: string,
    generalContractorName?: string,
    projectEfficiency?: number
    photoName?: string
}

export type ObjectCreateType = {
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