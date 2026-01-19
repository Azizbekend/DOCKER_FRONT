import { getAllHardware } from "@/packages/entities/hardware/api";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { createServiceRequests } from "@/packages/entities/service-requests/api";
import { FormCommonServiceModelType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CreateRequestModel {

    model: FormCommonServiceModelType = {
        title: "",
        discription: "",
        type: "",
        creatorId: 0,
        implementerId: 0,
        hardwareId: 0,
        objectId: 0,
    }

    hardwareList: { value: number, title: string }[] = []
    isLodaderHardwares: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    setTitle(value: string) {
        this.model.title = value
    }
    setDiscription(value: string) {
        this.model.discription = value
    }
    setType(value: string) {
        this.model.type = value
    }
    setHardwareId(value: number) {
        this.model.hardwareId = value
    }

    clear() {
        this.model = {
            title: "",
            discription: "",
            type: "",
            creatorId: 0,
            implementerId: 0,
            hardwareId: 0,
            objectId: 0,
        }
    }

    async init() {
        this.clear()

        await getAllHardware()
            .then((res) => {
                this.hardwareList = res.data.map((item: HardwareInterface) => ({
                    value: item.id,
                    title: item.name
                }))
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.isLodaderHardwares = false
            })
    }

    async create() {

        this.model.objectId = 14
        this.model.creatorId = 400
        this.model.implementerId = 400

        createServiceRequests(this.model)
            .then((res) => {
                this.clear()
                toast.success("Заявка создана", { progressStyle: { background: "green" } })
            })
            .catch((err) => {
                console.log(err)
                toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } })
            })
    }
}

export const createRequestModel = new CreateRequestModel()