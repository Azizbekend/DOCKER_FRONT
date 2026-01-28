import { getCompanyByInn } from "@/packages/entities/company/api";
import { CompanyType } from "@/packages/entities/company/type";
import { attachCompany } from "@/packages/entities/participants/api";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class AddCompanyModel {

    innValue = ''
    roleCompany = ''
    stageModal: "form" | "xz" = "form"
    loaderSearch = false
    openFullData = false

    model: CompanyType = {
        id: 0,
        companyName: "",
        shortName: "",
        kpp: 0,
        juridicalAddress: "",
        directorName: "",
        phoneNumber: 0,
        ogrn: 0,
        inn: 0,
        factAdress: ""
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setInnValue(value: string) {
        this.innValue = value
    }

    setRoleCompany(value: string) {
        this.roleCompany = value
    }

    setOpenFullData(value: boolean) {
        this.openFullData = value
    }

    setStageModal(value: "form" | "xz") {
        this.stageModal = value
    }

    reset() {
        this.innValue = ''
        this.roleCompany = ''
        this.stageModal = "form"
        this.loaderSearch = false
        this.openFullData = false

        this.model = {
            id: 0,
            companyName: "",
            shortName: "",
            kpp: 0,
            juridicalAddress: "",
            directorName: "",
            phoneNumber: 0,
            ogrn: 0,
            inn: 0,
            factAdress: ""
        }
    }

    async onSearchCompany() {
        this.loaderSearch = true

        await getCompanyByInn({ inn: this.innValue })
            .then((res) => {
                this.model = res.data
            })
            .catch((error) => console.log(error.data))
            .finally(() => this.loaderSearch = false)
    }

    async addCompany(id: number, pushParticipants: (value: any) => void) {
        await attachCompany({
            objectId: id,
            companyId: this.model.id,
            companyName: this.model.companyName,
            companyRole: this.roleCompany,
        }).then((res) => {
            pushParticipants({
                company: {
                    companyId: this.model.id,
                    companyName: this.model.companyName,
                    companyRole: this.roleCompany,
                    id: res.data.id,
                    objectId: id,
                },
                users: []
            })
            toast.success("Компания добавлена", { progressStyle: { background: "green" } })
        }).catch((error) => {
            console.log(error)
            toast.error("Ошибка при добавлении", { progressStyle: { background: "red" } })
        })
    }
}

export const addCompanyModel = new AddCompanyModel()