export enum OrderStatus {
    New = 1,
    Transporting = 2,
    Utilization = 3,
    Done = 4,
    Cancelled = 5,
    Accepted = 6,
    
}

export const OrderStatusText = {
    1: "Новый",
    2: "В пути",
    3: "В утилизации", 
    4: "Выполнено",
    5: "Отклонено",
    6: "Принято"
}

export const StatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.New:
            return "#4A66C9"
        case OrderStatus.Done:
            return "#6BC028"
        case OrderStatus.Cancelled:
            return "#FF5981"
        case OrderStatus.Accepted: 
            return "#F27953"
        case OrderStatus.Transporting: 
            return "#F27953"
        case OrderStatus.Utilization: 
            return "#4A66C9"
        default:
            return "white"
    }

}