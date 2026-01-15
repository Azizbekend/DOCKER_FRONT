import { formatToTwoDecimalsSafe } from "./formatToTwoDecimalsSafe"

export const getValue = (name: string, value: string) => {

    console.log(name)

    switch (name) {
        case "Режим управления":
            return (value == "0" || value == "False") ? "Ручной" : "Автоматический"
        case "Потеря связи с ПЧ":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Сработал автомат защиты двигателя":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Авария ПЧ":
            return (value == "0" || value == "False") ? "Норма" : "Авария"
        case "Общая авария":
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


export const getStatusClass = (status: string) => {
    switch (status) {
        case 'warning': return { badge: 'text-red-700 bg-red-100', border: '#f87171' };
        case 'success': return { badge: 'text-green-700 bg-green-100', border: '#4ade80' };
        case 'info': return { badge: 'text-blue-700 bg-blue-100', border: '#60a5fa' };
        default: return { badge: 'text-gray-700 bg-gray-100', border: '#9ca3af' };
    }
};



