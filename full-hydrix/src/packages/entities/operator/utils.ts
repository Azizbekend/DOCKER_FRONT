import { OperatorRole } from "./type"

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