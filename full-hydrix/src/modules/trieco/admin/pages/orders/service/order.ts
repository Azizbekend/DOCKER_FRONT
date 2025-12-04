import { OrderRoutes, UserRoutes } from "@/app/api/api-router";
import instance from "@/app/api/instances";
import { MunicipalityRoutes } from "@/app/cores/core-gis/network/api-routes";

export const getAllOrders = () => {
  return instance.get(OrderRoutes.GetAll);
};

export const getOrdersByIdTransporterCompany = (params: GetOrderTransporterCompanyId) => {
  return instance.get(OrderRoutes.GetByIdTransporterCompany, { params })
}


export const getCompanyRequest = () => {
  // return instance.get(OrderRoutes.GetBy)
};

export const getOrderCustomer = (params: GetOrderCustomerRequest) => {
  return instance.get(UserRoutes.GetById, { params });
};

export const attachSewer = (data: AttachSewerRequest) => {
  return instance.put(OrderRoutes.AttachSewer, data, {
    params: { OrderId: data.orderId },
  });
};

export const getAllMunicipalities = () => {
  return instance.get(MunicipalityRoutes.GetAll);
};

export const createOrder = (data: Order) => {
  return instance.post(OrderRoutes.Create, data);
};

export type AttachSewerRequest = {
  orderId: number;
  sewerId: number;
};

export type GetOrderCustomerRequest = {
  id: number;
};

export type GetCompanyOrdersRequest = {
  id: number;
};

export type GetOrderTransporterCompanyId = {
  CompanyId: number
}

export type Order = {
  userFirstName: string;
  userLastName: string;
  userPatronymic: string;
  userPhone: string;

  id: number;
  comment?: string;
  wasteVolume: number;
  adress?: string;
  timeOfPublication: string;
  orderStatusId: number;
  userId: number;
  latitude?: number;
  longitude?: number;
  arrivalStartDate?: string;
  arrivalEndDate?: string;
  municipalityId: number;
  selfCreated?: boolean,

  sewerFirstName: string;
  sewerId: number;
  sewerLastName: string;
  sewerPatronymic: string;
};


export interface Municipality {
  id: number;
  name: string;
}
