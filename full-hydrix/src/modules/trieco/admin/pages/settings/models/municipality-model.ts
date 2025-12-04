import { getAllMunicipalities } from "@/entities/municipality/api";
import { Municipality } from "@/entities/municipality/type";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

export class MunicipalityModel {
  private _municipalities: Municipality[] = [];
  private _loading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get municipalites() {
    return this._municipalities;
  }

  get loading() {
    return this._loading;
  }

  async init() {
    this._loading = true;
    try {
      const response = await getAllMunicipalities();
      runInAction(() => {
        this._municipalities = response.data;
        this._loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this._loading = false;
      });
      toast("Не удалось загрузить обслуживаемые территории", {
        progressStyle: { background: "red" },
      });
    }
  }

  getMunicipalitiesById(id: number): Municipality | undefined {
    return this._municipalities.find((municipality) => municipality.id === id);
  }

  addMunicipality(municipality: Municipality) {
    this._municipalities.push(municipality);
  }

  removeMunicipality(id: number) {
    this._municipalities = this._municipalities.filter(
      (municipality) => municipality.id !== id
    );
  }
}

export const municipalityModel = new MunicipalityModel();
