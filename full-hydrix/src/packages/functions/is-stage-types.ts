export function isStageSupplyTypes(type: string) {
    switch (type) {
        case "Поставочная":
        case "Supply":
            return true;
            break;

        default:
            return false;
            break;
    }
}