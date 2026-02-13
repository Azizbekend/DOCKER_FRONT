import { getFileLinkCommonPlanedServicesStageApi, getPlanedServiceByPlanApi } from "@/packages/entities/planed-services/api";
import { ServiceType } from "@/packages/entities/service-requests/type";
import { getCompanyUserRequest } from "@/packages/functions/get-data/get-company-user-request";
import { makeAutoObservable } from "mobx";

class ModelPlanedServiceList {

    model: ServiceType[] = []
    isLoaded: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(id: number) {

        try {
            const serviceRes = await getPlanedServiceByPlanApi({ planId: id });
            const results = [];

            for (const item of serviceRes.data) {
                const enrichedItem = await getCompanyUserRequest(item);
                results.push({
                    ...enrichedItem,
                });
            }
            this.model = results;
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoaded = false
        }

    }
}

export const modelPlanedServiceList = new ModelPlanedServiceList()