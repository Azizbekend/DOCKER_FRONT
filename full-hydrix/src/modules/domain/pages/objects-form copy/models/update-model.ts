import { DespetcherTest } from "@/packages/entities/despetcher/type";
import { makeAutoObservable } from "mobx";



class UpdateObjectModel {
    model: DespetcherTest[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

}

export const createObjectModel = new UpdateObjectModel()