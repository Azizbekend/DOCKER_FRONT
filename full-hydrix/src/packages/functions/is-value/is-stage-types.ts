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

