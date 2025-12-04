import { Meta } from "@/app/api/meta";
import { Plant } from "@/entities/plants/types";
import { WaterCompany } from "@/entities/water-company/types";
import { makeAutoObservable } from "mobx";

export class WaterCompanyModel {
    meta: Meta = Meta.LOADING;
    plants: Plant[] = [];
    isEditing: boolean = false;
    showDelete: boolean = false;

    company: WaterCompany = {
        id: 0,
        address: "",
        isDeleted: false,
        inn: "",
        kpp: "",
        ogrn: "",
        isTransporter: false,
        municipality: {
            id: 0,
            name: "",
        },
        name: "",
        operator: {
            login: "",
            email: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            phone: "",
        },
        municipalityName: "municipalityName"
    }
    editableModel: WaterCompany = JSON.parse(JSON.stringify(this.company));

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    get municipalities() {
        return this.company.municipality;
    }

    setShowDelete(value: boolean) {
        this.showDelete = value;
    }

    setName(value: string) {
        this.company.name = value;
    }

    setOperatorFirstName(value: string) {
        this.company.operator.firstName = value;
    }

    setOperatorLastName(value: string) {
        this.company.operator.lastName = value;
    }

    setOperatorPatronymic(value: string) {
        this.company.operator.patronymic = value;
    }

    setInn(value: string) {
        this.company.inn = value;
    }

    setOgrn(value: string) {
        this.company.ogrn = value;
    }

    setKpp(value: string) {
        this.company.kpp = value;
    }

    setLogin(value: string) {
        this.company.operator.login = value;
    }

    setOperatorPhone(value: string) {
        this.company.operator.phone = value;
    }

    setOperatorEmail(value: string) {
        this.company.email = value;
    }

    setAddress(value: string) {
        this.company.address = value;
    }

    setMunicipality(value: number) {
        this.company.municipality.id = value;
    }



    public async init(company: WaterCompany) {
        this.company = company
        this.meta = Meta.SUCCESS;
    }


    deleteCompany() {
        alert("Удалено")
    }

    setEditing(edit: boolean) {
        this.isEditing = edit;
        if (edit) {
            this.editableModel = JSON.parse(JSON.stringify(this.company));
        }
    }

    save() {
        this.company = { ...this.editableModel };
    }



}

const waterCompanyModel = new WaterCompanyModel();
export default waterCompanyModel;

