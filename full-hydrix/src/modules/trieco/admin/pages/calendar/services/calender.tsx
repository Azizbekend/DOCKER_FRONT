import { OrderRoutes } from "@/app/api/api-router"
import instance from "@/app/api/instances"

export const getOrdersByIdTransporterCompany = (params: GetOrderTransporterCompanyId) => {
    return instance.get(OrderRoutes.GetByIdTransporterCompany, { params })
}

export type GetOrderTransporterCompanyId = {
    CompanyId: number
}

export type NowDate = {
    year: number,
    month: number,
    day: number,
}

export type CalenderProps = {
    month: MonthProps
}

export type MonthProps = {
    num: number,
    days: DayProps[]
}

export type DayProps = {
    num: number,
    class: string,
    countDounOrders?: number,
    orders?: Order[],
}

export type Order = {
    userFirstName: string;
    userLastName: string;
    userPatronymic: string;
    userPhone: string;

    id: number,
    comment?: string,
    wasteVolume: number,
    adress?: string,
    timeOfPublication: string,
    orderStatusId?: number,
    userId: number,
    latitude?: number,
    longitude?: number
    arrivalStartDate: string,
    arrivalEndDate: string
    municipalityId: number,

    sewerFirstName: string;
    sewerId: number;
    sewerLastName: string;
    sewerPatronymic: string;
}