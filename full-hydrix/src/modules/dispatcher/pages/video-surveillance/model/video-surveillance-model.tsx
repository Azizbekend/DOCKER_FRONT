import { makeAutoObservable } from "mobx";
import { CameryConnectApi, CamerySwitchApi, CameryDisconnectApi, CameryСlearApi } from "../service/api";

class VideoSurveillanceModel {
    cameraSources: number[] = [1, 2, 3, 4, 5, 6, 7];

    _videoSrc: string = "";
    userId: number = 0;
    loader: boolean = true;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get videoSrc() {
        return this._videoSrc;
    }

    async CameraConnect(userId: number, retryCount: number = 3, delay: number = 1000) {
        this.userId = userId;
        this.loader = true;

        for (let attempt = 1; attempt <= retryCount; attempt++) {
            try {
                const res = await CameryConnectApi({
                    userId: this.userId,
                    cameraId: this.cameraSources[0]
                });

                this._videoSrc = "http://hydrig.gsurso.ru/camera/" + res.data.data.streamUrl;
                break;

            } catch (err) {
                if (attempt === retryCount) {
                    console.error('All connection attempts failed');
                } else {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        this.loader = false;
    }

    async CameraSwitch(id: number) {
        this.loader = true;

        await CamerySwitchApi({
            userId: this.userId,
            cameraId: id
        })
            .then((res) => {
                this._videoSrc = "http://hydrig.gsurso.ru/camera/" + res.data.data.streamUrl;
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                this.loader = false;
            })
    }

    async CameraDisconnect() {
        await CameryDisconnectApi({ userId: this.userId })
            .then((res) => {
                console.log("Камера отключина")
            })
            .catch((err) => {
                console.error(err)
            })
    }


    async CameryСlear() {
        await CameryСlearApi()
            .then((res) => console.log(res.data))
            .catch((error) => console.log(error))
    }
}

export const videoSurveillanceModel = new VideoSurveillanceModel()  