import { makeAutoObservable } from "mobx";
import { CompanyRegistrateRequest, createClientCompany, createCompany, registrate, RegistrationRequest } from "../services/users-service";
import { toast } from "react-toastify";
import { emailConfirm } from "@/app/cores/core-trieco/network/user/user";
import { Role } from "@/app/cores/core-trieco/enums/role";
import userModel from "./users-model";
import { getFNSData } from "@/app/cores/core-trieco/network/fns/fns";


const { init } = userModel


class CreateUserModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this._model = {
            email: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            phoneNumber: "",
            roleId: Role.Client,
            password: "",
            repeatPassword: "",

            // Значения для перевозчика
            adress: "",
            companyName: "",
            companyTypeId: 1,
            directorName: "",
            inn: "",
            kpp: "",
            ogrn: "",
            shortName: "",
        }
    }

    private _model: CompanyRegistrateRequest;

    get model() {
        return this._model;
    }
    get role() {
        return this.model.roleId;
    }
    changeRole(name: number) {
        this.model.roleId = name;
        if (name === Role.Client) {
            this._model.inn = ""
            this._model.adress = ""
            this._model.companyName = ""
            this._model.directorName = ""
            this._model.kpp = ""
            this._model.ogrn = ""
            this._model.shortName = ""
        }
    }

    changeINN(value: string) {
        if (isNaN(Number(value))) return;

        this._model.inn = value;
    }
    changeOGRN(value: string) {
        if (isNaN(Number(value))) return;
        this._model.ogrn = value;
    }
    changeKPP(value: string) {
        if (isNaN(Number(value))) return;
        this._model.kpp = value;
    }
    changeCompanyName(value: string) {
        this._model.companyName = value;
    }
    changeDirectorName(value: string) {
        this._model.directorName = value;
    }
    changeShortName(value: string) {
        this._model.shortName = value;
    }
    changeAdress(value: string) {
        this._model.adress = value;
    }

    async handleEnter() {
        if (this._model.inn.length === 10) {
            const response = await getFNSData({ INN: this._model.inn })
            const data = response.data.items[0]['ЮЛ'];
            if (response.data.items.length === 0) {
                toast("Введите правильный ИНН", { progressStyle: { background: "red" } })
                return;
            }
            this._model.ogrn = data['ОГРН']
            this._model.kpp = data['КПП']
            this._model.companyName = data['НаимПолнЮЛ']
            this._model.shortName = data['НаимСокрЮЛ']
            this._model.directorName = data['Руководитель']['ФИОПолн']
            this._model.adress = data['Адрес']['АдресПолн']
        }
        else {
            toast("Введите правильный ИНН", { progressStyle: { background: "red" } })
        }
    }

    changeFirstName(value: string) {
        this._model.firstName = value;
    }

    changeLastName(value: string) {
        this._model.lastName = value
    }

    changePatronymic(value: string) {
        this._model.patronymic = value;
    }

    changeEmail(value: string) {
        this._model.email = value
    }

    changePhone(value: string) {
        this._model.phoneNumber = value;
    }

    changePassword(value: string) {
        this._model.password = value;
    }

    changeRepeatPassword(value: string) {
        this._model.repeatPassword = value;
    }

    isPasswordCorrect() {
        return this._model.password === this._model.repeatPassword
    }

    get canSave() {
        if (this.model.roleId === Role.Client) {
            return (
                this._model.email != "" && this._model.lastName != "" &&
                this._model.firstName != "" && this._model.password != "" && this._model.repeatPassword != "" &&
                this._model.repeatPassword === this._model.password
            )
        } else {
            return (
                this._model.adress != "" && this._model.companyName != "" && this._model.directorName != "" &&
                this._model.email != "" && this._model.firstName != "" && this._model.lastName != "" &&
                this._model.inn != "" && this._model.kpp != "" && this._model.ogrn != "" && this._model.shortName != "" &&
                this._model.password != "" && this._model.repeatPassword != "" && this._model.repeatPassword === this._model.password
            )
        }
    }

    checkInput(text: string, minLength?: number, maxLength?: number, char?: string): string {

        if (text.length === 0) {
            return "Поле обязательно для заполнения";
        }

        if (char && text.indexOf(char) === -1) {
            return 'Отсутствует символ "' + "@" + '"';
        }

        if (minLength && text.length < minLength) {
            return "Минимальное значение - " + minLength + " символов";
        }

        if (maxLength && text.length > maxLength) {
            return "Максимальное значение - " + maxLength + " символов";
        }

        return "";
    }

    ClearModel() {
        this._model = {
            email: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            phoneNumber: "",
            roleId: Role.Client,
            password: "",
            repeatPassword: "",

            // Значения для перевозчика
            adress: "",
            companyName: "",
            companyTypeId: 1,
            directorName: "",
            inn: "",
            kpp: "",
            ogrn: "",
            shortName: "",
        }
    }

    save(modalClose: (modal: boolean) => void) {

        if (!this.canSave) return

        createCompany(this._model)
            .then(() => {
                modalClose(false);
                this.ClearModel();
                init();
                toast("Пользователь создан")
            })
            .catch((err) => {
                console.log(err)
                toast("Не удалось создать компанию")
                return;
            })
    }

    registrate(modalClose: (modal: boolean) => void) {

        if (!this.canSave) return

        if (this._model.roleId === Role.Client) {
            const data: RegistrationRequest = {
                email: this._model.email,
                password: this._model.password,
                repeatPassword: this._model.repeatPassword,
                login: this._model.email,
                firstName: this._model.firstName,
                lastName: this._model.lastName,
                phoneNumber: this._model.phoneNumber,
                adress: this._model.adress,
                roleId: this._model.roleId,
                companyName: this._model.companyName
            }

            registrate(data)
                .then(x => {
                    this.ClearModel();
                    init();
                    modalClose(false);
                }).catch(() => {
                    toast("Пользователь с такими данным уже существует", { progressStyle: { background: "red" } })
                })
        } else {

            const data: CompanyRegistrateRequest = {
                email: this._model.email,
                password: this._model.password,
                firstName: this._model.firstName,
                lastName: this._model.lastName,
                patronymic: this._model.patronymic,
                companyName: this._model.companyName,
                phoneNumber: this._model.phoneNumber,
                ogrn: this._model.ogrn,
                inn: this._model.inn,
                adress: this._model.adress,
                companyTypeId: this._model.companyTypeId,
                juridicalAddress: this._model.adress,
                directorName: this._model.directorName,
                kpp: this._model.kpp,
                shortName: this._model.shortName,
            }

            createClientCompany(data)
                .then(x => {
                    this.ClearModel();
                    init();
                    modalClose(false);
                }).catch(() => {
                    toast("Пользователь с такими данным уже существует", { progressStyle: { background: "red" } })
                })
        }
    }

}

export const createUserModel = new CreateUserModel();