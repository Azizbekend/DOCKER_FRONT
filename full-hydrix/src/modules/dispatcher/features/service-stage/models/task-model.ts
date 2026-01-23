import { getCompanyOne } from "@/packages/entities/company/api";
import { getInfoHardware } from "@/packages/entities/hardware/api";
import { completeCommonServiceStageRequests, getByUserStageRequests } from "@/packages/entities/service-requests/api";
import { CompleteCommonStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { getByUser } from "@/packages/entities/user/api";
import { getGoodName } from "@/packages/functions/get-good-name";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class StageJobModel {

    model: ServiceStageType[] = [];
    isLoaded: boolean = true;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(id: number) {
        try {
            const serviceRes = await getByUserStageRequests({ id: id })
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
                this.model = this.model.filter((item) => { if (item.id !== data.stageId) return item })
                toast.success("Успешно отправлена", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
            })
    }
}

export const stageJobModel = new StageJobModel();