import { Characteristics, Command, Control, ControlBlock, Documents, NodeIndicates, PassportObject, Schema, SchemaCooradinate, Service } from "@/app/routers/api-router"

import { reserchInstance } from "@/app/api/instances"

import { CharacteristicsCreateInterface, CharacteristicsCreateManyInterface, ObjectInfoInterface, SchemaCoordinatesCreateType, SchemaCreateType } from "./type-general"
import { ControlTypeCreate, ControlTypeCreateMany } from "@/modules/dispatcher/pages/hardware-form/components/control/type"

export const NodeInfoSingle = (params: { id: number }) => {
    return reserchInstance.get(Control.single, { params })
}

export const createServiceApi = (params: { Title: string, HardwareId: number, Discription: string, Period: number }) => {
    return reserchInstance.post(Service.create, params)
}

export const getServiceApi = (params: { id: number }) => {
    return reserchInstance.get(Service.next_week, { params })
}

export const getServiceHistoryRecordsAllApi = (params: { id: number }) => {
    return reserchInstance.get(Service.historyRecordsAll, { params })
}
export const getServiceHistoryRecordsAllOrderedApi = (params: { id: number }) => {
    return reserchInstance.get(Service.historyRecordsAllOrdered, { params })
}

export const getTodayServiceApi = (params: { id: number }) => {
    return reserchInstance.get(Service.today, { params })
}

export const getHistoryRecordsServiceApi = (params: { id: number }) => {
    return reserchInstance.get(Service.historyRecords, { params })
}

export const checkedServiceApi = (params: { id: number | string }) => {
    return reserchInstance.put(Service.completeRequest, params)
}

// Характеристика
export const createCharacteristic = (params: CharacteristicsCreateInterface) => {
    return reserchInstance.post(Characteristics.createOnde, params)
}
export const manyCharacteristic = (params: CharacteristicsCreateManyInterface) => {
    return reserchInstance.post(Characteristics.createMany, params)
}
export const getCharacteristicAll = (params: { id: number }) => {
    return reserchInstance.get(Characteristics.all, { params })
}



export const deleteCharacteristiс = (params: { id: number }) => {
    return reserchInstance.delete(Characteristics.delete, { params })
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
export const getCommandAllInfo = (params: { id: number }) => {
    return reserchInstance.get(Control.allInfo, { params })
}

//! В методе написано info/delete,а есть command/delete ????
export const deleteCommandApi = (params: { id: number }) => {
    return reserchInstance.delete(Control.delete, { params })
}





// Схема
export const schemaCreate = (params: SchemaCreateType) => {
    return reserchInstance.post(Schema.create, params)
}

export const schemaAll = (params: { id: number }) => {
    return reserchInstance.get(Schema.all, { params })
}

export const getSchemaObjects = (params: { id: number }) => {
    return reserchInstance.get(Schema.getCoordinates, { params })
}

export const schemaCoordinatesCreate = (params: SchemaCoordinatesCreateType) => {
    return reserchInstance.post(Schema.CoordinatesCreate, params)
}

export const updateSchemaCoordinatesCreate = (params: SchemaCoordinatesCreateType) => {
    return reserchInstance.put(SchemaCooradinate.update, params)
}

export const deleteSchemaCoordinates = (params: { id: number }) => {
    return reserchInstance.delete(SchemaCooradinate.delete, { params })
}

export const passportObject = (params: ObjectInfoInterface) => {
    return reserchInstance.post(PassportObject.create, params)
}

export const passportObjectAll = () => {
    return reserchInstance.get(PassportObject.all)
}

export const controlBlockCreate = (params: { name: string, plcIpAdress: string, staticObjectInfoId: number, }) => {
    return reserchInstance.post(ControlBlock.create, params)
}




export const getCommandCheck = (params: { hardwareId: number }) => {
    return reserchInstance.get(Command.check, { params })
}

export const getCommandActive = (params: { hardwareId: number }) => {
    return reserchInstance.get(Command.active, { params })
}

export const getCommandDeactive = (params: { hardwareId: number }) => {
    return reserchInstance.get(Command.deactive, { params })
}

export const commandSend = (params: { nodeId: number, value: string }) => {
    return reserchInstance.post(Command.send, params)
}


export const getInfoNodeInfos = (params: any) => {
    return reserchInstance.post(NodeIndicates.group, params)
}

export const getInfoNodeInfoOne = (params: { id: string }) => {
    return reserchInstance.get(NodeIndicates.plcNodeOd, { params })
}

export const getHStatusAll = (params: { hStatusNode: string }) => {
    return reserchInstance.get(NodeIndicates.hStatusAll, { params })
}

export const getInfoNodeInfoAllCheck = (params: { id: number }) => {
    return reserchInstance.get("/NodeInfo/nodes/incident/all_check", { params })
}

export const getNodeInfoIncidentTotal = (params: { id: number }) => {
    return reserchInstance.get("/NodeInfo/nodes/incident/total", { params })
}
export const getNodeInfoIncidentAll = (params: { id: number }) => {
    return reserchInstance.get("/NodeInfo/nodes/incident/all", { params })
}