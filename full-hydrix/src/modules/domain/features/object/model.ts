import { objectDocumentActive } from "@/packages/entities/file-storage/api";
import { getOneData, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { ObjectStages } from "@/packages/entities/object/config";
import { PassportDataType, PassportStatisticSedimentListType, PassportStatisticReagentListType, PassportTechnicalSpecificationsType } from "@/packages/entities/object/type";
import { makeAutoObservable } from "mobx";

class PassportModel {

    isLodaded = true

    docs: any[] = []

    objectData: PassportDataType = {
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
        objectDiscription: "",
        commissioningDate: null,
        hourEfficiency: 0,
        powerConsump: 0,
        waterConsump: 0,
        wetExcessSludge: 0,
        dryExcessSludge: 0,
        trash: 0,
        peskoPulpa: 0,
        aquaPack30: 0,
        aquaFlock650: 0,
        ufoAcid: 0,
        mbrAcid: 0,
        gypochloride: 0,
        objectDiscriptionFileId: 0,
        stage: ObjectStages.Null,
    }

    itemObjectData: { name: string, value: string | number, coord?: string | null }[] = []


    technicalSpecifications: PassportTechnicalSpecificationsType = {
        projectEfficiency: {
            name: "Проектная производительность",
            projectConsumption: 0,
            unit: "м³/сут",
        },
        hourEfficiency: {
            name: "Часовая производительность",
            projectConsumption: 0,
            unit: "м³/ч",
        },

        electroConsumption: {
            // 1.Расход электроэнергии (значение приходят в Вт, нужно будет делить на 1000 и выводить в кВт) - Сумма  
            name: "Электроэнергия",
            projectConsumption: 0,
            unit: "кВт/ч",

            plcNodes: ['ns=4;s=|var|PLC210 OPC-UA.Application.GVL98.meter98_pwr_total', 'ns=4;s=|var|PLC210 OPC-UA.Application.GVL104.meter104_pwr_total',]
        },
        waterConsumption: {
            // 2.Водоснабжение (значение приходят в л, нужно будет делить на 1000 и выводить в м3) - Сумма 
            // Тут по 2. Водоснабжение:
            // Надо считать:
            // В 22 декабря в 6.00 запросили показание, запомнили (пришло например 500)
            // В 23 декабря в 6.00 запросили показание, запомнили (пришло например 600). Значит вывели на фронт 600-500= 100 (за 23.12.2025)
            // В 24 декабря в 6.00 (получили 720) вывели значит 720-600=120 (за 24.12.2025)

            name: "Водоснабжение",
            projectConsumption: 0,
            unit: "м³",
            plcNodes: ["ns=4;s=|var|PLC210 OPC-UA.Application.PVL.waterMeter1_counter", "ns=4;s=|var|PLC210 OPC-UA.Application.PVL.waterMeter2_counter",]
        }
    }

    reagentStatistics: PassportStatisticReagentListType = {
        aquaPack30: {
            name: "Коагулянт Аквапак 30",
            area: "Удаление фосфатов",
            projectConsumption: 0,
            unit: "кг/сут",
        },
        aquaFlock650: {
            name: "Флокулянт Аквафлок 650",
            area: "Обезвоживание осадка",
            projectConsumption: 0,
            unit: "кг/сут",
        },
        ufoAcid: {
            name: "Щавелевая кислота",
            area: "Промывка ламп УФО",
            projectConsumption: 0,
            unit: "кг/мес",
        },
        mbrAcid: {
            name: "Щавелевая кислота",
            area: "Хим.промывка МБР",
            projectConsumption: 0,
            unit: "кг/год",
        },
        gypochloride: {
            name: "Гипохлорит натрия ГОСТ 11086-76 марка А",
            area: "Хим.промывка МБР",
            projectConsumption: 0,
            unit: "кг/мес",
        },
    }

    sludgeStatistics: PassportStatisticSedimentListType = {
        wetExcessSludge: {
            name: "Избыточный активный ил (влажный)",
            area: "Аэробный стабилизатор",
            projectConsumption: 0,
            unit: "м³/мес",
        },
        dryExcessSludge: {
            name: "Избыточный активный ил (обезвоженный)",
            area: "Обезвоживатель",
            projectConsumption: 0,
            unit: "м³/мес",
        },
        trash: {
            name: "Отбросы",
            area: "Барабанное сито",
            projectConsumption: 0,
            unit: "м³/мес",
        },
        peskoPulpa: {
            name: "Пескопульпа",
            area: "Песколовка",
            projectConsumption: 0,
            unit: "м³/мес",
        },
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async init(id: number) {
        try {

            const [data, docs] = await Promise.all([
                getOneData({ id: id }),
                objectDocumentActive({ id: id }),
            ])

            this.docs = docs.data


            localStorage.setItem("objectData", JSON.stringify(data.data))
            this.objectData = data.data

            // Технические характеристики
            this.itemObjectData.push({ name: "Адрес", value: this.objectData.adress, coord: (this.objectData.latitude + " " + this.objectData.longitude) })
            this.itemObjectData.push({ name: "Заказчик", value: this.objectData.customerName, })
            this.itemObjectData.push({ name: "Эксплуатирующая организация", value: this.objectData.operatingOrganization, })
            this.itemObjectData.push({ name: "Генеральный подрядчик", value: this.objectData.generalContractorName, })

            // Технические характеристики
            console.log(this.objectData)


            this.technicalSpecifications.hourEfficiency.projectConsumption = this.objectData.hourEfficiency;
            this.technicalSpecifications.electroConsumption.projectConsumption = this.objectData.powerConsump;
            this.technicalSpecifications.projectEfficiency.projectConsumption = this.objectData.projectEfficiency;
            this.technicalSpecifications.waterConsumption.projectConsumption = this.objectData.waterConsump;

            // Статистика по реагентам
            this.reagentStatistics.aquaPack30.projectConsumption = this.objectData.aquaPack30
            this.reagentStatistics.aquaFlock650.projectConsumption = this.objectData.aquaFlock650
            this.reagentStatistics.ufoAcid.projectConsumption = this.objectData.ufoAcid
            this.reagentStatistics.mbrAcid.projectConsumption = this.objectData.mbrAcid
            this.reagentStatistics.gypochloride.projectConsumption = this.objectData.gypochloride

            // Статистика по осадкам
            this.sludgeStatistics.wetExcessSludge.projectConsumption = this.objectData.wetExcessSludge
            this.sludgeStatistics.dryExcessSludge.projectConsumption = this.objectData.dryExcessSludge
            this.sludgeStatistics.trash.projectConsumption = this.objectData.trash
            this.sludgeStatistics.peskoPulpa.projectConsumption = this.objectData.peskoPulpa

        } catch (error) {
            console.log(error)
        }

        try {
            // Статистика по осадкам
            const [shapshiChars] = await Promise.all([getTechnicalCharsShapshi()])
            this.technicalSpecifications.hourEfficiency.value = shapshiChars.data.hourEfficiency;
            this.technicalSpecifications.electroConsumption.value = shapshiChars.data.electroConsumption;
            this.technicalSpecifications.projectEfficiency.value = shapshiChars.data.dayEfficiency;
        } catch (error) {
            console.log(error)
        } finally {
            this.isLodaded = false
        }
    }



}

export const passportModel = new PassportModel()

