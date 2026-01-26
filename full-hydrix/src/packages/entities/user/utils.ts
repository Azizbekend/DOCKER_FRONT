import { useAuth } from "./context";
import { Role } from "./enums";

export const getRoleText = (role: number) => {
    switch (role) {
        case Role.Client:
            return "Клиент";
        case Role.Sewer:
            return "Ассенизатор";
        case Role.TransporterCompany:
            return "Траспортная компания";
        case Role.Participant:
            return "Участник";


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

export function getDostup() {
    return JSON.parse(localStorage.getItem("userDostup"))
}

export function isAdmin() {
    const { user } = useAuth()
    return user.baseRoleId === Role.Admin
}
