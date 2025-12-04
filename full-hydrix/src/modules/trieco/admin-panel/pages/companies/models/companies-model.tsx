import { makeAutoObservable } from "mobx";
import { DeleteUser, GetAllUsers, User, UserPasswordRecovery } from "../services/companies-service";
import { toast } from "react-toastify";

export class CompaniesModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this._model = [];
        this._roles = [];
        this.searchValue = "";
    }

    private _model: User[];
    private filteredModel: User[] = [];
    public searchValue: string;
    private _roles: number[]

    get model() {


        if (this.searchValue) {
            if (this._roles.length === 0) return this.getSearch(this._model)
            return this.getFilteredModel(this.getSearch(this._model))
        }

        if (this._roles.length > 0) {
            return this.getFilteredModel(this._model)
        }

        return this.searchValue.length ? this.getSearch(this._model) : this._model;
    }

    getSearch(model: User[]) {
        return model.filter(x => `${x.firstName} ${x.lastName} ${x.patronymic} ${x.email} ${x.phoneNumber} `.toLowerCase().includes(this.searchValue.toLowerCase()))
    }

    get roles() {
        return this._roles;
    }

    getFilteredModel(model: User[]) {
        return model.filter(item => this._roles.includes(item.roleId));
    }

    public pushRoles(value: number, checked: boolean) {
        checked ? this._roles.push(value) : this._roles = this._roles.filter(item => item !== value);
    }

    public search(value: string) {
        this.searchValue = value;
    }

    public async init() {
        try {
            const response = await GetAllUsers();
            this._model = response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    async deleteUser(id: number, close?: any) {
        await DeleteUser({ UserId: id })
            .then(() => {
                this._model = this._model.filter(item => item.id !== id);
                close && close(false);
            })
            .catch((error) => { console.error("Error deleting user:", error); });
    }

    async passwordRecovery(email: string) {
        await UserPasswordRecovery({ Email: email })
            .then(() => {
                toast("Пароль отправлен", { progressStyle: { background: "green" } });
            })
            .catch((error) => {
                console.log("Error deleting user:", error);
                toast("Ошибка", { progressStyle: { background: "red" } });
            });
    }
}

const companiesModel = new CompaniesModel();
export default companiesModel;