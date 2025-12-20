import { getSchemaObjects, statusCheck } from "@/entities/hardware/api";
import { SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class SchemeModel {

    model: SchemaObjectType[] = []

    focusHardware: number = 0
    focusSchemeObject: number = 0
    focusSchemeObjectData: SchemaObjectType | null = null
    switchColo: boolean = false;


    idska: number[] = []


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
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
            console.log(res.data)
        })
    }


    async test() {
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
    checkIncidents() {
        // await getSchemaObjects({ id: 8 }).then((res) => {

        const index = this.idska[Math.floor(Math.random() * this.idska.length)];
        const color = Math.floor(Math.random() * 4);


        this.model[index].focusFileId = color == 0 ? this.model[index].fileId : color == 1 ? (this.model[index]?.greenFileId || 169) : (this.model[index]?.redFileId || 48)

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