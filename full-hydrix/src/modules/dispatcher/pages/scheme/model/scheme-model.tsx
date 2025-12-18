import { getSchemaObjects } from "@/entities/hardware/api";
import { SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class SchemeModel {

    model: SchemaObjectType[] = []

    focusHardware: number = 0
    focusSchemeObject: number = 0
    focusSchemeObjectData: SchemaObjectType | null = null
    switchColo: boolean = false;


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
    }

    async init() {
        await getSchemaObjects({ id: 6 }).then((res) => {
            this.model = res.data
        })

        await getSchemaObjects({ id: 8 }).then((res) => {
            this.model.push(...res.data)
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
}


export const schemeModel = new SchemeModel();