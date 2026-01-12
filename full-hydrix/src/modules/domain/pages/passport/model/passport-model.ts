import { makeAutoObservable } from "mobx";
import { IPassportModel } from "../type/types";
import { getTechnicalCharsShapshi } from "../service";

class PassportModel {

    model: IPassportModel = {
        designPerformance: {
            name: "Проектная производительность",
            value: "200 м³/сут",
        },
        hourEfficiency: {
            name: "Часовая производительность",
            value: "0",
        },
        dayEfficiency: {
            name: "Среднесуточная производительность",
            value: "0",
        },
        electroConsumption: {
            name: "Расход электроэнергии",
            value: "0",
        },
        waterConsumption: {
            name: "Водоснабжение",
            value: "0",
        },
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init() {
        await getTechnicalCharsShapshi()
            .then((res) => {
                const data = res.data;
                this.model.hourEfficiency.value = data.hourEfficiency;
                this.model.dayEfficiency.value = data.dayEfficiency;
                this.model.electroConsumption.value = data.electroConsumption;
                this.model.waterConsumption.value = data.waterConsumption;
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const passportModel = new PassportModel()

