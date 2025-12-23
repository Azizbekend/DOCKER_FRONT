import { Camery } from "@/app/api/api-router"
import { reserchCamera } from "@/app/api/instances"

export const CameryConnectApi = (params: CameryConnect) => {
    return reserchCamera.post(Camery.connect, params)
}

export const CamerySwitchApi = (params: CameryConnect) => {
    return reserchCamera.post(Camery.switch, params)
}

export const CameryDisconnectApi = (params: CameryConnect) => {
    return reserchCamera.post(Camery.disconnect, params)
}


export interface CameryConnect {
    userId: number,
    cameraId?: number,
}