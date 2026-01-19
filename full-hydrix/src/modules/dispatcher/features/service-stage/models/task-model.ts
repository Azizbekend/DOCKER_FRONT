import { completeCommonServiceStageRequests, getByUserStageRequests } from "@/packages/entities/service-requests/api";
import { CompleteCommonStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class StageJobModel {

    model: ServiceStageType[] = [];
    isLoaded: boolean = true;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(id: number) {
        await getByUserStageRequests({ id: id })
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

    async completeCommon(data: CompleteCommonStageType) {
        await completeCommonServiceStageRequests(data)
            .then(() => {
                toast.success("Заявка успешно отменена", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при отмене", { progressStyle: { background: "red" } })
            })
    }
}

export const stageJobModel = new StageJobModel();