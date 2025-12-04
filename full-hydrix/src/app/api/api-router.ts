// export const UserRoutes = {
//     GetById: '/Users/GetUserById',
//     GetAllUsers: "/Users/GetAllUsers",
//     EnterCode: '/Users/UserEnterCode',
//     IdentifyByPhone: '/Users/UserIdentification',
//     RefreshToken: '/Users/RefreshAuthorization',
//     Authorization: '/Users/Authorization',
//     Create: "/Users/CreateUser",
//     Update: "/Users/UpdateUser",
//     Delete: "/Users",
//     EmailConfirm: "/Users/email/send",
//     PasswordRecovery: "/Users/password/recovery",
//     Approve: "/Users/email/approve",
//     AuthorizationByPhone: "/Users/login/phone",
// }

// export const SewersRoutes = {
//     Create: "/Sewers/CreateSewer",
//     GetByCompanyId: "/Sewers/GetSewerByCompanyId",
//     GetByUserId: "/Sewers/GeSeverByUserId",
//     GetAll: "Sewers/all",
//     DeleteSewer: "Sewers",
// };

// export const OrderRoutes = {
//     GetAll: "/Order/all",
//     Create: "/Order/CreateOrder",
//     CreateByPoint: "/Order/СreateOrderByPoint",
//     GetByUserId: "/Order/OrdersByUserId",
//     GetById: "/Order/OrdersById",
//     GetByIdTransporterCompany: "/Order/transporter/orders",
//     AttachSewer: "/Order/AttachSewer",
//     AttachCompany: "/Order/AttachCompany",
//     ChangeStatus: "/Order/ChangeOrderStatus",
//     GetByStatusId: "/Order/GetOrdersByStatusId",
//     GetCode: "/Order/confirm",
// };

// export const MunicipalityRoutes = {
//     GetAll: "/Municipality/all",
// };

export const PickupPointRoutes = {
  Create: "/Order/CreatePickUpPoint",
  GetByUser: "/Order/GetAllPointsByCompany",
  Update: "/Order/UpdatePoint",
  Delete: "/Order/DeletePoint",
};

// export const PlantsRoutes = {
//     Create: "/Plants/CreatePlant",
//     GetByCompany: "/Plants/GetAllCompanyPlants",
// };

// export const CompanyRoutes = {
//     Create: "/Companies/CreateCompany",
//     CreateClientCompany: "/Companies/user/clientcompany",
//     GetByUserId: "/Companies/user/company",
//     UpdateMunicipality: "/Companies/municipalities",
//     DeleteMunicipality: "/Companies/municipalities",
// };

// export const PaymentRoutes = {
//     Create: "/PaymentDetails/payment",
//     Update: "/PaymentDetails/payment",
//     Get: "/PaymentDetails/payment",
// };

// export const StatRoutes = {
//     GetAvgPrice: "/Stats/company/price/avg",
//     GetExported: "/Stats/company/waste/exported",
//     GetTransportingIncome: "/Stats/company/transport/income",
// };

// export const WsRoute = `wss://${import.meta.env.VITE_WEBSOCKET_HOST}/socket/notifications`;

// === GIS ===
export const UserRoutes = {
  GetById: "/Users/GetUserById",
  EnterCode: "/Users/UserEnterCode",
  IdentifyByPhone: "/Users/UserIdentification",
  RefreshToken: "/Users/RefreshAuthorization",
  Authorization: "/Users/Authorization",
  Create: "/Users/CreateUser",
  Update: "/Users/UpdateUser",
  EmailConfirm: "/Users/email/send",
  PasswordRecovery: "/Users/password/recovery",
  Approve: "/Users/email/approve",
  AuthorizationByPhone: "/Users/login/phone",
};

// export const SewersRoutes = {
//   Create: "/Sewers/CreateSewer",
//   GetByCompanyId: "/Sewers/GetSewerByCompanyId",
//   GetByUserId: "/Sewers/GeSeverByUserId",
//   GetAll: "Sewers/all",
//   GetByIdWaterCompany: "Sewers/waterCompany",
// };

