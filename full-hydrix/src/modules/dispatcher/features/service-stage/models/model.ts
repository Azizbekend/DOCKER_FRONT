import { getCompanyOne } from "@/packages/entities/company/api";
import { getInfoHardware } from "@/packages/entities/hardware/api";
import { cancelServiceStageRequests, completeCommonServiceStageRequests, completeServiceStageRequests, createServiceStageRequests, getByObjectServiceRequests, getServiceStageRequestsAll } from "@/packages/entities/service-requests/api";
import { CancelStageType, CompleteCommonStageType, CompleteEngineerStageType, ServiceStageType } from "@/packages/entities/service-requests/type";
import { supplyRequestStageAttachExpenses, supplyRequestStageAttachPay, supplyRequestStageCancel, supplyRequestStageComplete, supplyRequestStageConfirm, supplyRequestStageConfirmNoPay, supplyRequestStageResend } from "@/packages/entities/supply-request/api";
import { getByUser } from "@/packages/entities/user/api";
import { getCompanyUserRequest } from "@/packages/functions/get-company-user-request";
import { getGoodName } from "@/packages/functions/get-good-name";
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

//     async supplyRequestAction() {

//         try {

//             let dataRes: any;

//             switch (this.typeAction) {
//                 case StageAction.confirmNoPay:
//                     dataRes = await supplyRequestStageConfirmNoPay({
// supplierName
// realCount
// stageId
// nextImplementerId
// nextImplementerCompanyId
// requestId
// supplyRequestId
//                     })
//                     break;
//                 case StageAction.attachExpenses:
//                     dataRes = await supplyRequestStageAttachExpenses({
// supplierName
// realCount
// expenseNumber
// expenses
// stageId
// nextImplementerId
// nextImplementerCompanyId
// requestId
// supplyRequestId
//                     })
//                     break;
//                 case StageAction.attachPay:
//                     dataRes = await supplyRequestStageAttachPay({
// supplyRequestId
// stageId
// nextImplementerId
// nextImplementerCompanyId
// requestId
//                     })
//                     break;
//                 case StageAction.confirm:
//                     dataRes = await supplyRequestStageConfirm({
// supplyRequestId
// stageId
// nextImplementerId
// nextImplementerCompanyId
// requestId
//                     })
//                     break;
//                 case StageAction.complete:
//                     dataRes = await supplyRequestStageComplete({
// implementerId
// implementersCompanyId
// supplyRequestId
// supplyStageId
//                     })
//                     break;
//                 case StageAction.resend:
//                     dataRes = await supplyRequestStageResend({
// resendDiscription
// creatorId
// creatiorCompanyId
// nextImplementerId
//     nextImplementerCompanyId
// hardwareId
// objectId
// serviceId
//                     })
//                     break;
//                 case StageAction.cancel:
//                     dataRes = await supplyRequestStageCancel({
// cancelDiscription
// supplyRequestId
// supplyStageId
//                     })
//                     break;

//                 default:
//                     break;
//             }



//         } catch (error) {
//             console.log(error)
//         }
//     }


    async pushStage(data: ServiceStageType) {
        const enrichedItem = await getCompanyUserRequest(data);
        this.model.push(enrichedItem)
    }



}


export const serviceStagesModel = new ServiceStagesModel()