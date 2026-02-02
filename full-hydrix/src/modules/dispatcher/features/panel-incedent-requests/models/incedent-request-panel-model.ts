import { getCompanyOne } from "@/packages/entities/company/api";
import { getInfoHardware } from "@/packages/entities/hardware/api";
import { cancelServiceRequests, completeServiceRequests, getByIncidentServiceRequestsAll } from "@/packages/entities/service-requests/api";
import { CompleteCancelType, ServiceType } from "@/packages/entities/service-requests/type";
import { getByUser } from "@/packages/entities/user/api";
import { getCompanyUserRequest } from "@/packages/functions/get-data/get-company-user-request";
import { getGoodName } from "@/packages/functions/get-data/get-good-name";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";


class IncedentRequestPanelModel {
    list: ServiceType[] = []
    isLoader: boolean = false
    focusIncedent: any = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async pushObject(obj: any) {
        const enrichedItem = await getCompanyUserRequest(obj);
        this.list.push(enrichedItem)
    }


    async init(id: number) {



        if (id == 0) return

        try {
            this.isLoader = true;
            const serviceRes = await getByIncidentServiceRequestsAll({ id: id });
            const results = [];

            for (const item of serviceRes.data) {
                const enrichedItem = await getCompanyUserRequest(item);
                results.push(enrichedItem);
            }


            this.list = results;
            console.log(results)
        } catch (error) {
            console.error('Error in init:', error);
            this.list = [];
        } finally {
            this.isLoader = false;
        }
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

export const incedentRequestPanelModel = new IncedentRequestPanelModel()