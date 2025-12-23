import { makeAutoObservable } from "mobx";
import { CameryConnectApi, CamerySwitchApi, CameryDisconnectApi } from "../service/api";

class VideoSurveillanceModel {
    cameraSources: number[] = [1, 2, 3, 4, 5, 6, 7];

    _videoSrc: string = "";

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get videoSrc() {
        return this._videoSrc;
    }

    async CameraConnect() {
        await CameryConnectApi({ userId: 1, cameraId: this.cameraSources[0] })
            .then((res) => {
                this._videoSrc = "http://hydrig.gsurso.ru/camera" + res.data.data.streamUrl;
                console.log(this._videoSrc)
            })
            .catch((err) => { console.log(err) })
    }

    async CameraSwitch(id: number) {
        await CamerySwitchApi({
            userId: 1,
            cameraId: id
        })
            .then((res) => {
                this._videoSrc = "http://hydrig.gsurso.ru/camera" + res.data.data.streamUrl;
                console.log(res.data.data.streamUrl)
            })
            .catch((err) => { console.log(err) })
    }

    async CameraDisconnect() {
        await CameryDisconnectApi({ userId: 1 })
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) })
    }
}

export const videoSurveillanceModel = new VideoSurveillanceModel() 