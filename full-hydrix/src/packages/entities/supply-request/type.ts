export type SupplyRequestType = {
    creatorId: number,
    productName: string,
    requiredCount: number,
    hardwareId: number,
    objectId: number,
    serviceId: number

    creatiorCompanyId: number,
    nextImplementerId: number,
    nextImplementerCompanyId: number,
}

export type SupplyRequestStageType = {
    creatorId: number,
    creatiorCompanyId: number,
    nextImplementerId: number,
    nextImplementerCompanyId: number,
    productName: string,
    requiredCount: number,
    hardwareId: number,
    objectId: number,
    serviceId: number
}

export type SupplyRequestStageResendType = {
    resendDiscription: string,
    creatorId: number,
    creatiorCompanyId: number,
    nextImplementerId: number,
    nextImplementerCompanyId: number,
    hardwareId: number,
    objectId: number,
    serviceId: number
}

export type SupplyRequestStageAttachExpensesType = {
    supplierName: string,
    realCount: number,
    expenseNumber: string,
    expenses: number,
    stageId: number,
    nextImplementerId: number,
    nextImplementerCompanyId: number,
    requestId: number,
}

export type SupplyRequestStageConfirmNoPayType = {
    supplierName: string,
    realCount: number,
    stageId: number,
    nextImplementerId: number,
    nextImplementerCompanyId: number,
    requestId: number,
}

export type SupplyRequestStageAttachPayType = {
    stageId: number,
    nextImplementerId: number,
    nextImplementerCompanyId: number,
    requestId: number
}

export type SupplyRequestStageConfirmType = {
    stageId: number,
    nextImplementerId: number, // ЭТО ТЕКУШИЙ ПОЛЬЗОВАТЕЛЬ
    nextImplementerCompanyId: number, // ЭТО ТЕКУШИЙ ПОЛЬЗОВАТЕЛЬ
    requestId: number
}

export type SupplyRequestStageCompleteType = {
    implementerId: number,
    implementersCompanyId: number,
    supplyStageId: number
}

export type SupplyRequestStageCancelType = {
    cancelDiscription: string,
    supplyStageId: number
}