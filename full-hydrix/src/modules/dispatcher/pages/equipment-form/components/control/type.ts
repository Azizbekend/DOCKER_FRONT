export interface ControlType {
  id?: string;
  name: string;
  mesurement: string;
  plcNodeid: string;
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
