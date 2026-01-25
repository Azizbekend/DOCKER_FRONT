export enum StageAction {
    confirmNoPay = "1",
    attachExpenses = "2",
    attachPay = "3",
    confirm = "4",
    complete = "5",
    resend = "6",
    cancel = "7",
}

export const stageActions = [
    {
        value: StageAction.confirmNoPay, // /SupplyRequest/supplier/warehouse/confirm/noPay
        title: "Подтвердить наличие",
    },
    {
        value: StageAction.attachExpenses, // /SupplyRequest/supplier/attachExpenses
        title: "Создать закупку",
    },
    {
        value: StageAction.attachPay, // /SupplyRequest/buhgalteriya/attachPay
        title: "Подтвердить оплату",
    },
    { 
        value: StageAction.confirm, // /SupplyRequest/supplier/warehouse/confirm
        title: "Принять закупку",
    },
    {
        value: StageAction.complete, // /SupplyRequest/mainEngineer/supplyStage/complete
        title: "Завершить поставку",
    },
    {
        value: StageAction.resend, // /SupplyRequest/mainEngineer/supplyRequest/stage/resend
        title: "Переслать заявку",
    },
    {
        value: StageAction.cancel, // /SupplyRequest/mainEngineer/supplyStage/Cancel        
        title: "Отменить этап",
    },
]

