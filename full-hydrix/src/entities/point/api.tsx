import { PickupPointRoutes } from "@/app/api/api-router"
import instance from "@/app/api/instances"
import { GetAllPointRequest, Point, UpdatePointRequest } from "./type"

export const getAllPointsByUser = (params: GetAllPointRequest) => {
    return instance.get(PickupPointRoutes.GetByUser, { params })
}

export const createPoint = (data: Point) => {
    return instance.post(PickupPointRoutes.Create, data)
}

export const editPoint = (data: UpdatePointRequest) => {
    return instance.put(PickupPointRoutes.Update, data, { params: { "id": data.pointId } })
}