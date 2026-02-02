import { StageAction } from "@/packages/shared-components/stage/stage-actions"

export function isDiscription(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.resend:
        case StageAction.cancel:
            return true

        default:
            return false
    }
}
export function getDiscriptionTitle(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.resend:
            return "Причина отправки"
        case StageAction.cancel:
            return "Причина отмена"
        default:
            return "Описание"
    }
}

export function isCompanyUsers(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.resend:
        case StageAction.attachExpenses:
        case StageAction.confirmNoPay:
        case StageAction.attachPay:
        case StageAction.confirm:
            return true
        default:
            return false
    }
}

export function isSupplierName(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.attachExpenses:
        case StageAction.confirmNoPay:
            return true
        default:
            return false
    }
}
export function getSupplierNameTitle(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.attachExpenses:
        case StageAction.confirmNoPay:
        default:
            return "Имя поставщика"
    }
}

export function isCount(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.attachExpenses:
        case StageAction.confirmNoPay:
            return true
        default:
            return false
    }
}

export function isExpenseNumber(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.attachExpenses:
            return true
        default:
            return false
    }
}

export function isExpense(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.attachExpenses:
            return true
        default:
            return false
    }
}



