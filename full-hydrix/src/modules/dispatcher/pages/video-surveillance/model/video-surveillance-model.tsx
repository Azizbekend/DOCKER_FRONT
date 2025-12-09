import { makeAutoObservable } from "mobx";

class VideoSurveillanceModel {

    cameraSources: string[] = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
    ];

    bigViewSrc = this.cameraSources[0];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setBigViewSrc(value: string) {
        this.bigViewSrc = value
    }
}

export const videoSurveillanceModel = new VideoSurveillanceModel() 