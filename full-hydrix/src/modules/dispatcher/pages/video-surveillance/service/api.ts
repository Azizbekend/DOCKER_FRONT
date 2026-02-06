import { Camera } from "@/app/routers/api-router"
import { reserchCamera } from "@/app/api/instances"

export const CameraConnectApi = (params: CameraConnect) => {
    return reserchCamera.post(Camera.connect, params)
}

export const CameraSwitchApi = (params: CameraConnect) => {
    return reserchCamera.post(Camera.switch, params)
}

export const CameraDisconnectApi = (params: CameraConnect) => {
    return reserchCamera.post(Camera.disconnect, params)
}

export const CameraСlearApi = () => {
    return reserchCamera.post(Camera.clear)
}

export const CameraActivateApi = () => {
    return reserchCamera.post(Camera.activate)
}
export const CameraDeactivateApi = () => {
    return reserchCamera.post(Camera.deactivate)
}
export const CameraIsActiveApi = () => {
    return reserchCamera.get(Camera.isActive)
}


export interface CameraConnect {
    userId: number,
    cameraId?: number,
}