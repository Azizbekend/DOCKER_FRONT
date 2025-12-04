import { Meta } from "@/app/api/meta";
import { getAllClientCompanies } from "@/entities/company/api";
import { ClientCompany } from "@/entities/company/type";
import { makeAutoObservable } from "mobx";


export enum TypeInfoType {
    listCompanies = "Список предприятия",
    orderCompanies = "Заявки предприятий",
}


export class ClientCompaniesModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    meta: Meta = Meta.INITIAL;
    companies: ClientCompany[] = [];

    typeInfo: string = TypeInfoType.listCompanies;

    get list() {
        return this.companies;
    }

    setTypeInfo(value: string) {
        this.typeInfo = value;
    }

    async init() {
        const clientCompaniesResponse = await getAllClientCompanies();
        this.companies = clientCompaniesResponse.data;
        this.meta = Meta.SUCCESS;
    }
}

const clientCompaniesModel = new ClientCompaniesModel();
export default clientCompaniesModel;