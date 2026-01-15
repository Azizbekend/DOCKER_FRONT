import { formatToTwoDecimalsSafe } from "@/shared/libs/hardware/formatToTwoDecimalsSafe"

export const getValue = (name: string, value: string) => {
    switch (name) {
        case "Режим управления":
            return (value == "0" || value == "False") ? "Ручной" : "Автоматический"
        case "Потеря связи с ПЧ":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Сработал автомат защиты двигателя":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Авария ПЧ":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Cостояние линии датчика":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Перегрев статора":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Предупреждение о перегреве насоса":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Сработал автомат защиты вентилятор":
            return (value == "0" || value == "False") ? "Норма" : "Авария"

        default:
            return formatToTwoDecimalsSafe(value)
    }
}