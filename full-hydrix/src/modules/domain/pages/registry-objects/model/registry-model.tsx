import { DespetcherTest } from "@/entities/despetcher-test/type";
import { makeAutoObservable } from "mobx";
import { passportObject } from "../service/api";



class RegistryModel {
    model: DespetcherTest[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
    }

    async init() {
        this.model[0] = {
            img: "stations.jpg",
            nameMinin: "Очистные сооружения в с. Шапши",
            company: "АО “ВКС”",
            statusСonnection: true,
            volumeProjec: 250,
            volumeAverage: 110,
            volumeReale: 9.2,
            dispetcher: true
        }
    }
}

export const registryModel = new RegistryModel()