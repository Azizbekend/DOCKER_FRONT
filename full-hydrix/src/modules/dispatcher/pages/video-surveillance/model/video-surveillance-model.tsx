import { makeAutoObservable } from "mobx";
import { CameraConnectApi, CameraSwitchApi, CameraDisconnectApi, CameraActivateApi, CameraDeactivateApi, CameraIsActiveApi } from "../service/api";

class VideoSurveillanceModel {
    cameraSources: number[] = [1, 2, 3, 4, 5, 6, 7];

    _videoSrc: string = "";
    userId: number = 0;
    loader: boolean = true;
    isActive: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get videoSrc() {
        return this._videoSrc;
    }

    async CameraConnect(userId: number, retryCount: number = 3, delay: number = 1000) {

        this.userId = userId;
        this.loader = true;

        if (await this.CameraIsActive()) {
            return
        }

        for (let attempt = 1; attempt <= retryCount; attempt++) {
            try {
                const res = await CameraConnectApi({
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

        this.loader = false

    }

    async CameraSwitch(cameraId: number) {
        this.loader = true;
        try {
            if (!(await this.CameraIsActive())) {
                return
            }

            const switchResponse = await CameraSwitchApi({
                userId: this.userId,
                cameraId: cameraId
            });

            if (switchResponse.data?.data?.streamUrl) {
                this._videoSrc = `http://hydrig.gsurso.ru/camera/${switchResponse.data.data.streamUrl}`;
            } else {
                console.error('No stream URL in response');
            }

        } catch (error) {
            console.error('Error switching camera:', error);
        } finally {
            this.loader = false;
        }
    }
    async CameraDisconnect() {
        await CameraDisconnectApi({ userId: this.userId })
            .then((res) => {
                console.log("Камера отключина")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    async CameraActivate() {
        await CameraActivateApi()
            .then((res) => {
                this.isActive = res.data.data
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }

    async CameraDeactivate() {
        await CameraDeactivateApi()
            .then((res) => {
                this.isActive = res.data.data
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }

    async CameraIsActive() {
        try {
            const res = await CameraIsActiveApi()

            this.isActive = res.data.data;
            console.log('Camera active status:', this.isActive);
            if (!this.isActive) {
                console.warn('Camera is not active, switching not performed');
            }
            return this.isActive

        } catch (error) {
            console.log(error)
            return false;

        }
    }
}

export const videoSurveillanceModel = new VideoSurveillanceModel()  