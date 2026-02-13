export const PickupPointRoutes = {
  Create: "/Order/CreatePickUpPoint",
  GetByUser: "/Order/GetAllPointsByCompany",
  Update: "/Order/UpdatePoint",
  Delete: "/Order/DeletePoint",
};

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
  getById: "/User/users/user/id",
  getCompany: "/User/users/companyUsers/all"
};


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



export const PlantRoutes = {
  Create: "/Plants/CreatePlant",
  GetByWaterCompany: "/Plants/all/watercompany",
  GetByCompany: "/Plants/GetAllCompanyPlants",
  Delete: "/Plants/delete",
  CreateOperator: "/Plants/operator",
  Update: "/Plants/update",
};


export const ClientCompanyRoutes = {
  GetAll: "/Users/clientcompany/all",
  GetByWaterCompany: "/Users/clientcompany/by/watercompany",
};


export const ControlBlock = {
  all: "/ControlBlock/all",
  create: "/ControlBlock/create",
  getOne: "/ControlBlock/all/passport",
  checkPlc: "/ControlBlock/connection/check",
}
export const Hardware = {
  all: "/Hardware/all",
  one: "/Hardware/infoSingle",
  update: "/Hardware/info/update",
  delete: "/Hardware/info/delete",
  info: "/Hardware/info",
  create: "/Hardware/create",
  active: "/Hardware/Activate",
  statusHardwaresCheck: "/Hardware/statusCheck/group",
  events: "/Hardware/hardwareEvents",
}

export const Schema = {
  create: "/schemas/schema/create",
  all: "/schemas/schemas",
  CoordinatesCreate: "/schemas/schema/coordinates/create",
  getCoordinates: "/schemas/schemas/coordinates",
}

export const SchemaCard = {
  create: "schemas/card/create",
  all: "/schemas/scheme/cards",
  update: "/schemas/card/update",
  delete: "/schemas/card/delete",
}

export const SchemaCooradinate = {
  update: "/schemas/schemas/coordinates/update",
  delete: "/schemas/schema/coordinates",
}

export const Characteristics = {
  createOnde: "/Characteristics/createOne",
  createMany: "/Characteristics/createMany",
  all: "/Characteristics/characteristics",
  delete: "/Characteristics/characteristic/delete",
}

export const Control = {
  createOndeInfo: "/NodeInfo/createInfo",
  createManyInfo: "/NodeInfo/createMassInfo",
  createOndeCommand: "/NodeInfo/createCommand",
  createManyCommand: "/NodeInfo/createMassCommand",
  all: "/NodeInfo/commands",
  allInfo: "/NodeInfo/infos",
  delete: "/NodeInfo/info/delete",

  single: "/NodeInfo/single",
}

export const Command = {
  check: "/Comand/check/remoteControlStatus",
  active: "/Comand/hardware/remoreControl/Activate",
  deactive: "/Comand/hardware/remoreControl/Deactivate",
  send: "/Comand/send/command/string",
}

export const Incident = {
  allIncedent: "/Incidents/incidents/all", // Получаем все все аварии
  object: "/Incidents/incidents/object", // Получаем аварии по 1 объекту

  common: "/NodeInfo/nodes/incident/common", // Этот метод возвращает список всех узлов общей аварии для оборудования
  commonCheck: "/NodeInfo/nodes/incident/common_check", // Информация об общей аварии у оборудования 
  all: "/NodeInfo/nodes/incident/all", // Этот метод возвращает список всех узлов общей аварии для указанного оборудования

  // Этот метод проверяет наличие активных аварий на оборудовании.
  // - Получает все узлы аварий для оборудования (12 типов аварийных сигналов)
  // - Для каждого узла проверяет последний статус
  // - Возвращает список активных аварий (только те, где статус "True") с их ID и названиями
  allCheck: "/NodeInfo/nodes/incident/all_check", //

  allFull: "/Incidents/incidents/all",
  byObject: "/Incidents/incidents/object",
  forTableByObject: "/Incidents/object/forTable",
  forTableAllFull: "/Incidents/all/forTable",
  byHardware: "/Incidents/hardware/all",
}



export const Documents = {
  upload: "/FileStorage/documents/upload",
  hardware: "/FileStorage/documents/hardware",

  objectDocumentUpload: "/FileStorage/object/document/upload",
  objectDocumenAll: "/FileStorage/object/documents/all",
  objectDocumentDelete: "/FileStorage/object/document/id",
  objectDocumentActive: "/FileStorage/object/active/documents/all",
}


export const Service = {
  create: "/MaintenanseSheduler/create",
  next_week: "/MaintenanseSheduler/next_week",
  today: "/MaintenanseSheduler/today",
  historyRecords: "/MaintenanseSheduler/history/records",
  historyRecordsAll: "/MaintenanseSheduler/history/records/all",
  historyRecordsAllOrdered: "/MaintenanseSheduler/history/records/all/ordered",
  completeRequest: "/MaintenanseSheduler/completeRequest",
}


