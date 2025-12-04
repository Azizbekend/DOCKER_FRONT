import { DespetcherTest } from "@/entities/despetcher-test/type";
import { makeAutoObservable } from "mobx";



class RegistryModel {
    model: DespetcherTest[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    get list() {
        return this.model
    }

    init() {
        for (let i = 0; i < 20; i++) {
            this.model[i] = {
                img: "stations.jpg",
                nameMinin: "Очистные сооружения в с. Шапши" + i,
                company: "АО “ВКС”",
                statusСonnection: i % 2 == 0 ,
                statusJob: i % 3 == 0,
                volumeProjec: 9.0,
                volumeAverage: 10.5,
                volumeReale: 9.2,
                dispetcher: i % 2 == 0

            }
        }
    }

}

export const registryModel = new RegistryModel()