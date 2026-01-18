import { ObjectCreateType } from "@/packages/entities/despetcher-test/type";
import { makeAutoObservable } from "mobx";



class CreateObjectModel {
    model: ObjectCreateType = {
        name: "",
        latitude: "qwer",
        longitude: "qwer",
        adress: "",
        operatingOrganization: "",
        customerName: "",
        generalContractorName: "",
        projectEfficiency: 0,
        fileId: 0
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setName(value: string) {
        this.model.name = value
    }
    setLatitude(value: string) {
        this.model.latitude = value
    }
    setLongitude(value: string) {
        this.model.longitude = value
    }
    setAdress(value: string) {
        this.model.adress = value
    }
    setOperatingOrganization(value: string) {
        this.model.operatingOrganization = value
    }
    setCustomerName(value: string) {
        this.model.customerName = value
    }
    setGeneralContractorName(value: string) {
        this.model.generalContractorName = value
    }
    setProjectEfficiency(value: string) {
        this.model.projectEfficiency = Number(value)
    }
    setFileId(value: number) {
        this.model.fileId = value
    }


    clear() {
        this.model = {
            name: "",
            latitude: "qwer",
            longitude: "qwer",
            adress: "",
            operatingOrganization: "",
            customerName: "",
            generalContractorName: "",
            projectEfficiency: 0,
            fileId: 0
        }
    }

    isValid() {
        return (
            this.model.name.length > 0 &&
            this.model.latitude.length > 0 &&
            this.model.longitude.length > 0 &&
            this.model.adress.length > 0 &&
            this.model.operatingOrganization.length > 0 &&
            this.model.customerName.length > 0 &&
            this.model.generalContractorName.length > 0 &&
            this.model.projectEfficiency > 0 &&
            this.model.fileId > 0
        )
    }

    createObject() {
        if (this.isValid()) {
            return this.model
        }
    }
}

export const createObjectModel = new CreateObjectModel()