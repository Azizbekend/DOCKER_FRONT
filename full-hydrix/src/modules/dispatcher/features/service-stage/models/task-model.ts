import { getCompanyOne } from "@/packages/entities/company/api";
import { getInfoHardware } from "@/packages/entities/hardware/api";
import { completeCommonServiceStageRequests, getByUserStageRequests } from "@/packages/entities/service-requests/api";
import { CompleteCommonStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { supplyRequestStageConfirmNoPay, supplyRequestStageAttachExpenses, supplyRequestStageAttachPay, supplyRequestStageConfirm, supplyRequestStageComplete, supplyRequestStageResend, supplyRequestStageCancel, } from "@/packages/entities/supply-request/api";
import { getByUser } from "@/packages/entities/user/api";
import { getGoodName } from "@/packages/functions/get-data/get-good-name";
import { getAnswerActions } from "@/packages/functions/get-data/get-stage-supply-switch-text";
import { StageAction } from "@/packages/shared-components/stage/stage-actions";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class StageJobModel {

    model: ServiceStageType[] = [];
    isLoaded: boolean = true;

    typeAction: StageAction | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setTypeAction(value: StageAction) {
        this.typeAction = value
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

                    // ============ НУЖЕН МЕТОД ПО ПОЛУЧЕНИЮ ЗАЯВКИ ПО ID ============
                    // if (item.serviceId) {
                    //     requests.push({
                    //         key: 'hardware',
                    //         promise: getInfoHardware({ id: item.hardwareId })
                    //     });
                    // }

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

            this.model = results.sort((a, b) => {
                const aIsNew = a.currentStatus === "New";
                const bIsNew = b.currentStatus === "New";

                if (aIsNew && !bIsNew) return -1;
                if (!aIsNew && bIsNew) return 1;
                return 0;
            });

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

    async supplyRequestAction(data: any) {

        try {

            let dataRes: any;

            switch (this.typeAction) {
                case StageAction.confirmNoPay:
                    dataRes = await supplyRequestStageConfirmNoPay({
                        supplierName: data.supplierName,
                        realCount: data.count,
                        stageId: data.stageId,
                        nextImplementerId: data.implementerId,
                        nextImplementerCompanyId: data.implementersCompanyId,
                        requestId: data.serviceId,
                    })
                    break;
                case StageAction.attachExpenses:

                    console.log(data)

                    dataRes = await supplyRequestStageAttachExpenses({
                        supplierName: data.supplierName,
                        realCount: data.count,
                        expenseNumber: data.expenseNumber,
                        expenses: data.expenses,
                        stageId: data.stageId,
                        nextImplementerId: data.implementerId,
                        nextImplementerCompanyId: data.implementersCompanyId,
                        requestId: data.serviceId,
                    })
                    break;
                case StageAction.attachPay:
                    dataRes = await supplyRequestStageAttachPay({
                        stageId: data.stageId,
                        nextImplementerId: data.implementerId,
                        nextImplementerCompanyId: data.implementersCompanyId,
                        requestId: data.serviceId,
                    })
                    break;
                case StageAction.confirm:
                    dataRes = await supplyRequestStageConfirm({
                        stageId: data.stageId,
                        nextImplementerId: data.implementerId,
                        nextImplementerCompanyId: data.implementersCompanyId,
                        requestId: data.serviceId,
                    })
                    break;
                case StageAction.complete:
                    dataRes = await supplyRequestStageComplete({
                        implementerId: data.creatorId,
                        implementersCompanyId: data.creatiorCompanyId,
                        supplyStageId: data.stageId,
                    })
                    break;
                case StageAction.resend:
                    dataRes = await supplyRequestStageResend({
                        resendDiscription: data.discription,
                        creatorId: data.creatorId,
                        creatiorCompanyId: data.creatiorCompanyId,
                        nextImplementerId: data.implementerId,
                        nextImplementerCompanyId: data.implementersCompanyId,
                        hardwareId: data.hardwareId,
                        objectId: data.objectId,
                        serviceId: data.serviceId,
                    })
                    break;
                case StageAction.cancel:
                    dataRes = await supplyRequestStageCancel({
                        cancelDiscription: data.discription,
                        supplyStageId: data.stageId,
                    })
                    break;
            }

            toast.success(getAnswerActions(this.typeAction), { progressStyle: { background: "red" } })
        } catch (error) {

            console.log(error)

            toast.error("Ошибка", { progressStyle: { background: "red" } })
        }
    }
}

export const stageJobModel = new StageJobModel();