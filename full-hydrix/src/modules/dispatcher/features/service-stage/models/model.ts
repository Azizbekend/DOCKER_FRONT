import { cancelServiceStageRequests, completeCommonServiceStageRequests, completeServiceStageRequests, createServiceStageRequests, getServiceStageRequestsAll } from "@/packages/entities/service-requests/api";
import { CancelStageType, CompleteCommonStageType, CompleteEngineerStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ServiceStagesModel {
    model: ServiceStageType[] = []
    isLoaded: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: number) {
        await getServiceStageRequestsAll({ id: id })
            .then((res) => {
                this.model = res.data
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.isLoaded = false
            })

    }

    async create(data: ServiceStageType) {
        if (data.discription === '' || data.stageType === '') return

        await createServiceStageRequests(data)
            .then((res) => {
                this.model.push(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
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
    async completeEngineer(data: CompleteEngineerStageType) {
        await completeServiceStageRequests(data)
            .then(() => {

                this.model = this.model.map((item) => {
                    if (item.id === data.stageId) {
                        item.currentStatus = "Completed"
                    }
                    return item
                })

                toast.success("Этап успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
            })
    }
    async cancelEngineer(data: CancelStageType) {
        await cancelServiceStageRequests(data)
            .then(() => {

                this.model = this.model.map((item) => {
                    if (item.id === data.stageId) {
                        item.currentStatus = "Canceled"
                    }
                    return item
                })

                toast.success("Заявка успешно отменена", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при отмене заявки", { progressStyle: { background: "red" } })
            })
    }
}


export const serviceStagesModel = new ServiceStagesModel()