import { makeAutoObservable } from "mobx";
import { authorization, AuthRequest, authAdmin } from "../services/auth-service";
import { getUserCompany } from "@/app/cores/core-trieco/network/user/user";
import { Role } from "@/app/cores/core-trieco/enums/role";

export class AuthModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this._model = {
            password: "",
            username: ""
        }
    }

    private _model: AuthRequest;
    private _role: string = "client"
    private _isError: boolean = false;

    public get isError() {
        return this._isError;
    }

    public get model() {
        return this._model;
    }

    public get role() {
        return this._role;
    }

    get canAuth(): boolean {
        return this._model.password != "" && this._model.username != ""
    }


    setRole(value: string) {
        this._role = value;
        this._model.password = ""
        this._model.username = ""
    }

    changeLogin(value: string) {
        this._isError = false;
        this._model.username = value;
    }

    changePassword(value: string) {
        this._isError = false;
        this._model.password = value;
    }

    login(setUser: (value: any) => void) {

        if (this._role === 'client') {

            authorization(this._model).then(x => {
                setUser(x.data)

                if (x.data['roleId'] != 1 && x.data['roleId'] != 5) {
                    this._isError = true;
                    return;
                }

                window.location.href = "/"
                window.localStorage.setItem("refresh-token", x.data["id"])
            }).catch(x => {
                this._isError = true;
            })
        } else if (this._role === 'carrier') {

            authAdmin(this._model).then(async x => {
                try {
                    const companyResponse = await getUserCompany({ UserId: x.data.id })
                    window.localStorage.setItem("refresh-token", x.data['id'])
                    if (x.data['roleId'] === Role.CompanyOperator) { window.location.href = "/admin/sewers"; return; }
                    window.location.href = '/'
                } catch (error) {
                    this._isError = true;
                }
            }).catch(x => {
                if (x.status !== 200) {
                    this._isError = true
                    return;
                }
            })
        }
    }
}

const authModel = new AuthModel();
export default authModel;