import { Municipality } from "@/entities/municipality/type";
import { getAllOrders, getOrdersByIdWaterCompany } from "@/entities/order/api";
import { Order } from "@/entities/order/type";
import { makeAutoObservable } from "mobx";

export class OrderListModel {

  model: Order[] = [];

  filterByMunicipalityId: number = -1;
  volumesModel: number[] = [];
  statusModel: number[] = [];
  municipalityMap: Map<number, string> = new Map();
  filterByMunicipalityModel: Order[] = [];
  municipalitiesAll: Municipality[] = [];

  showInfo: boolean = false;


  setShowInfo(value: boolean) {
    this.showInfo = value
  }


  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get list() {

    if (this.volumesModel.length > 0 || this.statusModel.length > 0) {

      if (this.statusModel.length == 0) {
        return this.model.filter((item) => {
          return this.volumesModel.includes(item.wasteVolume)
        })
      }

      if (this.volumesModel.length == 0) {
        return this.model.filter((item) => {
          return this.statusModel.includes(item.orderStatusId)
        })
      }

      return this.model.filter((item) => {
        return this.volumesModel.includes(item.wasteVolume) && this.statusModel.includes(item.orderStatusId)
      })
    }

    return this.model;
  }

  filterByMunicipality(value: number) {
    if (value === -1) {
      this.filterByMunicipalityId = -1;
      return;
    }
    this.filterByMunicipalityModel = this.model.filter(
      (x) => x.municipalityId === value
    );
    this.filterByMunicipalityId = value;
  }

  pushVolumes(value: number, checked: boolean) {
    checked ? this.volumesModel.push(value) : (this.volumesModel = this.volumesModel.filter((item) => item !== value));
  }

  pushStatus(value: number, checked: boolean) {
    checked ? this.statusModel.push(value) : (this.statusModel = this.statusModel.filter((item) => item !== value));
  }

  async init(companyId: number | null = null) {
    try {
      const ordersPromise = companyId
        ? getOrdersByIdWaterCompany({ WaterCompanyId: companyId })
        : getAllOrders();
      const municipalitiesPromise = getAllMunicipalities();

      const [orders, municipalities] = await Promise.all([
        ordersPromise,
        municipalitiesPromise,
      ]);

      this.model = orders.data || [];
      this.municipalitiesAll = municipalities.data.map(
        (municipality: Municipality) => ({
          id: municipality.id,
          name: municipality.name,
        })
      );

      this.municipalityMap = new Map(
        municipalities.data.map((municipality: Municipality) => [
          municipality.id,
          municipality.name,
        ])
      );

      this.model = this.model.map((order) => ({
        ...order,
        municipalities: {
          id: order.municipalityId,
          name: this.municipalityMap.get(order.municipalityId) || "Неизвестно",
        },
      }));

      this.model.sort(
        (a, b) =>
          new Date(b.timeOfPublication).getTime() -
          new Date(a.timeOfPublication).getTime()
      );
    } catch (error) {
      this.model = [];
      this.municipalitiesAll = [];
    }
  }

  filterByMunicipalityModel                                                                                                                                                                               () {
    if (this.tanks.length === 0) {
      return this.filterByMunicipalityModel;
    }
    return this.filterByMunicipalityModel.filter((item) =>
      this.tanks.includes(item.wasteVolume)
    );
  }

  filterByTanksAndStatuses() {
    return this.model.filter(
      (item) =>
        (this.tanks.length === 0 || this.tanks.includes(item.wasteVolume)) &&
        (this.statuses.length === 0 ||
          (item.orderStatusId !== undefined &&
            this.statuses.includes(item.orderStatusId)))
    );
  }
}
const orderListModel = new OrderListModel();
export default orderListModel;
