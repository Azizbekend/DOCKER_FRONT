import { cancelServiceRequests, completeServiceRequests, getByObjectServiceRequests } from "@/packages/entities/service-requests/api";
import { CompleteCancelType, ServiceType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ListRequestModel {

    model: ServiceType[] = []
    isLoader: boolean = true
    isStagesPanel: boolean = false
    isService: { id: number, status: 'New' | 'Completed' | 'Canceled' | null } = { id: 0, status: null }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setIsStagesPanel(value: boolean, id = 0, status: 'New' | 'Completed' | 'Canceled' | null) {
        this.isStagesPanel = value
        this.isService = {
            id: id,
            status: status
        }
    }

    async init(id: number) {
        await getByObjectServiceRequests({ id: id })
            .then((res) => {

                const idsUsers = res.data.map((item) => {
                    return {
                        id: item.id,
                        creatorId: item.creatorId,
                        implements: item.implementerId,
                        company: item.implementerId
                    }
                })

                console.log(res.data)
                // await getByUser({ id: })

                this.model = res.data
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.isLoader = false
            })
    }

    async completeService(data: CompleteCancelType) {
        await completeServiceRequests(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
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