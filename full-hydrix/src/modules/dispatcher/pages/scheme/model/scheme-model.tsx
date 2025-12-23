import { getInfoNodeInfos, getSchemaObjects, statusCheck } from "@/entities/hardware/api";
import { SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { SchemaCardInterface } from "@/entities/sensor/type";
import { ApiSchemaCardAll } from "@/entities/sensor/api";
import { formatToTwoDecimalsSafe } from "@/shared/functions/formatToTwoDecimalsSafe";

class SchemeModel {

    model: SchemaObjectType[] = []
    schemaSensoreData: SchemaCardInterface[] = []

    focusHardware: number = 0
    focusSchemeObject: number = 0
    focusSchemeObjectData: SchemaObjectType | null = null
    switchColo: boolean = false;


    idska: number[] = []
    idskaSensores: number[] = []


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
    }

    get listSensore() {
        return this.schemaSensoreData
    }

    async init() {
        await getSchemaObjects({ id: 6 }).then((res) => {
            this.model = res.data

            res.data.forEach(element => {
                this.idska.push(element.hardwareId)
            });
        })

        await getSchemaObjects({ id: 8 }).then((res) => {
            this.model.push(...res.data)

            res.data.forEach(element => {
                this.idska.push(element.hardwareId)
            });
        })

        await ApiSchemaCardAll({ id: 6 }).then((res) => {
            this.schemaSensoreData = res.data
        })

        await ApiSchemaCardAll({ id: 8 }).then((res) => {
            this.schemaSensoreData.push(...res.data)
        })

        for (let i = 0; i < this.schemaSensoreData.length; i++) {
            this.idskaSensores.push(this.schemaSensoreData[i].nodeInfoId)
        }
    }


    async test() {
        this.statusCheckApi()
    }

    async statusCheckApi() {
        await statusCheck({ ids: this.idska })
            .then((res) => {
                console.log(res.data)
            })
    }



    setFocusHardware(id: number) {
        if (this.focusSchemeObject != 0) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        }
        this.focusHardware = id
    }

    setSchemeObjectData(id: number) {
        if (this.focusSchemeObject == id) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        } else {
            this.focusSchemeObjectData = this.model[this.model.findIndex(item => item.id === id)]
            this.focusSchemeObject = id
        }
    }

    handleSwitchImage() {
        this.switchColo = !this.switchColo
        toast.success("Авария устранена", { progressStyle: { background: "green" } })
    }


    // async 
    timesFunctions() {
        this.checkIncidents()
        this.updateSensoreData()
    }

    async updateSensoreData() {
        await getInfoNodeInfos({ listId: this.idskaSensores })
            .then(res => {
                for (const key in res.data.indecatesGroup) {
                    this.schemaSensoreData = this.schemaSensoreData.map(item => {
                        if (item.nodeInfoId.toString() == key) {
                            return { ...item, value: formatToTwoDecimalsSafe(res.data.indecatesGroup[key]) };
                        }
                        return item;
                    });
                }
            })
    }


    async checkIncidents() {
        await statusCheck({ ids: this.idska }).then((res) => {
            res.data.forEach(info => {
                for (let i = 0; i < this.model.length; i++) {
                    if (this.model[i].hardwareId == info.hardwareId) {
                        if (info.hardwareStatus == "True" && (info.incidents == "False" || info.incidents == null)) {
                            this.model[i].focusFileId = this.model[i].greenFileId
                        } else if (info.incidents == "True") {
                            this.model[i].focusFileId = this.model[i].redFileId
                        } else if (info.hardwareStatus == null || info.incidents == null) {
                            this.model[i].focusFileId = this.model[i].fileId
                        } else {
                            this.model[i].focusFileId = this.model[i].fileId
                        }
                    }
                }
            })
        })
    }
}


export const schemeModel = new SchemeModel();