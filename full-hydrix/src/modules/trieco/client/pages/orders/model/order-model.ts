import { makeAutoObservable, toJS } from "mobx";
import { changeStatus, Order } from "../service/order";

export class OrderModel {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    private _openedOrder: Order | null = null;
    private _isCancel: boolean = true;

    setIsCancel() {
        this._isCancel = !this._isCancel;
    }

    get isCancel() {
        return this._isCancel;
    }

    get order() {
        return this._openedOrder;
    }

    cancelOrder(onCancel?: (id: number) => void) {
        changeStatus({OrderId: this._openedOrder?.id || 0, OrderStatusId: 5}).then(x => {
            onCancel && onCancel(this.order?.id || 0);
        })
    }

    open(order: Order) {
        this._openedOrder = order;
    }


}

const orderModel = new OrderModel();
export default orderModel;