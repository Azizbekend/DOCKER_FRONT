import { NodeIndicates } from "@/app/api/api-router";
import { reserchInstance } from "@/app/api/instances";

export const getTechnicalCharsShapshi = () => {
    return reserchInstance.get(NodeIndicates.technicalChars)
}