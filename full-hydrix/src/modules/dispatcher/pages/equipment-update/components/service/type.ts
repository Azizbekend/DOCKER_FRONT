
export interface ManyServiceCreate {
  hardwareId: number,
  characteristics: ServiceType[]
}


export interface ServiceType {
  id: string,
  discription: string,
  time: number,
}