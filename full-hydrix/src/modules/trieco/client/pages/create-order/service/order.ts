import instance from "@/app/api/instances";
import { OrderRoutes } from "@/app/cores/core-trieco/network/api-routes";

export const createOrder = (data: CreateOrderEntity) => {
    return instance.post(OrderRoutes.Create, data);
}

export const createOrderByPoint = (data: CreateOrderEntity) => {
    return instance.post(OrderRoutes.CreateByPoint, data);
}

export type CreateOrderEntity = {
    comment?: string
    adress: string,
    wasteVolume?: number,
    sewerId?: number,
    municipalityName?: string,
    userId?: number,
    orderStatusId?: number,
    arrivalStartDate: string,
    arrivalEndDate: string,
    longitude?: number,
    latitude?: number,
    pointId?: number,
    name?: string,
    surname?: string,
    patronymic?: string,
    phoneNumber?: string,
    selfCreated?: boolean,
}

export type CreateOrderResponse = {

}