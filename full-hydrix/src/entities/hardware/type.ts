export interface EquipmentCreateInterface {
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

export interface CreateHardwareInterface {
    id?: number,
    name: string,
    category: string,
    developerName: string,
    supplierName: string,
    photoName?: string,
    fileId: string,
    position: string,
    opcDescription?: string,
    model: string,
    controlBlockId?: number,
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

export interface HardwareInterface {
    id: number,
    name: string,
    category: string,
    controlBlockId: number,
    developerName: string,
    opcDescription: string,
    photoName: string,
    position: string,
    supplierName: string,
    activatedAt?: string,
    model: string,
    createdAt?: string,
    fileId?: number,
    fileModel?: string,
}


export interface ControlBlockInterface {
    id: number,
    name: string,
    plcIpAdress: string,
}


export interface ModelHardwareOneInterface {
    id: number,
    name: string,
    model?: string,
    category?: string,
    developerName: string,
    supplierName: string,
    photoName: string,
    position: string,
    opcDescription?: string,
    controlBlockId: number
    fileId?: number
}

export interface SchemaCreateType {
    name: string,
    schemaImage: string,
    staticObjectInfoId: number
    fileId: number,
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
    file: any,
    hardwareId: number
}

export interface SchemaCoordinatesCreateType {
    id?: number,
    top: string,
    left: string,
    height: string,
    width: string,
    hardwareSchemaId?: number,
    fileId?: number,
    hardwareId?: number,
}