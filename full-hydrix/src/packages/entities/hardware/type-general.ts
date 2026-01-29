export interface HardwareCreateInterface {
    id?: number,
    fileId: string,
    name: string,
    category: string,
    model: string,
    developerName: string,
    position: string,
    opcDescription?: string,
    controlBlockId?: number,
    supplierName: string,
}
export interface SchemaModelInterface {
    top: string,
    left: string,
    hieght: string,
    width: string,
    hardwareSchemaId: number,
}

export interface CharacteristicsCreateManyInterface {
    hardwareId: number,
    characteristics: CharacteristicsCreateInterface[]
}

export interface CharacteristicsCreateInterface {
    hardwareId: number,
    name: string,
    value: string
}




export interface ControlBlockInterface {
    id: number,
    name: string,
    plcIpAdress: string,
}



export interface SchemaCreateType {
    name: string,
    schemaImage: string,
    staticObjectInfoId: number
    fileId: number | null,
}

export interface SchemaObjectType {
    id: number,
    top: string,
    left: string,
    height: string,
    width: string,
    hardwareSchemaId: number,
    hardwareSchema: any,
    fileId: number,
    redFileId?: number,
    greenFileId?: number,
    focusFileId?: number,
    file: any,
    hardwareId: number,
    status?: boolean,
    serviceStatus?: boolean,
}

export interface SchemaCoordinatesCreateType {
    id?: number,
    top: string,
    left: string,
    height: string,
    width: string,
    hardwareSchemaId?: number,
    newSchemeId?: number,
    fileId?: number,
    redFileId?: number,
    greenFileId?: number,
    hardwareId?: number,
}



export interface ObjectInfoInterface {
    name?: string,
    adress?: string,
    operatingOrganization?: string,
    customerName?: string,
    generalContractorName?: string,
    projectEfficiency?: number,
    latitude?: string,
    longitude?: string,
    photoName?: string,
    fileId?: number,
}