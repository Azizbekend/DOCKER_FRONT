import { ClientCompany } from "@/entities/company/type";
import { makeAutoObservable } from "mobx";

export class CreateCompaniesModel {

    model: {
        company: ClientCompany,
        address: string,
        fio: string,
        contract: string,
    } = {
            company: {
                waterCompanyName: "",
                companyName: "",
                contractId: 0,
                municipalityName: "",
            },
            address: "",
            fio: "",
            contract: "",
        }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    setAddress(value: string) {
        this.model.address = value
    }

    setFio(value: string) {
        this.model.fio = value
    }

    setWaterCompanyName(value: string) {
        this.model.company.waterCompanyName = value
    }

    setCompanyName(value: string) {
        this.model.company.companyName = value
    }

    setMunicipalityName(value: string) {
        this.model.company.municipalityName = value
    }
    setContract(value: string) {
        this.model.contract = value
    }

    get canSave() {
        if (
            this.model.address &&
            this.model.fio &&
            this.model.company.waterCompanyName &&
            this.model.company.companyName &&
            this.model.company.municipalityName &&
            this.model.contract) {
            return false
        } else {
            return true
        }
    }

    clear() {
        this.model = {
            company: {
                waterCompanyName: "",
                companyName: "",
                contractId: 0,
                municipalityName: "",
            },
            address: "",
            contract: "",
            fio: "",
        }
    }

    store() { }

}

export const createCompaniesModel = new CreateCompaniesModel()