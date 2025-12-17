import { getSchemaObjects } from "@/entities/hardware/api";
import { SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { ProgressBar } from "node_modules/react-toastify/dist/components";
import { toast } from "react-toastify";

class SchemeModel {

    model: SchemaObjectType[] = []

    focusHardware: number = 0
    focusSchemeObject: number = 0
    focusSchemeObjectData: SchemaObjectType | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
    }

    setFocusHardware(id: number) {
        if (this.focusSchemeObject != 0) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        }
        this.focusHardware = id
    }

    setFocusSchemeObject(id: number, tabScheme: number) {
        if (this.focusSchemeObject == id) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        } else {
            this.focusSchemeObjectData = this.model[this.model.findIndex(item => item.id === id)]
            this.focusSchemeObject = id
        }
    }


    switchColo: boolean = false;
    handdleSwitchImage() {
        this.switchColo = !this.switchColo
        toast.success("Авария устранена", { progressStyle: { background: "green" } })
    }


    async init(id: number) {
        await getSchemaObjects({ id: id }).then((res) => {
            this.model = res.data
            console.log(res.data)
        })

        await getSchemaObjects({ id: 7 }).then((res) => {
            this.model.push(...res.data)
        })
    }
}


export const schemeModel = new SchemeModel();