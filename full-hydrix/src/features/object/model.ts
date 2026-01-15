import { getTechnicalCharsShapshi } from "@/entities/object/api";
import { PassportModelType } from "@/entities/object/type";
import { makeAutoObservable } from "mobx";

class PassportModel {

    model: PassportModelType = {
        designPerformance: {
            name: "Проектная производительность",
            value: "250 м³/сут",
        },
        hourEfficiency: {
            name: "Часовая производительность",
            value: "0 м³/ч",
        },
        dayEfficiency: {
            name: "Среднесуточная производительность",
            value: "0 м³/сут",
        },
        electroConsumption: {
            name: "Расход электроэнергии",
            value: "0 кВт/ч",
        },
        waterConsumption: {
            name: "Водоснабжение",
            value: "0 м³",
        },
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init() {
        await getTechnicalCharsShapshi()
            .then((res) => {
                const data = res.data;
                this.model.hourEfficiency.value = data.hourEfficiency + " м³/ч";
                this.model.dayEfficiency.value = data.dayEfficiency + " м³/сут";
                this.model.electroConsumption.value = data.electroConsumption + " кВт/ч";
                this.model.waterConsumption.value = data.waterConsumption + " м³";
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const passportModel = new PassportModel()

