import { NodeIndicates } from "@/app/routers/api-router";
import { reserchInstance } from "@/app/api/instances";

export const getTechnicalCharsShapshi = () => {
    return reserchInstance.get(NodeIndicates.technicalChars)
}