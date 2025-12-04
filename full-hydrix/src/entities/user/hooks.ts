import { Role } from "./role";

export const getRoleText = (role: number) => {
    switch (role) {
        case Role.Client:
            return "Клиент";
        case Role.Sewer:
            return "Сточная труба";
        case Role.CompanyOperator:
            return "Перевозчик за триеко";
        case Role.WaterCompany:
            return "Водоканал";
        case Role.CompanytClient:
            return "Предприятие";
        case Role.Ministry:
            return "Министр";
        case Role.WaterCompanyOperator:
            return "Оператор водоканала";
        case Role.WaterCompany:
            return "Оператор очистного сооружения";
        case Role.WaterCompanyAdmin:
            return "Оператор очистного сооружения";
        case Role.TreatmentPlantOperator:
            return "Оператор очистного сооружения";
        case Role.Admin:
            return "Админ";
        case Role.Plant:
            return "Оператор ОС";
    }
}


export enum OperatorRole {
    WaterCompany = "WaterCompanyOperator",
    Plant = "TreatmentPlantOperator",
    WaterCompanyAdmin = "WaterCompanyAdmin",
}

export const operatorRole = (roleName: OperatorRole) => {
    switch (roleName) {
        case OperatorRole.Plant:
            return "Оператор ОС"
        case OperatorRole.WaterCompany:
            return "Оператор Водоканала"
        case OperatorRole.WaterCompanyAdmin:
            return "Представитель Водоканала"
        default:
            return ""
    }
}