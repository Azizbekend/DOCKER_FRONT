import { DespetcherTest } from "@/entities/despetcher-test/type";
import { makeAutoObservable } from "mobx";
import { passportObject } from "../service/api";
import { getTechnicalCharsShapshi } from "@/entities/object/api";



class RegistryModel {
    model: DespetcherTest[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init() {

        await getTechnicalCharsShapshi()
            .then((res) => {
                const data = res.data;
                this.model[0] = {
                    img: "stations.jpg",
                    nameMinin: "Очистные сооружения в с. Шапши",
                    company: "АО “ВКС”",
                    statusСonnection: true,
                    volumeProjec: 250,
                    dayEfficiency: data.dayEfficiency,
                    hourEfficiency: data.hourEfficiency,
                    dispetcher: true
                }
            })
            .catch((err) => {
                console.log(err)
            })


    }
}

export const registryModel = new RegistryModel()