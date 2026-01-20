import { Incident } from "@/app/routers/api-router"
import { reserchInstance } from "@/app/api/instances"

export const getAllIncedent = () => {
    return reserchInstance.get(Incident.allIncedent)
}