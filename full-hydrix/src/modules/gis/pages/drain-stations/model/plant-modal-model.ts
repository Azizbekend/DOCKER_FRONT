import { Municipality } from "@/entities/municipality/type";
import { Plant } from "@/entities/plants/types";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

// import {
//   createPlant,
//   createPlantTatiff,
//   deletePlant,
//   Plant,
//   updatePlant,
// } from "@/core/network/plants/plant";
// import {
//   getAllMunicipalities,
//   Municipality,
// } from "@/core/network/water-company/water-company";

class EditPlantModel {
  model: Plant = {
    id: 0,
    adress: "",//----
    waterCompanyId: 0,
    companyName: "",
    firstName: "",//----
    lastName: "",//----
    patronymic: "",//----
    post: "",//----
    phone: "",//----
    email: "",//----
    latitude: 0,//----
    longitude: 0,//----
    dailyLimit: 0, //----
    isArchived: false,
    name: "", //----
    municipalitiesId: [],
  };
  modelTariff: number = 0;
  municipalities: Municipality[] = [];
  selectedMunicipalities: Municipality[] = [];
  adress: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeName(value: string) {
    this.model && (this.model.name = value);
  }

  changeLimit(value: string | number) {
    if (Number(value) || value == "") {
      this.model.dailyLimit = Number(value);
    }
  }

  changeTariff(value: string | number) {
    if (Number(value) || value == "") {
      this.modelTariff = Number(value);
    }
  }

  changeAddressText(value: string) {
    this.adress = value;
  }

  changeAddressLonLat(value: string, longitude: number, latitude: number) {
    this.model.adress = value;
    this.model.latitude = latitude;
    this.model.longitude = longitude;
  }

  changeLongitude(value: string | number) {
    if (Number(value) || value == "") {
      this.model.longitude = Number(value);
    }
  }

  changeLatitude(value: string | Number) {
    if (Number(value)) {
      this.model.latitude = Number(value);
    }
  }

  changeFirstName(value: string) {
    this.model.firstName = value;
  }

  changeLastName(value: string) {
    this.model.lastName = value;
  }

  changePatronymic(value: string) {
    this.model.patronymic = value;
  }

  changePost(value: string) {
    this.model.post = value;
  }

  changeEmail(value: string) {
    this.model.email = value;
  }

  changePhone(value: string) {
    this.model.phone = value;
  }
  clearData() {
    this.model = {
      id: 0,
      adress: "",
      waterCompanyId: 0,
      companyName: "",
      firstName: "",
      lastName: "",
      patronymic: "",
      post: "",
      phone: "",
      email: "",
      latitude: 0,
      longitude: 0,
      dailyLimit: 0,
      isArchived: false,
      name: "",
      municipalitiesId: [],
    };
    this.modelTariff = 0;
    this.municipalities = [];
    this.selectedMunicipalities = [];
    this.adress = "";
  }

  areMunicipalitiesChanged(): boolean {
    const currentMunicipalitiesIds = this.model.municipalitiesId || [];
    const selectedMunicipalitiesIds = this.selectedMunicipalities.map((m) => m.id);

    return !this.areArraysEqual(currentMunicipalitiesIds, selectedMunicipalitiesIds);
  }

  private areArraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort((a, b) => a - b);
    const sortedArr2 = [...arr2].sort((a, b) => a - b);
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  }

  isSelected(municipalityId: number): boolean {
    return this.selectedMunicipalities.some((x) => x.id === municipalityId);
  }

  selectMunicipality(municipality: Municipality) {
    if (this.isSelected(municipality.id)) {
      this.selectedMunicipalities.splice(this.selectedMunicipalities.findIndex((x) => x.id === municipality.id), 1);
      return;
    }
    this.selectedMunicipalities.push(municipality);
  }


  get canSave() {
    if (
      // this.model.name?.trim() &&
      // this.model.adress?.trim() &&
      this.model.dailyLimit > 0 &&
      this.model.firstName?.trim() &&
      this.model.lastName?.trim() &&
      this.model.email?.trim() &&
      this.model.phone?.trim() &&
      this.selectedMunicipalities.length > 0
    ) {
      return false
    } else {
      return true
    }
  }

  async edit(companyId: number, onUpdate: (plant: Plant) => void) {

    this.model.waterCompanyId = companyId;
    this.model.municipalitiesId = this.selectedMunicipalities.map((x) => x.id);
    this.model.municipalities = this.selectedMunicipalities

    try {
      // const response = await updatePlant(this.model);

      // if (response.status === 200 || response.status === 204) {
      //   await this.syncMunicipalities();

      //   if (this.modelTariff !== 0) {
      //     await createPlantTatiff({ price: this.modelTariff, treatmentId: this.model.id });
      //   }

      onUpdate(this.model);
      //   this.clearData();
      // } else {
      //   throw new Error(
      //     "Не удалось обновить сооружение, статус: " + response.status
      //   );
      // }
    } catch (error) {
      console.error("Ошибка при обновлении станции:", error);
      toast.error("Не удалось обновить сооружение", {
        progressStyle: { background: "red" },
      });
    }
  }

  async createPlant(companyId: number, onPush: (plant?: Plant) => void) {

    this.model.waterCompanyId = companyId;
    this.model.municipalitiesId = this.selectedMunicipalities.map(
      (x) => x.id
    );

    try {
      // const response = await createPlant(this.model);
      // this.model.id = response.data.id;
      // const responseTariff = await createPlantTatiff({ price: this.modelTariff, treatmentId: this.model.id });

      onPush(this.model)
      this.clearData();

    } catch (error) {
      toast.error("Не удалось создать сооружение", {
        progressStyle: { background: "red" },
      });
    }
  }

  async init(plant: Plant | null, type: string) {

    if (type === "edd" && plant != null) {
      this.model = plant;
    }

    try {
      runInAction(() => {
        for (let i = 0; i < 20; i++) this.municipalities[i] = { id: i, name: "name" + i }
      });

      // const response = await getAllMunicipalities();
      // if (!response.data.length) {
      //   toast.warning('Список районов пуст.');
      // } else {
      //   this.municipalities = response.data;
      // }
    } catch (error: any) {
      toast.error(`Ошибка при загрузке районов: ${error.message}`);
    }
  }
}

export const editPlantModel = new EditPlantModel();
