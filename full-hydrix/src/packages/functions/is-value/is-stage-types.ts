export function isStageSupplyTypes(type: string) {
    switch (type) {
        case "Поставочная":
        case "Поставочная заявка":
        case "Supply":
        case "InitialSupply":
            return true;
            break;

        default:
            return false;
            break;
    }
}

export function isStageAnswerTypes(type: string) {
    switch (type) {
        case "Общий":
        case "Общая":
            return true;
            break;

        default:
            return false;
            break;
    }
}

export function isStageIncidentTypes(type: string) {
    switch (type) {
        case "Incident":
            return true;
            break;

        default:
            return false;
            break;
    }
}

export function isStageTOTypes(type: string) {
    switch (type) {
        case "Тех. Обслуживание":
            return true;
            break;

        default:
            return false;
            break;
    }
}

export const isStageCancelled = (status: string) => status == 'Cancelled'
export const isTOStageClose = (status: string, stageType: string) => stageType == "Тех. Обслуживание" && status != 'New'
