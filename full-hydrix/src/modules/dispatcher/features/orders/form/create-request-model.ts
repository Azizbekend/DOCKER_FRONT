import { FormCommonServiceModelType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";

class CreateRequestModel {

    model: FormCommonServiceModelType = {
        title: "",
        discription: "",
        type: "",
        creatorId: 0,
        implementerId: 0,
        hardwareId: 0,
        objectId: 0,
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    setTitle(value: string) {
        this.model.title = value
    }
    setDiscription(value: string) {
        this.model.discription = value
    }
    setType(value: string) {
        this.model.type = value
    }
    setHardwareId(value: number) {
        this.model.hardwareId = value
    }

    clear() {
        this.model = {
            title: "",
            discription: "",
            type: "",
            creatorId: 0,
            implementerId: 0,
            hardwareId: 0,
            objectId: 0,
        }
    }

    init() {
        this.clear()

    }
}

export const createRequestModel = new CreateRequestModel()