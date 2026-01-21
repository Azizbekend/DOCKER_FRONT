import { getOneData, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { PassportModelIndicatorType, PassportModelType } from "@/packages/entities/object/type";
import { makeAutoObservable } from "mobx";

class PassportModel {

    isLodaded = true

    objectData: PassportModelType = {
        id: 0,
        name: "",
        latitude: "",
        longitude: "",
        adress: "",
        operatingOrganization: "",
        customerName: "",
        generalContractorName: "",
        projectEfficiency: 0,
        fileId: 0,
    }

    itemObjectData: { name: string, value: string | number, coord?: string | null }[] = []


    model: PassportModelIndicatorType = {
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


        try {

            const [data, shapshiChars] = await Promise.all([
                getOneData({ id: id }),
                getTechnicalCharsShapshi()
            ])

            localStorage.setItem("objectData", JSON.stringify(data.data))

            this.objectData = data.data

            this.itemObjectData.push({ name: "Адрес", value: this.objectData.adress, coord: (this.objectData.latitude + " " + this.objectData.longitude) })
            this.itemObjectData.push({ name: "Заказчик", value: this.objectData.customerName, })
            this.itemObjectData.push({ name: "Эксплуатирующая организация", value: this.objectData.operatingOrganization, })
            this.itemObjectData.push({ name: "Генеральныйподрядчик", value: this.objectData.generalContractorName, })

            this.model.hourEfficiency.value = shapshiChars.data.hourEfficiency + " м³/ч";
            this.model.dayEfficiency.value = shapshiChars.data.dayEfficiency + " м³/сут";
            this.model.electroConsumption.value = shapshiChars.data.electroConsumption + " кВт/ч";
            this.model.waterConsumption.value = shapshiChars.data.waterConsumption + " м³";

        } catch (error) {
            console.log(error)
        } finally {
            this.isLodaded = false
        }
    }
}

export const passportModel = new PassportModel()

