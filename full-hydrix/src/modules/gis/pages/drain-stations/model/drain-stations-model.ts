import { Meta } from "@/app/api/meta";
import { getWaterCompanyPlants } from "@/entities/plants/api";
import { Plant } from "@/entities/plants/types";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";

class PlantsListModel {

  plants: Plant[] = [];

  meta: Meta = Meta.SUCCESS;
  showInfo: boolean = false;


  focusedPlant: Plant | null = null;
  typeModal: string = "add";

  showModalInfo: boolean = false;
  showPlantModal: boolean = false;
  showPlantDelete: boolean = false;
  selectPlantForDelete: number = 0;


  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setShowPlantDelete(value: boolean) {
    this.showPlantDelete = value;
  }

  setTypeModal(value: string) {
    this.typeModal = value;
  }

  setShowInfo(value: boolean) {
    this.showInfo = value
  }

  setShowModalInfo(value: boolean) {
    this.showModalInfo = value
  }

  get list() {
    return this.plants;
  }

  push(plant?: Plant) {
    if (!plant) return;
    this.plants.push(plant);
  }


  setSelectPlantForDelete(id: number) {
    this.selectPlantForDelete = id;
  }

  async deletePlant() {
    try {
      // const response = await instance.delete(PlantRoutes.Delete, {
      //   params: { id: this.selectPlantForDelete },
      // });
      toast.done("Станция удалена успешно");
      runInAction(() => {
        const ind = this.plants.findIndex((x) => x.id === this.selectPlantForDelete);
        if (ind !== -1) {
          this.plants.splice(ind, 1);
        } else {
          console.error(`Станция с таким ID ${this.selectPlantForDelete} не найдена.`);
        }
      });
    } catch (error) {
      console.error("Возникла ошибка во время удаления:", error);
    }
  }

  updatePlant(updatedPlant: Plant) {
    if (!updatedPlant) return;
    runInAction(() => {
      const ind = this.plants.findIndex((x) => x.id === updatedPlant.id);
      if (ind !== -1) {
        this.plants[ind] = updatedPlant;
        this.plants[ind].municipalities = updatedPlant.municipalities;
      } else {
        console.error(`Станция с ID ${updatedPlant.id} не найдена.`);
      }
    });
  }

  async init(companyId: number) {
    const response = await getWaterCompanyPlants({ WaterCompanyId: companyId });

    runInAction(() => {
      this.plants = response.data
        .filter((x: any) => x.isArchived === false)
        .sort((a: any, b: any) => a.id - b.id);
    });
  }
}

export const plantsListModel = new PlantsListModel();