export const PassportObject = {
  create: "/Passport/create",
  update: "/Passport/update",
  byCompany: "/Passport/object/company/users",

  all: "/Passport/all",
  single: "/Passport/single",
  byObject: "/Passport/object/companies",

  byUsers: "/Passport/object/company/users",
  attachCompany: "/Passport/object/company/attach",
  attachUser: "/Passport/object/company/user/attach",
  getCompanyObjectLinkId: "/Passport/object/company/getCompanyObjectLink",
  getUserCompanyObjectLinkId: "/Passport/object/company/user/getUserCompanyLink",
  getbjCompDataId: "/Passport/object/company/user/getUsers/objCompId",
  deleteUserFromObject: "/Passport/object/company/user/deleteUserFromObject",
  getUserObjectsLink: "/Passport/object/company/user/getUserCompanyLink",
  getAllUserObjects: "Passport/getAllUserObjects",
}


export const Camera = {
  connect: "/connect",
  switch: "/switch",
  disconnect: "/disconnect",
  clear: "/clear",

  activate: "/activate",
  deactivate: "/deactivate",
  isActive: "/is/active",
}


export const NodeIndicates = {
  technicalChars: "/NodeIndicates/technicalChars/Shapshi",
  group: "/NodeIndicates/actual/group",
  plcNodeOd: "/NodeIndicates/actual/plcNodeOd",
  hStatusAll: "/NodeIndicates/hStatus/all/byPlcNodeId",
  getLogs: "/NodeIndicates/hardware/statusLog",
  getTechSpecsStatisticsByPeriod: "/NodeIndicates/indicates/byPeriod",
}


export const ServiceRequests = {
  all: "/ServiceRequests/services/all",
  byObject: "/ServiceRequests/object/services/all",
  byIncident: "/ServiceRequests/services/incidentServices/all",


  create: "/ServiceRequests/mainEngineer/commonService/InitialCreate",
  createIncident: "/ServiceRequests/mainEngineer/incidentService/InitialCreate",

  complete: "/ServiceRequests/mainEngineer/commonService/complete",
  cancel: "/ServiceRequests/mainEngineer/commonService/Cancel",
};


export const ServiceStageRequests = {
  all: "/ServiceRequests/stage/services/all",
  byUser: "/ServiceRequests/services/stages/user/all",
  create: "/ServiceRequests/mainEngineer/serviceStage/create",
  completeCommon: "/ServiceRequests/common/serviceStage/complete",
  complete: "/ServiceRequests/mainIngineer/serviceStage/complete",
  cancel: "/ServiceRequests/mainEngineer/serviceStage/Cancel",
};


export const PlanedServices = {
  factWorkTime: "/PlanedServices/internalMethod/hardware/factWorkTime",
  byHardware: "/PlanedServices/plannedService/hardware",
  create: "/PlanedServices/createPlanService",
  timeLeft: "/PlanedServices/plannedService/timeLeft",
  commonServices: "/PlanedServices/commonServices",
}

export const PlanedCommonServices = {
  create: "/PlanedServices/commonService/create",
  complete: "/PlanedServices/commonService/mainEngineeer/Complete",
}

export const PlanedServicesStage = {
  create: "/PlanedServices/commonService/stage/mainEngineer/create",
  commonComplete: "/PlanedServices/commonService/stage/simple/complete",
  engineerComplete: "/PlanedServices/commonService/stage/mainEngineer/complete",
  engineerCancel: "/PlanedServices/commonService/stage/mainEngineer/Cancel",
  fileLink: "/PlanedServices/commonService/fileLink",
}

export const PlanedServicesInstruction = {
  all: "/PlanedServices/instructions/all",
  getInstruction: "/PlanedServices/service/instruction",
  create: "/PlanedServices/instruction/create",
  attach: "/PlanedServices/instruction/attach",
  createAttach: "/PlanedServices/instruction/create&attach",
}


export const SupplyRequest = {
  create: "/SupplyRequest/mainEngineer/SupplyRequest/InitialCreate",
  createStage: "/SupplyRequest/mainEngineer/supplyRequest/stage/create",

  confirmNoPay: "/SupplyRequest/supplier/warehouse/confirm/noPay",
  attachExpenses: "/SupplyRequest/supplier/attachExpenses",
  attachPay: "/SupplyRequest/buhgalteriya/attachPay",
  confirm: "/SupplyRequest/supplier/warehouse/confirm",
  complete: "/SupplyRequest/mainEngineer/supplyStage/complete",
  resend: "/SupplyRequest/mainEngineer/supplyRequest/stage/resend",
  cancel: "/SupplyRequest/mainEngineer/supplyStage/Cancel",
  delete: "/SupplyRequest",
}

export const Company = {
  getOne: "/Company/companies/company/id",
  byName: "/Company/companies/company/name",
  byInn: "/Company/companies/company/inn",
  create: "/Company/companies/company/create",
}

export const User = {
  byOne: "/User/users/user/id",
  byName: "/User/users/user/name",
  // create: "/User/users/user/create",
  create: "/User/users/user/createHashed",
  // authorise: "/User/users/user/authorise",
  // /User/users/user/authoriseHash
  authorise: "/User/users/user/authoriseHash",
  attachCompany: "/User/usets/user/attachCompany",
}