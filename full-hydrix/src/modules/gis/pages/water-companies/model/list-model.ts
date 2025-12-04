import { getAllClientCompanies } from "@/entities/company/api";
import { getAllMunicipalities } from "@/entities/municipality/api";
import { Municipality } from "@/entities/municipality/type";
import { WaterCompany } from "@/entities/water-company/types";
import { makeAutoObservable, runInAction } from "mobx";

export class ListModel {

  isInit: boolean = false;

  selectedCompanyId: number = 0;
  showDeleteModal: boolean = false;

  municipalityFilterIds: number[];

  model: WaterCompany[];
  municipalities: Municipality[];



  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.model = [];

    this.municipalities = [{ id: 0, name: "string" }, { id: 1, name: "string 2" }];
    this.municipalityFilterIds = [];
  }

  setShowDeleteModal(value: boolean, selectedCompany?: number) {
    this.showDeleteModal = value;
    value && (this.selectedCompanyId = selectedCompany || 0);
  }


  get list() {
    if (this.municipalityFilterIds.length !== 0) {
      return this.model.filter(item => this.municipalityFilterIds.includes(item.municipality.id))
    }

    return this.model;
  }

  pushCompany(company: WaterCompany) {
    runInAction(() => {
      this.model.unshift(company);
      this.model = this.model.slice();
    });
  }

  public pushmunicipality(value: number, checked: boolean) {
    checked ? this.municipalityFilterIds.push(value) : this.municipalityFilterIds = this.municipalityFilterIds.filter(item => item !== value);
  }

  public async deleteCompany() {
    if (this.selectedCompanyId === 0) return;
    // await deleteCompany({ WaterCompanyId: this.selectedCompanyId });

    runInAction(() => {
      this.model.splice(
        this.model.findIndex((x) => x.id === this.selectedCompanyId),
        1
      );
      this.model = this.model.slice();
    });
  }

  public async init() {
    try {
      const response = await getAllClientCompanies();
      const getMunicipalities = await getAllMunicipalities();

      runInAction(() => {
        this.model = response.data;
        // this.model = response.data.filter((x: any) => x.isDeleted == false);
        // this.model.sort((a, b) => a.id - b.id);

        this.municipalities = getMunicipalities.data.map((municipality: Municipality) => ({
          id: municipality.id,
          name: municipality.name,
        }));

        this.isInit = true;
      });
    } catch (error) {
      console.error(
        "Ошибка при инициализации получения списка компаний ",
        error
      );
    }
  }
}

const listModel = new ListModel();
export default listModel;
