import { makeAutoObservable } from "mobx";
import {
  getAllMunicipalities,
  getAllOrders,
  getOrderCustomer,
  getOrdersByIdTransporterCompany,
  Order,
} from "../service/order";
import { Sewer } from "../../sewer-list/services/sewers";
import { OrderStatus, OrderStatusText } from "@/app/cores/core-trieco/lib/order";
import { Municipality } from "@/app/cores/core-trieco/network/company/municipality";
export class OrderListModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._model = [];
    this._searchedModel = [];
    this.municipalitiesAll = [];
    this.filterByMunicipalityModel = [];

    this._municipalityMap = new Map();
  }

  isInit: boolean = false;
  selectedOrder: Order | null = null;

  private _searchedModel: Order[];
  searchValue = "";
  public isSearch: boolean = false;

  private _model: Order[];

  filterByMunicipalityModel: Order[];
  private _filterByMunicipalityIds: number[] = [];
  public municipalitiesAll: Municipality[];

  public _municipalityMap: Map<number, string>;

  get searchedModel() {
    return this._searchedModel;
  }
  get filterByMunicipalityIds() {
    return this._filterByMunicipalityIds;
  }

  getFilteredModel(model: Order[]) {
    return this._filterByMunicipalityIds.length === 0
      ? model
      : model.filter((item) =>
        this._filterByMunicipalityIds.includes(item.municipalityId)
      );
  }

  public search(value: string) {
    this.searchValue = value;
    this.isSearch = value !== "";

    const statusId = Object.keys(OrderStatusText).find((key) =>
      OrderStatusText[parseInt(key)]
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    const statusText = statusId
      ? OrderStatusText[parseInt(statusId)]
      : undefined;

    this._searchedModel = this._model.filter((x) => {
      const searchStr =
        `${x.userLastName} ${x.userFirstName} ${x.userPatronymic} ${x.adress} ${x.arrivalStartDate} ${x.arrivalEndDate} ${x.sewerFirstName} ${x.sewerLastName} ${x.sewerPatronymic}`.toLowerCase();

      return searchStr.includes(value.toLowerCase());
    });
  }

  public pushMunicipality(value: number, checked: boolean) {
    checked
      ? this._filterByMunicipalityIds.push(value)
      : (this._filterByMunicipalityIds = this._filterByMunicipalityIds.filter(
        (item) => item !== value
      ));
  }

  public attachSewer(orderId: number, sewer: Sewer) {
    const order = this._model.find((x) => x.id === orderId) || null;

    if (order == null) return;
    order.orderStatusId = OrderStatus.Accepted;
    order.sewerId = sewer.id;
    order.sewerFirstName = sewer.firstName;
    order.sewerLastName = sewer.lastName;
    order.sewerPatronymic = sewer.patronymic;
  }

  get model() {
    return this.getFilteredModel(this._model);
  }

  public async init(companyId: number) {
    const ordersPromise = getOrdersByIdTransporterCompany({ CompanyId: companyId });
    const getMunicipalities = getAllMunicipalities();

    Promise.all([ordersPromise, getMunicipalities])
      .then(([orders, municipalities]) => {
        this._model = orders.data;
        this._model.sort(
          (a, b) =>
            new Date(b.timeOfPublication).getTime() -
            new Date(a.timeOfPublication).getTime()
        );

        this._municipalityMap = new Map(
          municipalities.data.map((municipality: Municipality) => [
            municipality.id,
            municipality.name,
          ])
        );

        this.municipalitiesAll = municipalities.data.map(
          (municipality: Municipality) => ({
            id: municipality.id,
            name: municipality.name,
          })
        );

        this._model = this._model.map((order) => ({
          ...order,
          municipalities: {
            id: order.municipalityId,
            name:
              this._municipalityMap.get(order.municipalityId) || "Неизвестно",
          },
        }));
      })
      .then(() => {
        this.isInit = true;
      });
  }
}

const orderListModel = new OrderListModel();
export default orderListModel;
