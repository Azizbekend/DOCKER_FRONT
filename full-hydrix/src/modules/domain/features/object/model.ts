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


    model: PassportModelIndicatorType[] = [
        // {
        //     key: "designPerformance",
        //     name: "Проектная производительность",
        //     projectValue: "250",
        //     value: "250",
        //     unit: "м³/сут",
        // },
        {
            key: "dayEfficiency",
            // name: "Среднесуточная производительность",
            name: "Проектная производительность",
            projectValue: "250",
            value: "0",
            unit: "м³/сут",
        },
        {
            key: "hourEfficiency",
            name: "Часовая производительность",
            projectValue: "10.4",
            value: "0",
            unit: "м³/ч",
        },

        {
            key: "electroConsumption",
            name: "Электроэнергия",
            projectValue: "92.3",
            value: "0",
            unit: "кВт/ч",
            plcNodes: ['ns=4;s=|var|PLC210 OPC-UA.Application.GVL98.meter98_pwr_total', 'ns=4;s=|var|PLC210 OPC-UA.Application.GVL104.meter104_pwr_total',]
        },
        // 1.Расход электроэнергии (значение приходят в Вт, нужно будет делить на 1000 и выводить в кВт) - Сумма  

        {
            key: "waterConsumption",
            name: "Водоснабжение",
            projectValue: "0.6",
            value: "0.5",
            unit: "м³",
            plcNodes: ["ns=4;s=|var|PLC210 OPC-UA.Application.PVL.waterMeter1_counter", "ns=4;s=|var|PLC210 OPC-UA.Application.PVL.waterMeter2_counter",]
        }

        // 2.Водоснабжение (значение приходят в л, нужно будет делить на 1000 и выводить в м3) - Сумма 

        // Тут по 2. Водоснабжение:
        // Надо считать:
        // В 22 декабря в 6.00 запросили показание, запомнили (пришло например 500)
        // В 23 декабря в 6.00 запросили показание, запомнили (пришло например 600). Значит вывели на фронт 600-500= 100 (за 23.12.2025)
        // В 24 декабря в 6.00 (получили 720) вывели значит 720-600=120 (за 24.12.2025)

    ]

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: number) {
        try {

            const [data] = await Promise.all([
                getOneData({ id: id }),
            ])

            localStorage.setItem("objectData", JSON.stringify(data.data))

            this.objectData = data.data

            this.itemObjectData.push({ name: "Адрес", value: this.objectData.adress, coord: (this.objectData.latitude + " " + this.objectData.longitude) })
            this.itemObjectData.push({ name: "Заказчик", value: this.objectData.customerName, })
            this.itemObjectData.push({ name: "Эксплуатирующая организация", value: this.objectData.operatingOrganization, })
            this.itemObjectData.push({ name: "Генеральный подрядчик", value: this.objectData.generalContractorName, })

        } catch (error) {
            console.log(error)
        }

        try {

            const [shapshiChars] = await Promise.all([
                getTechnicalCharsShapshi()
            ])

            const hourEfficiencyItem = this.model.find(item => item.key === "hourEfficiency");
            if (hourEfficiencyItem) {
                hourEfficiencyItem.value = String(shapshiChars.data.hourEfficiency);
            }

            const electroConsumptionItem = this.model.find(item => item.key === "electroConsumption");
            if (electroConsumptionItem) {
                electroConsumptionItem.value = String(shapshiChars.data.electroConsumption);
            }

            const dayEfficiencyItem = this.model.find(item => item.key === "dayEfficiency");
            if (dayEfficiencyItem) {
                dayEfficiencyItem.value = String(shapshiChars.data.dayEfficiency);
            }

            // const waterConsumptionItem = this.model.find(item => item.key === "waterConsumption");
            // if (waterConsumptionItem) {
            //     waterConsumptionItem.value = String(shapshiChars.data.waterConsumption);
            // }
        } catch (error) {
            console.log(error)
        } finally {
            this.isLodaded = false
        }
    }



}

export const passportModel = new PassportModel()

