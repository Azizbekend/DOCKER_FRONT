import { getCompanyOne } from "@/packages/entities/company/api";
import { getInfoHardware } from "@/packages/entities/hardware/api";
import { cancelServiceStageRequests, completeCommonServiceStageRequests, completeServiceStageRequests, createServiceStageRequests, getByObjectServiceRequests, getServiceStageRequestsAll } from "@/packages/entities/service-requests/api";
import { CancelStageType, CompleteCommonStageType, CompleteEngineerStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { getByUser } from "@/packages/entities/user/api";
import { getGoodName } from "@/packages/hook/user/get-good-name";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ServiceStagesModel {
    model: ServiceStageType[] = []
    isLoaded: boolean = true

    isEngener: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: number, userDD: any) {


        this.isEngener = userDD.isCommandsEnabled



        try {
            const serviceRes = await getServiceStageRequestsAll({ id });
            const results = [];

            for (const item of serviceRes.data) {
                try {
                    const requests: { key: string; promise: Promise<any> }[] = [];

                    if (item.creatorsCompanyId) {
                        requests.push({
                            key: 'creatorsCompany',
                            promise: getCompanyOne({ id: item.creatorsCompanyId })
                        });
                    }

                    if (item.implementersCompanyId) {
                        requests.push({
                            key: 'implementersCompany',
                            promise: getCompanyOne({ id: item.implementersCompanyId })
                        });
                    }

                    if (item.creatorId) {
                        requests.push({
                            key: 'creator',
                            promise: getByUser({ id: item.creatorId })
                        });
                    }

                    if (item.implementerId) {
                        requests.push({
                            key: 'implementer',
                            promise: getByUser({ id: item.implementerId })
                        });
                    }

                    if (item.hardwareId) {
                        requests.push({
                            key: 'hardware',
                            promise: getInfoHardware({ id: item.hardwareId })
                        });
                    }
                    const responses = await Promise.allSettled(
                        requests.map(r => r.promise)
                    );

                    const enrichedItem = { ...item };

                    responses.forEach((response, index) => {
                        if (response.status === 'fulfilled') {
                            const key = requests[index].key;

                            if (key == "hardwareId") {
                                console.log(response.value.data)
                            }

                            enrichedItem[key] =
                                (key === 'implementer' || key === 'creator') ? getGoodName(response.value.data) : response.value.data;
                        }
                    });

                    results.push(enrichedItem);
                } catch (error) {
                    console.error(`Error processing item ${item.id}:`, error);
                    results.push({
                        ...item,
                        error: true
                    });
                }
            }

            this.model = results;
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoaded = false
        }
    }

    async completeCommon(data: CompleteCommonStageType) {
        await completeCommonServiceStageRequests(data)
            .then(() => {
                this.model = this.model.map((item) => {
                    if (item.id === data.stageId) {
                        item.currentStatus = "Completed"
                    }
                    return item
                })
                toast.success("Заявка успешно завершена", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
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
                        item.cancelDiscription = data.cancelDiscriprion
                    }
                    return item
                })

                toast.success("Заявка успешно отменена", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при отмене заявки", { progressStyle: { background: "red" } })
            })
    }

    pushStage(data: ServiceStageType) {
        this.model.push(data)
    }
}


export const serviceStagesModel = new ServiceStagesModel()