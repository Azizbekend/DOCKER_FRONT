import { getInfoNodeInfos, getSchemaObjects, statusCheck } from "@/entities/hardware/api";
import { SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { SchemaCardInterface } from "@/entities/sensor/type";
import { ApiSchemaCardAll } from "@/entities/sensor/api";

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
        // await getInfoNodeInfos({ listId: this.idskaSensores })
        //     .then(res => {
        //         for (const key in res.data.indecatesGroup) {
        //             this.schemaSensoreData = this.schemaSensoreData.map(item => {

        //                 if (item.id == key) {
        //                     return { ...item, value: res.data.indecatesGroup[key] };
        //                 }

        //                 return item;
        //             });
        //         }
        //     })
    }


    checkIncidents() {
        const index = this.idska[Math.floor(Math.random() * this.idska.length)];
        const color = Math.floor(Math.random() * 4);

        this.model[index].focusFileId = color == 0 ? this.model[index].fileId : color == 1 ? (this.model[index]?.greenFileId || 169) : (this.model[index]?.redFileId || 48)



        // await getSchemaObjects({ id: 8 }).then((res) => {

        // const data: SchemaObjectType[] = JSON.parse(JSON.stringify(this.model));

        // for (let key of res.data) {
        //     if (res.data[key] == false) {
        //         const index = data.findIndex(item => item.id === key);
        //     }
        // }
        // })
    }
}


export const schemeModel = new SchemeModel();