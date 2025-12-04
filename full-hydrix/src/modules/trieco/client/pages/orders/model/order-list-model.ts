import { makeAutoObservable, toJS } from "mobx";
import { getAllOrders, getOrderCode, Order } from "../service/order";
import { OrderStatus } from "@/entities/order/order-status";

export class OrderListModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this._model = [];
        this._modelMain = [];
        this.filteredModel = [];
    }

    private _model: Order[];
    private _modelMain: Order[];
    private _isInit: boolean = false;
    filteredModel: Order[];
    filterId: number = -1;

    get model() {
        if (this.filterId === -1) {
            return this._model;
        }

        return this._model.filter(x => x.orderStatusId === this.filterId);
    }

    toggleInit() {
        this._isInit = false;
    }

    get modelMain() {
        return this._modelMain;
    }

    public async initMain(userId: number) {
        getAllOrders({ id: userId }).then((x) => {

            const today = new Date();
            const currentMonth = today.getMonth();
            const currentDate = today.getDate();

            this._modelMain = x.data.filter((order: any) => {
                const arrivalDate = new Date(order.arrivalStartDate);
                return (arrivalDate.getMonth() === currentMonth && arrivalDate.getDate() === currentDate);
            });

            this._modelMain.sort(
                (a, b) =>
                    new Date(b.timeOfPublication).getTime() -
                    new Date(a.timeOfPublication).getTime()
            );
        });
    }

    public async init(userId: number) {
        const ordersResponse = await getAllOrders({ id: userId });

        this._model = ordersResponse.data;

        this._model.sort((a, b) => new Date(b.timeOfPublication).getTime() - new Date(a.timeOfPublication).getTime());

        await Promise.all(
            this._model.map(async order => {
                const resp = await getOrderCode({ OrderId: order.id });
                const code = resp.data["code"];
                const ind = this._model.findIndex(x => x.id === order.id);
                this._model[ind].code = code;
            })
        );
        this._isInit = true;
    }

    get isInit() {
        return this._isInit;
    }

    public changeOrderStatus(id: number, orderStatusId: OrderStatus) {
        const index = this._model.findIndex(x => x.id === id);

        this._model[index] = { ...this._model[index], orderStatusId };
    }

    public filter(value: number) {
        this.filterId = value;
        return;
    }
}

const orderListModel = new OrderListModel();
export default orderListModel;