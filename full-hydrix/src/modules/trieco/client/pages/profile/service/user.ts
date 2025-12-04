import { UserRoutes } from "@/app/api/api-router"
import instance from "@/app/api/instances"

export const updateUserService = (data: UpdateUserEntity) => {
    return instance.put(UserRoutes.Update, data, { params: { id: data.id } })
}

export type UpdateUserEntity = {
    id?: number,
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    email?: string,
    phoneNumber?: string,
    adress?: string
}