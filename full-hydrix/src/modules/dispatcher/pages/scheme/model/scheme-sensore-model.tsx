import { ApiSchemaCardDelete, ApiSchemaCardUpdate } from "@/packages/entities/sensor/api"
import { SchemaCardInterface } from "@/packages/entities/sensor/type"
import { makeAutoObservable } from "mobx"
import { toast } from "react-toastify"
import { schemeModel } from "./scheme-model"

class SchemeSensoreModel {

    model: SchemaCardInterface = {
        id: 0,
        top: "",
        left: "",
        nodeInfoId: 0,
        schemeId: 0,
    }

    index: number = 0

    isLoading: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    setTop(value: string) {
        this.model.top = value
        schemeModel.schemaSensoreData[this.index].top = value
    }
    setLeft(value: string) {
        this.model.left = value
        schemeModel.schemaSensoreData[this.index].left = value
    }


    async update() {
        await ApiSchemaCardUpdate({
            id: schemeModel.schemaSensoreData[this.index].id,
            top: schemeModel.schemaSensoreData[this.index].top,
            left: schemeModel.schemaSensoreData[this.index].left,
        })
            .then((res) => {
                toast.success("Данные обновились", { progressStyle: { background: "green" } })
            })
            .catch((err) => { console.log(err) })
    }

    async deleteSensore() {
        await ApiSchemaCardDelete({ id: schemeModel.schemaSensoreData[this.index].id })
            .then((res) => {
                schemeModel.schemaSensoreData.splice(schemeModel.schemaSensoreData.findIndex(item => item.id === schemeModel.schemaSensoreData[this.index].id), 1)
                toast.success("Карточка удалена", { progressStyle: { background: "green" } })
            })
            .catch((err) => { console.log(err) })
    }

    init(id: number) {
        this.isLoading = true
        this.index = schemeModel.schemaSensoreData.findIndex(item => item.id === id)
        console.log(schemeModel.schemaSensoreData[this.index])
        this.model = schemeModel.schemaSensoreData[this.index]
        this.isLoading = false
    }
}

export const schemeSensoreModel = new SchemeSensoreModel()