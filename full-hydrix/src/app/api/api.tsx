// import instance from "@api/setting"

// export const getAllMunicipalities = () => {
//     return instance.get(MunicipalityRoutes.GetAll)
// }


// export const getFNSData = (params: GetFNSRequest) => {
//     return baseInstance.get("/fns/egr", {
//         params: {
//             key: import.meta.env.VITE_FNS_KEY,
//             req: params.INN
//         }
//     })
// }


// export const getPaymentDetails = (params: GetPaymentRequest) => {
//     return instance.get(PaymentRoutes.Get, { params })
// }

// export const createPayment = (data: PaymentRequest) => {
//     return instance.post(PaymentRoutes.Create, data)
// }

// export const updatePayment = (data: PaymentRequest) => {
//     return instance.put(PaymentRoutes.Update, data)
// }


// export const getAvgPriceStat = (params: GetCompanyStatRequest) => {
//     return instance.get(StatRoutes.GetAvgPrice, {params})
// }

// export const getTransportIncome = (params: GetCompanyStatRequest) => {
//     return instance.get(StatRoutes.GetTransportingIncome, {params})
// }

// export const getExported = (params: GetCompanyStatRequest) => {
//     return instance.get(StatRoutes.GetExported, {params})
// }