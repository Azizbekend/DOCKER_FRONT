import { Meta } from "@/app/cores/core-gis/network/meta";
import { getWaterCompany } from "@/app/cores/core-gis/network/water-company/type";
import { getWaterCompanyPlants } from "@/entities/plants/api";
import { WaterCompany } from "@/entities/water-company/types";
import { makeAutoObservable } from "mobx";
export class WaterCompanyModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this._company = {
            address: "",
            id: 0,
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
                phoneNumber: "",
            },
            municipalityName: ""
        }
        this.editableModel = JSON.parse(JSON.stringify(this._company));
        this.isEditing = false;
    }

    private _meta: Meta = Meta.LOADING;
    private _company: WaterCompany;
    private _plants: Plant[] = [];

    public editableModel: WaterCompany;
    public isEditing: boolean;

    get meta() {
        return this._meta;
    }

    get company() {
        return this._company;
    }

    get plants() {
        return this._plants;
    }

    public async init(companyId: number) {
        const companyResponse = await getWaterCompany({ id: companyId });
        this._company = companyResponse.data;

        const plantsResponse = await getWaterCompanyPlants({ WaterCompanyId: companyId });
        this._plants = plantsResponse.data.filter((x: any) => !x.isArchived);

        this._meta = Meta.SUCCESS;
    }

    setEditing(edit: boolean) {
        this.isEditing = edit;
        if (edit) {
            this.editableModel = JSON.parse(JSON.stringify(this._company));
        }
    }

    save() {
        this._company = { ...this.editableModel };
    }
}

const waterCompanyModel = new WaterCompanyModel();
export default waterCompanyModel;