export const OrderRoutes = {
  GetAll: "/Order/all",
  Create: "/Order/CreateOrder",
  CreateByPoint: "/Order/СreateOrderByPoint",
  GetByUserId: "/Order/OrdersByUserId",
  GetById: "/Order/OrdersById",
  GetByIdTransporterCompany: "/Order/transporter/orders",
  AttachSewer: "/Order/AttachSewer",
  AttachCompany: "/Order/AttachCompany",
  ChangeStatus: "/Order/ChangeOrderStatus",
  GetByStatusId: "/Order/GetOrdersByStatusId",
  GetCode: "/Order/confirm",
};



// export const WaterCompanyRoutes = {
//   GetAll: "/WaterCompany/all",
//   Create: "/WaterCompany",
//   Delete: "/WaterCompany",
//   Get: "/WaterCompany",
//   ToggleTransporter: "/WaterCompany/transporter",
//   GetByUserId: "/WaterCompany/operator",

//   GetAllOperators: "/WaterCompany/operator/all",
//   CreateOperator: "/WaterCompany/operator",
// };

// export const MunicipalityRoutes = {
//   GetAll: "/Municipality/all",
// };

// export const StatsRoutes = {
//   ExportSummary: "/Stats/export/summary",
//   ExportTransporting: "/Stats/export/transporting",
//   ExportUtilization: "/Stats/export/utilization",

//   SummaryCompanyRecycle: "/Stats/summary/recycle/company",
//   SummaryPlantTariff: "/Stats/summary/plant/tariffs",
//   SummaryOrdersSewers: "/Stats/summary/orders/sewers",
//   SummaryOrdersPlant: "/Stats/summary/orders/plant",

//   RecycleAll: "/Stats/recycle/all",
//   RecycleCompany: "/Stats/recycle/companies",
//   TariffChanges: "/Stats/tariff/changes",

//   ExportedVolume: "/Stats/export/volume",
//   Profit: "/Stats/export/profit",
//   AverageOrderPrice: "/Stats/orders/price/avg",

//   TableMunicipalities: "/Stats/table/municipalities",
//   TablePlants: "/Stats/table/plants",
//   TableOrders: "/Stats/table/orders",
// };

export const PlantRoutes = {
  Create: "/Plants/CreatePlant",
  GetByWaterCompany: "/Plants/all/watercompany",
  GetByCompany: "/Plants/GetAllCompanyPlants",
  Delete: "/Plants/delete",
  CreateOperator: "/Plants/operator",
  Update: "/Plants/update",
};

// export const Tariff = {
//   Create: "/Tariff",
// };

export const ClientCompanyRoutes = {
  GetAll: "/Users/clientcompany/all",
  GetByWaterCompany: "/Users/clientcompany/by/watercompany",
};

// export const WsRoute = `wss://${import.meta.env.VITE_WEBSOCKET_HOST
//   }/socket/notifications`;


export const ControlBlock = {
  all: "/ControlBlock/all",
}
export const Hardware = {
  all: "/Hardware/all",
  one: "/Hardware/infoSingle",
  info: "/Hardware/info",
  create: "/Hardware/create",
  active: "/Hardware/Activate",
}

export const Characteristics = {
  createOnde: "/Characteristics/createOne",
  createMany: "/Characteristics/createMany",
  all: "/Characteristics/characteristics",
}

export const Control = {
  createOndeInfo: "/NodeInfo/createInfo",
  createManyInfo: "/NodeInfo/createMassInfo",
  createOndeCommand: "/NodeInfo/createCommand",
  createManyCommand: "/NodeInfo/createMassCommand",
  all: "/NodeInfo/commands",
}



export const Service = {
  create: "/MaintenanseSheduler/create",
  next_week: "/MaintenanseSheduler/next_week",
  completeRequest: "/MaintenanseSheduler/completeRequest",
}