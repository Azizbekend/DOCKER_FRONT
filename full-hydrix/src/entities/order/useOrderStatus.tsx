import { OrderStatus } from "./order-status";

const useOrderStatus = () => {
    const StatusText = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.New: return "Новый"
            case OrderStatus.Transporting: return "В пути"
            case OrderStatus.Utilization: return "В утилизации"
            case OrderStatus.Done: return "Выполнено"
            case OrderStatus.Cancelled: return "Отклонено"
            case OrderStatus.Accepted: return "Принято"
            default: return "not found";
        }
    };

    const StatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.New: return "#F2B744"
            case OrderStatus.Transporting: return "#6BC028"
            case OrderStatus.Utilization: return "#FF5981"
            case OrderStatus.Done: return "#F27953"
            case OrderStatus.Cancelled: return "#4A66C9"
            case OrderStatus.Accepted: return "#1FC7C7"
            default: return "white";
        }
    };

    return { StatusText, StatusColor }
}

export default useOrderStatus;