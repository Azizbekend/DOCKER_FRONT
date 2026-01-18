import { getByObjectServiceRequests, getServiceRequestsAll } from "@/packages/entities/service-requests/api";
import { ServiceType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";

class ListRequestModel {

    model: ServiceType[] = []
    isLoader: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
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