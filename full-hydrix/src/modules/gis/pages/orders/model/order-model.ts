import { makeAutoObservable } from "mobx";
import { Order } from "../service/order";

export class OrderModel {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    private _openedOrder: Order | null = null;

    get order() {
        return this._openedOrder;
    }

    open(order: Order) {
        this._openedOrder = order;
    }
}

const orderModel = new OrderModel();
export default orderModel;