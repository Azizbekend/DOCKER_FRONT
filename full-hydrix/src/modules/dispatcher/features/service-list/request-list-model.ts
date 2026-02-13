import { getCompanyOne } from "@/packages/entities/company/api";
import { getInfoHardware } from "@/packages/entities/hardware/api";
import { completePlanedCommonServiceApi } from "@/packages/entities/planed-services/api";
import { CompletePlanedCommonServicesInterface } from "@/packages/entities/planed-services/type";
import { cancelServiceRequests, completeServiceRequests, getByObjectServiceRequests } from "@/packages/entities/service-requests/api";
import { CompleteCancelType, ServiceForStageCardInterface, ServiceType } from "@/packages/entities/service-requests/type";
import { getByUser } from "@/packages/entities/user/api";
import { getGoodName } from "@/packages/functions/get-data/get-good-name";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ListRequestModel {

    model: ServiceType[] = []
    isLoader: boolean = true
    isStagesPanel: boolean = false
    isService: ServiceForStageCardInterface = { id: 0, status: null, hardwareId: 0 }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setIsStagesPanel(value: boolean, id = 0, status: 'New' | 'Completed' | 'Canceled' | null, hardwareId?: number, type?: string) {
        this.isStagesPanel = value
        this.isService = {
            id: id,
            status: status,
            hardwareId: hardwareId || 0,
            type: type,
        }
    }

    async init(id: number) {
        try {
            this.isLoader = true;
            const serviceRes = await getByObjectServiceRequests({ id });
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

                            enrichedItem[key] = (key === 'implementer' || key == "creator") ? getGoodName(response.value.data) : response.value.data;
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
            console.log(results)
        } catch (error) {
            console.error('Error in init:', error);
            this.model = [];
        } finally {
            this.isLoader = false;
        }
    }

    async completePlanedService(data: CompletePlanedCommonServicesInterface) {
        await completePlanedCommonServiceApi(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch((error) => {
                toast.error(error.response.data, { progressStyle: { background: "red" } })
            })
    }
    async completeService(data: CompleteCancelType) {
        await completeServiceRequests(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch((error) => {
                toast.error(error.response.data, { progressStyle: { background: "red" } })
            })
    }

    async cancelService(data: CompleteCancelType) {
        await cancelServiceRequests(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
            })
    }
}

export const listRequestModel = new ListRequestModel()