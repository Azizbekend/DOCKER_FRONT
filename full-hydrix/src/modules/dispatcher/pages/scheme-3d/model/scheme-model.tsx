import { getInfoHardware } from "@/entities/hardware/api";
import { ModelHardwareOneInterface } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";

class SchemeModel {

    model: ModelHardwareOneInterface = {
        id: 0,
        name: "",
        developerName: "",
        supplierName: "",
        photoName: "",
        position: "",
        controlBlockId: 0,
        controlBlock: {
            id: 0,
            name: "",
            plcIpAdress: "",
            staticObjectInfoId: 0,
        }
    };

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(id: number) {
        await getInfoHardware({ id: id }).then((res) => {
            this.model = res.data[0]
            console.log(res.data[0])
        })
    }

}