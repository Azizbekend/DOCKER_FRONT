import { makeAutoObservable } from "mobx";
import { RegistrationType } from "../services/registration-service";
export class RegistrationModel {
    model: RegistrationType = {
        organizationName: "",
        email: "",
        surname: "",
        name: "",
        patronymic: "",
        phone: "",
        inn: "",
        kpp: "",
        address: "",
        ogrn: "",
        municipal: ""
    }

    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setOrganizationName(value: string) {
        this.model.organizationName = value;
    }
    validOrganizationName(value: string) {
    }
    setEmail(value: string) {
        this.model.email = value;
    }
    validEmail(value: string) {
    }
    setSurname(value: string) {
        this.model.surname = value;
    }
    validSurname(value: string) {
    }
    setName(value: string) {
        this.model.name = value;
    }
    validName(value: string) {
    }
    setPatronymic(value: string) {
        this.model.patronymic = value;
    }
    validPatronymic(value: string) {
    }
    setPhone(value: string) {
        this.model.phone = value;
    }
    validPhone(value: string) {
    }
    setInn(value: string) {
        this.model.inn = value;
    }
    validInn(value: string) {
    }
    setKpp(value: string) {
        this.model.kpp = value;
    }
    validKpp(value: string) {
    }
    setAddress(value: string) {
        this.model.address = value;
    }
    validAddress(value: string) {
    }
    setOgrn(value: string) {
        this.model.ogrn = value;
    }
    validOgrn(value: string) {
    }
    setMunicipal(value: string) {
        this.model.municipal = value;
    }
    validMunicipal(value: string) {
    }

    canSubmit(): boolean {
        return (
            true
            // this.model.organizationName.trim() !== "" &&
            // this.model.email.trim() !== "" &&
            // this.model.administratorSurname.trim() !== "" &&
            // this.model.administratorFirstName.trim() !== "" &&
            // this.model.administratorPhone.trim() !== "" &&
            // this.model.inn.trim() !== "" &&
            // this.model.kpp.trim() !== "" &&
            // this.model.address.trim() !== "" &&
            // this.model.ogrn.trim() !== "" &&
            // this.model.municipalFormation.trim() !== ""
        );
    }

    async submitRegistration(onSuccess?: () => void, onError?: (error: any) => void) {
        // TODO: Реализовать работу с API
        // Здесь будет вызов API для регистрации
        // Пример:
        // try {
        //     const response = await registrationService.register(this.model);
        //     onSuccess && onSuccess();
        // } catch (error) {
        //     onError && onError(error);
        // }
    }

    reset() {
        this.model = {
            organizationName: "",
            email: "",
            surname: "",
            name: "",
            patronymic: "",
            phone: "",
            inn: "",
            kpp: "",
            address: "",
            ogrn: "",
            municipal: ""
        };
    }
}

export default new RegistrationModel();
