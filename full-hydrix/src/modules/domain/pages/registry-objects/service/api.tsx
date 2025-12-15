import { PassportObject } from "@/app/api/api-router"
import { reserchInstance } from "@/app/api/instances"

export const passportObject = () => {
    return reserchInstance.get(PassportObject.all)
}