export function getIncidentColor(status: string) {
    switch (status) {
        case "New":
            return "bg-red-100 text-red-800 border border-red-200";
        case "В работе":
        case "В Работе":
        case "Completed":
            return "bg-blue-100 text-blue-800 border border-blue-200";
        case "Cancele":
        case "Canceled":
        case "canceled":
        case "Завершён":
            return "bg-green-100 text-green-800 border border-green-200";
    }
}

export function getIncidentText(status: string) {
    switch (status) {
        case "New":
            return "Новый";
        case "В работе":
        case "В Работе":
        case "Completed":
            return "В работе";
        case "Cancele":
        case "Canceled":
        case "canceled":
        case "Завершён":
            return "Завершён";
    }
}