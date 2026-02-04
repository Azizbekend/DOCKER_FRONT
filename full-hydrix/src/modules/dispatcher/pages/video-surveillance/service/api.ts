import { Camery } from "@/app/routers/api-router"
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

export const CameryСlearApi = () => {
    return reserchCamera.post(Camery.clear)
}


export interface CameryConnect {
    userId: number,
    cameraId?: number,
}