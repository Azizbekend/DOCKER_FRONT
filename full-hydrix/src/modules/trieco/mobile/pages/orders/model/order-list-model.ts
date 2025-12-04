import { makeAutoObservable } from "mobx";
import { getAllOrders, Order } from "../service/order";
import { OrderStatus } from "@/app/cores/core-trieco/lib/order";

export class OrderListModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._model = [];
    this._filteredModel = [];
  }

  private _model: Order[];
  private _filteredModel: Order[];
  filterId: number = -1;

  get model() {
    return this._model;
  }



  public async initMain(userId: number) {
    getAllOrders({ id: userId }).then((x) => {

      const today = new Date();
      const currentMonth = today.getMonth();
      const currentDate = today.getDate();

      // Фильтруем данные по дате
      this._model = x.data.filter((order: any) => {
        const arrivalDate = new Date(order.arrivalStartDate);
        return (arrivalDate.getMonth() === currentMonth && arrivalDate.getDate() === currentDate);
      });

      // Сортируем отфильтрованные данные
      this._model.sort(
        (a, b) =>
          new Date(b.timeOfPublication).getTime() -
          new Date(a.timeOfPublication).getTime()
      );
    });
  }

  public async init(userId: number) {
    getAllOrders({ id: userId }).then((x) => {

      this._model = x.data;
      this._model.sort(
        (a, b) =>
          new Date(b.timeOfPublication).getTime() -
          new Date(a.timeOfPublication).getTime()
      );
    });
  }

  public changeOrderStatus(id: number, orderStatusId: OrderStatus) {
    const index = this._model.findIndex((x) => x.id === id);

    this._model[index] = { ...this._model[index], orderStatusId };
  }

  public filter(value: number) {
    if (value === -1) {
      this.filterId = -1;
      return;
    }

    this._filteredModel = this._model.filter((x) => x.orderStatusId === value);
    this.filterId = value;
  }

  get filteredModel() {
    if (this.filterId === -1) return this._model;

    return this._filteredModel;
  }
}

const orderListModel = new OrderListModel();
export default orderListModel;
