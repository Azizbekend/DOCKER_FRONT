import { DespetcherTest } from "@/entities/despetcher-test/type";
import { makeAutoObservable } from "mobx";



class UpdateObjectModel {
    model: DespetcherTest[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

}

export const createObjectModel = new UpdateObjectModel()