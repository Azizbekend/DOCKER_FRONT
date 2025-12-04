// import gisModel from "@/modules/gis/kernel/model/gis-model";
import { makeAutoObservable } from "mobx";

export class SewerMapModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    private _isShow: boolean = false;


    private _latitude: number | null = null;
    private _longitude: number | null = null;
    private _sewerId: number = 0;

    get latitude() {
        return this._latitude;
    }

    get longitude() {
        return this._longitude;
    }

    public get isShow() {
        return this._isShow;
    }

    setShow(value: boolean) {
        this._isShow = value;

        if (value === false) {
            this.handleCoordinates({ Latitude: null, Longitude: null })
        }
    }

    openModal(userId: number, sewerId?: number) {
        this._isShow = true;
        this._sewerId = sewerId || 0;
        // gisModel.wsClient?.subscribe(userId, [`event.sewer_position.sewer=${sewerId}`], this.handleCoordinates)
    }

    handleCoordinates(data: any) {
        if (data.SewerId !== this._sewerId) return;
        this._latitude = data.Latitude;
        this._longitude = data.Longitude
    }

    unsubscribe(userId: number) {
        // gisModel.wsClient?.unsubscribe(userId, [`event.sewer_position.sewer=${this._sewerId}`])
    }

    init() {

    }
}

const sewerMapModel = new SewerMapModel();
export default sewerMapModel;