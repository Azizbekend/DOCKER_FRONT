import { getByObjectServiceRequests } from "@/packages/entities/service-requests/api";
import { ServiceType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";

class ListRequestModel {

    model: ServiceType[] = []
    isLoader: boolean = true
    isStagesPanel: boolean = false
    isServiceId: number = 0

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setIsStagesPanel(value: boolean, id = 0) {
        this.isServiceId = id
        this.isStagesPanel = value
    }

    async init(id: number) {
        await getByObjectServiceRequests({ id: id })
            .then((res) => {
                this.model = res.data
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.isLoader = false
            })
    }
}

export const listRequestModel = new ListRequestModel()