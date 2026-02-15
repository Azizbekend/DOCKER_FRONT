import { getFileLinkCommonPlanedServicesStageApi, getPlanedServiceByPlanApi } from "@/packages/entities/planed-services/api";
import { ServiceType } from "@/packages/entities/service-requests/type";
import { getCompanyUserRequest } from "@/packages/functions/get-data/get-company-user-request";
import { makeAutoObservable } from "mobx";

class ModelPlanedServiceList {


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(id: number) {

        

    }
}

export const modelPlanedServiceList = new ModelPlanedServiceList()