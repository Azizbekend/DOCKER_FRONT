import { StageAction } from "../shared-components/stage/stage-actions";

export function isDiscription(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.resend:
        case StageAction.cancel:
            return true

        default:
            return false
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