import { OrderRoutes } from "@/app/api/api-router"
import instance from "@/app/api/instances"
import { OrderStatus } from "@/entities/order/order-status"

export const getAllOrders = (params: GetAllOrdersRequest) => {
    return instance.get(OrderRoutes.GetByUserId, { params: params })
}

export const getOrderCode = (params: GetOrderCodeRequest) => {
    return instance.get(OrderRoutes.GetCode, { params: params })
}

export const getOrder = (params: GetOrderRequest) => {
    return instance.get(OrderRoutes.GetById, { params })
}

export const changeStatus = (data: ChangeOrderRequest) => {
    return instance.put(OrderRoutes.ChangeStatus, data, { params: { OrderId: data.OrderId } })
}

export type ChangeOrderRequest = {
    OrderId: number,
    OrderStatusId: number,
}

export type GetOrderRequest = {
    Id: number;
}

export type GetOrderCodeRequest = {
    OrderId: number
}

export type GetAllOrdersRequest = {
    id: number,
}

export type Order = {
    id: number,
    comment?: string,
    wasteVolume: number,
    adress?: string,
    timeOfPublication: string,
    orderStatusId: number | OrderStatus,
    userId: number,
    latitude?: number,
    longitude?: number
    arrivalStartDate?: string,
    arrivalEndDate?: string,
    userLastName?: string,
    userFirstName?: string,
    userPatronymic?: string,
    userPhone?: string,
    code?: string,
    selfCreated?: boolean
}