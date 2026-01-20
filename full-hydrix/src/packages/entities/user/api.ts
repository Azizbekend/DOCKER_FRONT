import { authorizationInstance } from "@/app/api/instances/instance-authorization"
import { UserRoutes } from "@/app/routers/api-router"

export const getUserById = (params: { id: number }) => {
    return authorizationInstance.get(UserRoutes.getById, { params })
}

export const getUserByCompany = (params: { id: number }) => {
    return authorizationInstance.get(UserRoutes.getCompany, { params })
}