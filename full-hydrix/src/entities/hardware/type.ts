export interface EquipmentCreateInterface {
    id?: number,
    name: string,
    img: string,
    category: string,
    model: string,
    supplier: string,
    manufacturer: string,
    position: string,
}

export interface CreateHardwareInterface {
    name: string,
    category: string,
    developerName: string,
    supplierName: string,
    photoName: string,
    position: string,
    opcDescription: string,
    model: string,
    controlBlockId: number,
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
    isActive?: boolean,
    controlBlock: ControlBlockInterface
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
}










