import { getServiceStageRequestsAll } from "@/packages/entities/service-requests/api";
import { ServiceStageType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";

class StageJobModel {

    model: ServiceStageType[] = [];
    isLoaded: boolean = true;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(id: number) {
        await getServiceStageRequestsAll({ id: id })
            .then((res) => {
                this.model = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.isLoaded = false;
            });
    }

    reset() {

    }
}

export const stageJobModel = new StageJobModel();