import { makeAutoObservable, toJS } from "mobx";
import { changeStatus, getOrder, Order } from "../../orders/service/order";

export class OrderModel {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    private _openedOrder: Order | null = null;
    private _isCancel: boolean = true;

    toggleCancel() {
        this._isCancel = !this._isCancel;
    }

    setIsCancel(value: boolean) {
        this._isCancel = value;
    }

    init(orderId: number) {
        getOrder({Id: orderId}).then(x => {
            this._openedOrder = x.data;
        })
    }

    get isCancel() {
        return this._isCancel;
    }

    get order() {
        return this._openedOrder;
    }

    cancelOrder(onCancel?: (id: number) => void) {
        changeStatus({OrderId: this._openedOrder?.id || 0, OrderStatusId: 5}).then(x => {
            this._openedOrder!.orderStatusId = 5;
            onCancel && onCancel(this.order?.id || 0);
        })
    }

    open(order: Order) {
        this._openedOrder = order;
    }
}

const orderModel = new OrderModel();
export default orderModel;