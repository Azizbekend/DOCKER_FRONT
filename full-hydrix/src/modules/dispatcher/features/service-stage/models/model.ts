import { cancelServiceStageRequests, completeCommonServiceStageRequests, completeServiceStageRequests, getServiceStageRequestsAll } from "@/packages/entities/service-requests/api";
import { CancelStageType, CompleteCommonStageType, CompleteEngineerStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { supplyRequestStageAttachExpenses, supplyRequestStageAttachPay, supplyRequestStageCancel, supplyRequestStageComplete, supplyRequestStageConfirm, supplyRequestStageConfirmNoPay, supplyRequestStageResend } from "@/packages/entities/supply-request/api";
import { getCompanyUserRequest } from "@/packages/functions/get-data/get-company-user-request";
import { getAnswerActions } from "@/packages/functions/get-data/get-stage-supply-switch-text";
import { StageAction } from "@/packages/shared-components/stage/stage-actions";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ServiceStagesModel {
    model: ServiceStageType[] = []
    isLoaded: boolean = true

    isEngener: boolean = false
    isActiveRequest: boolean = false

    typeAction: StageAction | null = null


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setIsActiveRequest(value: boolean) {
        this.isActiveRequest = value
    }

    setTypeAction(value: StageAction) {
        this.typeAction = value
    }

    async init(id: number, userDD: any) {

        this.isLoaded = true
        this.isEngener = userDD.isCommandsEnabled

        try {
            const serviceRes = await getServiceStageRequestsAll({ id });
            const results = [];

            for (const item of serviceRes.data) {
                const enrichedItem = await getCompanyUserRequest(item);
                results.push(enrichedItem);
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
            .catch((error) => {
                toast.error(error.response.data, { progressStyle: { background: "red" } })
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
            .catch((error) => {
                toast.error(error.response.data, { progressStyle: { background: "red" } })
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
            .catch((error) => {
                toast.error(error.response.data, { progressStyle: { background: "red" } })
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


    async pushStage(data: ServiceStageType) {
        const enrichedItem = await getCompanyUserRequest(data);
        this.model.push(enrichedItem)
    }
}


export const serviceStagesModel = new ServiceStagesModel()