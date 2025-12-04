import { makeAutoObservable } from "mobx";
import { getUserById, identifyByPhone, IdentifyByPhoneRequest } from "../services/auth-service";

export class AuthByPhoneModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this._model = {
            phone: ""
        }
    }

    private _model: IdentifyByPhoneRequest;

    get model() {
        return this._model;
    }

    changePhone(value: string) {
        this._model.phone = value;
    }

    async loginByPhone(setUser: (value: any) => void) {
        identifyByPhone(this._model).then(x => {
            getUserById(x.data).then(y => {
                setUser(y.data)
            }).then(() => {
                window.location.href = "/"
                window.localStorage.setItem("refresh-token", x.data["id"])
            }
            )
        })
    }
}

const authByPhoneModel = new AuthByPhoneModel();

export default authByPhoneModel;