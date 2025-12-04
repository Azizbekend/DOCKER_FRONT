import instance from "../api";
import { PaymentRoutes } from "../api-routes";

export const getPaymentDetails = (params: GetPaymentRequest) => {
    return instance.get(PaymentRoutes.Get, { params })
}

export const createPayment = (data: PaymentRequest) => {
    return instance.post(PaymentRoutes.Create, data)
}

export const updatePayment = (data: PaymentRequest) => {
    return instance.put(PaymentRoutes.Update, data)
}

export type GetPaymentRequest = {
    CompanyId: number;
}

export type PaymentRequest = {
    id: number,
    isApproved: boolean;
    companyId: number,
    paymentAccount: string,
    bik: string,
    kpp: string,
    bankName: string,
    corresAccount: string;
}
