import { NodeIndicates } from "@/app/api/api-router"
import { reserchInstance } from "@/app/api/instances"
import { getNodeInfoIncidentAll } from "@/entities/hardware/api-general"

export const getTechnicalCharsShapshi = () => {
    return reserchInstance.get(NodeIndicates.technicalChars)
}