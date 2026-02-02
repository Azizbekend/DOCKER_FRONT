import { StageAction } from "../../shared-components/stage/stage-actions";

export function getAnswerActions(typeAction: StageAction | null) {
    switch (typeAction) {
        case StageAction.confirmNoPay:
            return "Наличие подтверждено"
        case StageAction.attachExpenses:
            return "Закупка создага"
        case StageAction.attachPay:
            return "Оплата подтверждина"
        case StageAction.confirm:
            return "Закупка принята"
        case StageAction.complete:
            return "Поставка завершина"
        case StageAction.resend:
            return "Заявку отправлена"
        case StageAction.cancel:
            return "Этап отменён"
        default:
            return "Действие выполнено"
    }
}