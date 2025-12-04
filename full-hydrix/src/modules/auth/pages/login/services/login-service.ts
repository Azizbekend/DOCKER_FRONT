import { UserRoutes } from "@/app/api/api-router";
import instance from "@/app/api/instances";

export const authAdmin = (params: AuthEntity) => {
    return instance.get(UserRoutes.Authorization, { params })
}

export type AuthEntity = {
    username: string;
    password: string;
}


export type AuthResponse = {
    id: number;
}
