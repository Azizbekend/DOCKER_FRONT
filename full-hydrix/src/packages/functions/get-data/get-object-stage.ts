import { ObjectStages } from "@/packages/entities/object/config";

export function getObjectStageColor(value: ObjectStages) {
    switch (value) {
        case ObjectStages.Construction:
            return "bg-gray-500"
        case ObjectStages.Exploitation:
            return "bg-green-500"
        case ObjectStages.Designing:
            return "bg-orange-500"
        case ObjectStages.Null:
            return "bg-orange-500"
    }
}