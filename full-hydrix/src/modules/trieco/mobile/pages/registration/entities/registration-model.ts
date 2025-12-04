import { makeAutoObservable } from "mobx";
import { registrate, RegistrationRequest } from "../services/registration-service";
import { toast } from "react-toastify";

export class RegistrationModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this._model = {
            email: "",
            login: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            adress: "",
            repeatPassword: "",
            roleId: 1,
            companyName: ""
        }
    }

    private _model: RegistrationRequest;

    get model() {
        return this._model;
    }

    get checkPassword() {
        return this._model.password === this._model.repeatPassword;
    }

    changeEmail(value: string) {
        this._model.email = value;
    }

    changeFirstName(value: string) {
        this._model.firstName = value;
    }

    changeLastName(value: string) {
        this._model.lastName = value;
    }

    changePassword(value: string) {
        this._model.password = value;
    }

    changePhone(value: string) {
        this._model.phoneNumber = value;
    }

    changeRepeatPassword(value: string) {
        this._model.repeatPassword = value;
    }

    changeRole(value: number) {
        this._model.roleId = value;
    }

    changeLogin(value: string) {
        this._model.login = value;
    }

    changeCompanyName(value: string) {
        this._model.companyName = value;
    }

    canRegistrate() {
        return (
            ((this._model.firstName != "" &&
            this._model.lastName != "" && this._model.roleId != 5) || (this._model.roleId === 5 && this._model.companyName != "")) &&
            this._model.email != "" &&
            this._model.login != "" &&
            this._model.password != "" &&
            this.checkPassword
        )

    }

    registrate(onRegistrate?: (id: number) => void) {
        if (this._model.companyName) {
            this._model.lastName = ""
            this._model.firstName = this._model.companyName;
        }
        registrate(this._model)
            .then(x => {
                onRegistrate && onRegistrate(Number(x.data['id']))
            }).catch(() => {
                toast("Пользователь с такими данным уже существует", {progressStyle: {background: "red"}})
            })
    }
}

const registrationModel = new RegistrationModel();

export default registrationModel;