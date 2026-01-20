import { PassportObject } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"

export const passportObject = () => {
    return reserchInstance.get(PassportObject.all)
}