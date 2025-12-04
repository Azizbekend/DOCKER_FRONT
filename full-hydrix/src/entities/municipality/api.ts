import instance from "@/app/api/instances"
import { MunicipalityRoutes } from "@/app/cores/core-gis/network/api-routes"

export const getAllMunicipalities = () => {
    return instance.get(MunicipalityRoutes.GetAll)
}