import { makeAutoObservable } from "mobx";
import { CreateRequestModelType } from "../type/type";

class CreateRequestModel {


    model: CreateRequestModelType = {
        type: null,
        description: "",
        company: "",
        forCreate: "",
        fio: "",
        dateCreate: "",
        operator: "",
        phone: "",
        email: "",
    }


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setType(item: { value: string | number, title: string }) {
        this.model.type = Number(item.value)
    }
    setDescription(value: string) {
        this.model.description = value
    }
    setCompany(value: string) {
        this.model.company = value
    }
    setForCreate(value: string) {
        this.model.forCreate = value
    }
    setFio(value: string) {
        this.model.fio = value
    }
    setDateCreate(value: string) {
        this.model.dateCreate = value
    }
    setOperator(value: string) {
        this.model.operator = value
    }
    setPhone(value: string) {
        this.model.phone = value
    }
    setEmail(value: string) {
        this.model.email = value
    }

}

export const createRequestModel = new CreateRequestModel()