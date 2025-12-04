import { makeAutoObservable } from "mobx";

class VideoSurveillanceModel {

    cameraSources: string[] = [
        "hydrig.gsurso.ru/camera/stream_1/index.m3u8",
        "hydrig.gsurso.ru/camera/stream_2/index.m3u8",
        "hydrig.gsurso.ru/camera/stream_3/index.m3u8",
        "hydrig.gsurso.ru/camera/stream_4/index.m3u8",
        "hydrig.gsurso.ru/camera/stream_5/index.m3u8",
        "hydrig.gsurso.ru/camera/stream_6/index.m3u8",
        "hydrig.gsurso.ru/camera/stream_7/index.m3u8",
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