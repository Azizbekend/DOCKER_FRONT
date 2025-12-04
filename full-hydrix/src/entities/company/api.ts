import instance from "@/app/api/instances"
import { ClientCompanyRoutes } from "@/app/cores/core-gis/network/api-routes"

export const getAllClientCompanies = () => {
    return instance.get(ClientCompanyRoutes.GetAll)
}
