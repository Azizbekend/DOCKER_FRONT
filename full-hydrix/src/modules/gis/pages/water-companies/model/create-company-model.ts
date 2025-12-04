import { Municipality } from "@/entities/municipality/type";
import { CreateCompanyRequest, WaterCompany } from "@/entities/water-company/types";
import { makeAutoObservable } from "mobx";

export class CreateCompanyModel {

  model: CreateCompanyRequest = {
    name: "",
    inn: "",
    kpp: "",
    login: "",
    ogrn: "",
    operatorFirstName: "",
    operatorLastName: "",
    operatorPatronymic: "",
    operatorPhone: "",
    operatorEmail: "",
    municipalityId: 0,
    address: "",
  };

  municipality: Municipality[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canCreate() {
    return (
      this.model.name != "" &&
      this.model.municipalityId != 0 &&
      this.model.address != "" &&
      this.model.operatorEmail != "" &&
      this.model.operatorFirstName != "" &&
      this.model.operatorLastName != "" &&
      this.model.operatorPhone != "" &&
      this.model.inn != "" &&
      this.model.kpp != "" &&
      this.model.ogrn != ""
    );
  }

  get municipalities() {
    // Нужно сделать запрос, чтобы вернул всё
    return this.municipality;
  }

  changeName(value: string) {
    this.model.name = value;
  }

  changeOperatorFirstName(value: string) {
    this.model.operatorFirstName = value;
  }

  changeOperatorLastName(value: string) {
    this.model.operatorLastName = value;
  }

  changeOperatorPatronymic(value: string) {
    this.model.operatorPatronymic = value;
  }

  changeInn(value: string) {
    this.model.inn = value;
  }

  changeOgrn(value: string) {
    this.model.ogrn = value;
  }

  changeKpp(value: string) {
    this.model.kpp = value;
  }

  changeLogin(value: string) {
    this.model.login = value;
  }

  changeOperatorPhone(value: string) {
    this.model.operatorPhone = value;
  }

  changeOperatorEmail(value: string) {
    this.model.operatorEmail = value;
  }

  changeAddress(value: string) {
    this.model.address = value;
  }

  changeMunicipality(value: number) {
    this.model.municipalityId = value;
  }

  createCompany(pushCompany?: (company: WaterCompany) => void) {
    // createCompany(this.model).then((x) => {
    pushCompany &&
      pushCompany({
        // id: x.data.id,
        id: 0,
        address: this.model.address,
        isDeleted: false,
        isTransporter: false,
        inn: this.model.inn,
        kpp: this.model.kpp,
        ogrn: this.model.ogrn,
        municipality: this.municipality.find(
          (item) => item.id === this.model.municipalityId
        )!,
        name: this.model.name,
        operator: {
          login: this.model.login,
          email: this.model.operatorEmail,
          firstName: this.model.operatorFirstName,
          lastName: this.model.operatorLastName,
          patronymic: this.model.operatorPatronymic,
          phone: this.model.operatorPhone,
        },
        municipalityName: this.municipality.find(
          (item) => item.id === this.model.municipalityId
        )?.name,
      });
    // });
  }

  init() {
    // getMunicipalities().then((x) => {
    // this.municipality = x.data;
    // });

    this.municipality = [
      {
        id: 1,
        name: "Казань",
      },
      {
        id: 1,
        name: "Москва",
      },
      {
        id: 2,
        name: "Санкт-Петербург",
      },
    ];
  }
}

const createCompanyModel = new CreateCompanyModel();
export default createCompanyModel;
