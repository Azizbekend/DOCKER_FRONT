import { SupplyRequest } from "@/app/routers/api-router"
import { SupplyRequestStageAttachExpensesType, SupplyRequestStageAttachPayType, SupplyRequestStageCancelType, SupplyRequestStageCompleteType, SupplyRequestStageConfirmNoPayType, SupplyRequestStageConfirmType, SupplyRequestStageResendType, SupplyRequestStageType, SupplyRequestType } from "./type"
import { reserchInstance } from "@/app/api/instances"



export const supplyRequestCreate = (params: SupplyRequestType) => {
    return reserchInstance.post(SupplyRequest.create, params)
}

export const supplyRequestCreateStage = (params: SupplyRequestType) => {
    return reserchInstance.post(SupplyRequest.createStage, params)
}



export const supplyRequestStage = (params: SupplyRequestStageType) => {
    return reserchInstance.post(SupplyRequest.createStage, params)
}

export const supplyRequestStageResend = (params: SupplyRequestStageResendType) => {
    return reserchInstance.post(SupplyRequest.resend, params)
}
export const supplyRequestStageAttachExpenses = (params: SupplyRequestStageAttachExpensesType) => {
    return reserchInstance.post(SupplyRequest.attachExpenses, params)
}
export const supplyRequestStageConfirmNoPay = (params: SupplyRequestStageConfirmNoPayType) => {
    return reserchInstance.post(SupplyRequest.confirmNoPay, params)
}
export const supplyRequestStageAttachPay = (params: SupplyRequestStageAttachPayType) => {
    return reserchInstance.post(SupplyRequest.attachPay, params)
}
export const supplyRequestStageConfirm = (params: SupplyRequestStageConfirmType) => {
    return reserchInstance.post(SupplyRequest.confirm, params)
}
export const supplyRequestStageComplete = (params: SupplyRequestStageCompleteType) => {
    return reserchInstance.post(SupplyRequest.complete, params)
}
export const supplyRequestStageCancel = (params: SupplyRequestStageCancelType) => {
    return reserchInstance.post(SupplyRequest.cancel, params)
}


export const supplyRequestStageDelete = (params: { id: number }) => {
    return reserchInstance.delete(SupplyRequest.delete, { params })
}