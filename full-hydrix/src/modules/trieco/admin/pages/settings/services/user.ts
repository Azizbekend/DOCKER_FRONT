import { UserRoutes } from "@/app/api/api-router";
import instance from "@/app/api/instances";
import { User } from "@/entities/user/type";

export const updateUser = (data: User) => {
    return instance.put(UserRoutes.Update, data, { params: { id: data.id } })
}



