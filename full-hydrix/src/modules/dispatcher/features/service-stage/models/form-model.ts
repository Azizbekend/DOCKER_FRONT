import { createServiceStageRequests } from "@/packages/entities/service-requests/api";
import { ServiceStageType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";

class ServiceStagesFormModel {
    model: ServiceStageType = {
        discription: '',
        stageType: '',
        serviceId: 0,
        creatorId: 0,
        implementerId: 0
    }


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setServiceId(id: number) {
        this.model.serviceId = id
    }

    setCreatorId(id: number) {
        this.model.creatorId = id
    }

    setImplementerId(id: number) {
        this.model.implementerId = id
    }

    setDiscription(value: string) {
        this.model.discription = value
    }
    setStageType(value: string) {
        this.model.stageType = value
    }
}


export const serviceStagesFormModel = new ServiceStagesFormModel()