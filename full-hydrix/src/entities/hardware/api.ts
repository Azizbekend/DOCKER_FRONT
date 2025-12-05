import { Characteristics, Control, Hardware, Schema, Service } from "@/app/api/api-router"
import instance, { reserchInstance } from "@/app/api/instances"
import { CharacteristicsCreateManyInterface, CreateHardwareInterface, SchemaCreateType } from "./type"
import { ControlType, ControlTypeCreate, ControlTypeCreateMany } from "@/modules/dispatcher/pages/equipment-create/components/control/type"


export const getAllHardware = () => {
    return reserchInstance.get(Hardware.all)
}

export const getInfoHardware = (params: { id: number }) => {
    return reserchInstance.get(Hardware.one, { params })
}

export const createHardware = (params: CreateHardwareInterface) => {
    return reserchInstance.post(Hardware.create, params)
}

export const activeHardware = (params: { id: number }) => {
    // return reserchInstance.put(Service.completeRequest, params)
    return reserchInstance.post(Hardware.active, params)
}

export const createServiceApi = (params: { HardwareId: number, Discription: string, Period: number }) => {
    return reserchInstance.post(Service.create, params)
}

export const getServiceApi = (params: { id: number }) => {
    return reserchInstance.get(Service.next_week, { params })
}

export const checkedServiceApi = (params: { id: number }) => {
    return reserchInstance.put(Service.completeRequest, params)
}

// Характеристика
export const createCharacteristic = () => {
    return reserchInstance.post(Characteristics.createOnde)
}
export const manyCharacteristic = (params: CharacteristicsCreateManyInterface) => {
    return reserchInstance.post(Characteristics.createMany, params)
}
export const getCharacteristicAll = (params: { id: number }) => {
    return reserchInstance.get(Characteristics.all, { params })
}

export const manyServiceCreate = (params: CharacteristicsCreateManyInterface) => {
    return reserchInstance.post(Characteristics.createMany, params)
}


// Управление
export const createManyInfo = (params: ControlTypeCreateMany) => {
    return reserchInstance.post(Control.createManyInfo, params);
}
export const createOndeInfo = (params: ControlTypeCreate) => {
    return reserchInstance.post(Control.createOndeInfo, params);
}
export const createManyCommand = (params: ControlTypeCreateMany) => {
    return reserchInstance.post(Control.createManyCommand, params);
}
export const createOndeCommand = (params: ControlTypeCreate) => {
    return reserchInstance.post(Control.createOndeCommand, params);
}

export const getCommandAll = (params: { id: number }) => {
    return reserchInstance.get(Control.all, { params })
}





// Схема
export const schemaCreate = (params: SchemaCreateType) => {
    return reserchInstance.post(Schema.CoordinatesCreate, params)
}