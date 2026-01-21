import { getOneData, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { PassportModelType } from "@/packages/entities/object/type";
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

    async init(id: number) {

        const [data, shapshiChars] = await Promise.all([
            getOneData({ id: id }),
            getTechnicalCharsShapshi()
        ])

        localStorage.setItem("objectData", JSON.stringify(data.data))

        this.model.hourEfficiency.value = shapshiChars.data.hourEfficiency + " м³/ч";
        this.model.dayEfficiency.value = shapshiChars.data.dayEfficiency + " м³/сут";
        this.model.electroConsumption.value = shapshiChars.data.electroConsumption + " кВт/ч";
        this.model.waterConsumption.value = shapshiChars.data.waterConsumption + " м³";
    }
}

export const passportModel = new PassportModel()

