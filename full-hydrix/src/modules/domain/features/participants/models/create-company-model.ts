import { createCompany, TEST } from "@/packages/entities/company/api";
import { CompanyCreate } from "@/packages/entities/company/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CreateCompanyModel {

    model: CompanyCreate = {
        companyName: "",
        shortName: "",
        kpp: "",
        juridicalAddress: "",
        directorName: "",
        phoneNumber: "",
        ogrn: "",
        inn: "",
        factAdress: "",
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setCompanyName(value: string) {
        this.model.companyName = value
    }

    setShortName(value: string) {
        this.model.shortName = value
    }

    setKpp(value: string) {
        this.model.kpp = value
    }

    setJuridicalAddress(value: string) {
        this.model.juridicalAddress = value
    }

    setDirectorName(value: string) {
        this.model.directorName = value
    }

    setPhoneNumber(value: string) {
        this.model.phoneNumber = value
    }

    setOgrn(value: string) {
        this.model.ogrn = value
    }

    setInn(value: string) {
        this.model.inn = value
    }

    setFactAdress(value: string) {
        this.model.factAdress = value
    }

    reset() {
        this.model = {
            companyName: "",
            shortName: "",
            kpp: "",
            juridicalAddress: "",
            directorName: "",
            phoneNumber: "",
            ogrn: "",
            inn: "",
            factAdress: "",
        }
    }

    isValid() {
        return (
            this.model.companyName.length > 0 &&
            this.model.shortName.length > 0 &&
            this.model.kpp.length > 0 &&
            this.model.juridicalAddress.length > 0 &&
            this.model.directorName.length > 0 &&
            this.model.phoneNumber.length > 0 &&
            this.model.ogrn.length > 0 &&
            this.model.inn.length > 0 &&
            this.model.factAdress.length > 0
        )
    }

    async create(onAction: () => void) {
        if (!this.isValid()) {
            toast.error("Заполните все поля", { progressStyle: { background: "red" } })
            return
        }



        await createCompany(this.model)
            .then(() => {
                onAction()
                this.reset()
                toast.success("Компания создана", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при создании", { progressStyle: { background: "red" } })
            })
    }
}

export const createCompanyModel = new CreateCompanyModel()