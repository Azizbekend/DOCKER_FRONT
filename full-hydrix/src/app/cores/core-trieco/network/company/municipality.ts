import instance from "@/app/api/instances";
import { MunicipalityRoutes } from "@/app/api/instances-routes";

export type Municipality = {
    id: number,
    name: string
}

export const getAllMunicipalities = () => {
    return instance.get(MunicipalityRoutes.GetAll)
}
