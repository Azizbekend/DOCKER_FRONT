import { getInfoHardware, getSchemaObjects } from "@/entities/hardware/api";
import { ModelHardwareOneInterface, SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";

class SchemeModel {

    model: SchemaObjectType[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
    }

    async init(id: number) {
        await getSchemaObjects({ id: id }).then((res) => {
            this.model = res.data
        })
    }
}


export const schemeModel = new SchemeModel();