export interface ControlType {
  id?: string;
  name: string;
  value?: string | number | boolean;
  mesurement: string;
  plcNodeid: string;
  plcNodeId: string;
  isValue: boolean;
  isInfo: boolean;
  isCommand?: boolean,
  hardwareId?: number;
}

export interface ControlTypeCreateMany {
  hardwareId: number;
  nodes: ControlTypeCreate[]
}

export interface ControlTypeCreate {
  name: string;
  mesurement: string;
  plcNodeid: string;
  hardwareId: number;
  isValue: boolean;
}


export interface ControlStateType {
  controlers: ControlType[];
}



export interface ServiceModelType {
  id: string,
  discription: string,
  durrentStatus: string,
  isFailure: string,
  creator: string,
  implementer: string,
  createtAt: string,
  closedAt: string,
  hardwareId: string,
  hardware: string,
}

export interface ServiceTypeCreate {
  discription: string;
  time: number;
  hardwareId: number;
}

export interface ServiceHistoryType {
  title: string,
  sheduleMaintenanceDate: string,
  completedMaintenanceDate: string,
}

export interface ServiceHistoryDataApiType {
  title: string,
  recordsList: ServiceRecordsListType[]
}
export interface ServiceRecordsListType {
  id: number,
  maintenanceRequestId: number,
  completedMaintenanceDate: string,
  sheduleMaintenanceDate: string,

}



export interface ServiceStatisticType {
  name: string,
  progress: number,
  actualDate: Date | null
}

export interface EventLogsType {
  id: number,
  indicates: string,
  plcNodeId: string,
  timeStamp: Date | null
}