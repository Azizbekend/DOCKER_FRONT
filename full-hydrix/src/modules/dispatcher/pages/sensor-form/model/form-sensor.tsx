import { getAllHardware } from "@/packages/entities/hardware/api"
import { getCommandAllInfo, schemaAll } from "@/packages/entities/hardware/api-general"
import { ApiSchemaCardCreate } from "@/packages/entities/sensor/api"
import { SchemaCardInterface } from "@/packages/entities/sensor/type"
import { SeletectItemInterface } from "@/packages/shared-ui/Selector/type"
import { makeAutoObservable } from "mobx"
import { toast } from "react-toastify"

class SensoreModel {

    model: SchemaCardInterface = {
        top: "",
        left: "",
        nodeInfoId: 0,
        schemeId: 0,
    }

    _listSchemes: SeletectItemInterface[] = []
    _listHardwares: SeletectItemInterface[] = []
    _listNodes: SeletectItemInterface[] = []

    isLoading: boolean = true
    isNodeLoading: boolean = true
    schemaName: string = "";
    hardwareName: string = "";
    nodeName: string = "";


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get listSchemesTest() {
        return this._listSchemes;
    }

    get listHardwares() {
        return this._listHardwares;
    }

    get listNodes() {
        return this._listNodes;
    }

    setTop(value: string) {
        this.model.top = value
    }

    setLeft(value: string) {
        this.model.left = value
    }

    setSchemeId({ value, title }: SeletectItemInterface) {
        this.model.schemeId = Number(value)
        this.schemaName = title;
    }

    async setHardware({ value, title }: SeletectItemInterface) {
        this.isNodeLoading = true
        this.hardwareName = title

        try {
            const id = Number(value)

            const [commandsInfo] = await Promise.all([getCommandAllInfo({ id })])
            let data = commandsInfo.data;

            data.map((item) => {
                this._listNodes.push({
                    value: item.id,
                    title: item.name
                })
            })

        }
        catch (err) {
            console.log(err)
        }
        finally {
            this.isNodeLoading = false
        }
    }

    setNodeInfoId({ value, title }: SeletectItemInterface) {
        this.model.nodeInfoId = Number(value)
        this.nodeName = title
    }

    async create() {
        await ApiSchemaCardCreate({
            top: this.model.top,
            left: this.model.left,
            nodeInfoId: this.model.nodeInfoId,
            schemeId: this.model.schemeId,
        })
            .then((res) => {
                toast.success("Данные обновились", { progressStyle: { background: "green" } })
            })
            .catch((err) => { console.log(err) })
    }

    async initFormData() {
        this.isLoading = true

        try {
            const [listSchemesData, allHardwareData] = await Promise.all([schemaAll({ id: 14 }), getAllHardware()])

            this._listSchemes = []
            listSchemesData.data.map((item) => {
                this._listSchemes.push({
                    value: item.id,
                    title: item.name
                })
            })

            allHardwareData.data.map((item) => {
                this._listHardwares.push({
                    value: item.id,
                    title: item.name
                })
            })
        }
        catch (err) {
            console.log(err)
        }
        finally {
            this.isLoading = false
        }
    }
}

export const sensoreModel = new SensoreModel()