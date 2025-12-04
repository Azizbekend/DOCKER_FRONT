export enum OrderStatus {
  New = 1,
  Transporting = 2,
  Utilization = 3,
  Done = 4,
  Cancelled = 5,
  Accepted = 6,
}

export const OrderStatusText: { [key: number]: string } = {
  1: "Новый",
  2: "В пути",
  3: "В утилизации",
  4: "Выполнено",
  5: "Отклонено",
  6: "Принято",
};

export const StatusColor = (status: OrderStatus) => {
  const statusColors: Record<OrderStatus, string> = {
    [OrderStatus.New]: "#F2B744",
    [OrderStatus.Done]: "#6BC028",
    [OrderStatus.Cancelled]: "#FF5981",
    [OrderStatus.Accepted]: "#F27953",
    [OrderStatus.Transporting]: "#4A66C9",
    [OrderStatus.Utilization]: "#1FC7C7",
  };

  return statusColors[status] || "white";
};
