export interface ControlType {
  id?: string;
  name: string;
  mesurement: string;
  plcNodeid: string;
  isValue: boolean;
  isInfo: boolean;
}

export interface ControlModelType {
  id: number,
  name: string,
  mesurement: string,
  plcNodeId: string,
  isCommand: boolean,
  isValue: boolean,
  hardwareId: number
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


export interface ServiceTypeCreate {
  discription: string;
  time: number;
  hardwareId: number;
}
