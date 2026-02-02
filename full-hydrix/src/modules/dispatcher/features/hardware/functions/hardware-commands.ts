import { StyleColor } from "@/packages/shared-ui/button/config";

export function isHardwareCommands(value: string) {
    return value == "Стоп" || value == "Пуск" || value == "Cброс аварии"
}


export function getColorCommandButton(value: string, active: boolean): StyleColor {
    switch (value) {
        case "Пуск":
            return active ? "green" : "grayOutline"
        case "Стоп":
            return active ? "red" : "grayOutline"
        case "Cброс аварии":
            return active ? "yellow" : "grayOutline"
        default:
            return "green"
    }
}