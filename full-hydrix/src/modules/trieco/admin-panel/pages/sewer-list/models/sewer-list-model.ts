import { makeAutoObservable } from "mobx";
import { getAllSewers, getSewersByCompanyId, Sewer } from "../services/sewers";

export class SewerListModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._model = [];
    this._searchedModel = this._model;
    this._tanks = [];
  }

  private _model: Sewer[];
  private _searchedModel: Sewer[];
  searchValue = "";
  public isSearch: boolean = false;

  public isFilter: boolean = false;
  public filteredModel: Sewer[] = [];
  private _tanks: number[] = [];

  getFilteredModel(model: Sewer[]) {
    return this._tanks.length === 0
      ? model
      : model.filter((item) => this._tanks.includes(item.tankVolume));
  }

  get model() {
    return this.getFilteredModel(this._model);
  }

  get searchedModel() {
    return this.getFilteredModel(this._searchedModel);
  }

  get tanks() {
    return this._tanks;
  }
  
  public search(value: string) {
    this.searchValue = value;
    this.isSearch = value != "";
    this._searchedModel = this._model.filter((x) =>
      `${x.firstName} ${x.lastName} ${x.sewerNumberPlate} ${x.companyName} `
        .toLowerCase()
        .includes(value.toLowerCase())
    );
  }

  public filterByType(value: string) {
    this.isSearch = true;
    this._searchedModel = this._model.filter((x) => {
      if (x.sewerBusinessType === value) return x;
    });
  }

  public pushTank(value: number, checked: boolean) {
    checked
      ? this._tanks.push(value)
      : (this._tanks = this._tanks.filter((item) => item !== value));
  }

  public async init() {
    getAllSewers().then((x) => {
      this._model = x.data;
    });
  }

  public pushSewer(sewer: Sewer) {
    this._model.push(sewer);
    this._model = this._model.slice();
  }
}

const sewerListModel = new SewerListModel();
export default sewerListModel;
