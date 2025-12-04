import { makeAutoObservable } from "mobx";
import { MapData } from "../service/mapVK";

export class MapVKModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this._modelMap = {
            initialZoom: 12,
            initialCenter: [49.106414, 55.796127],
            token: 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814',
        }
    }

    private _modelMap: MapData;

    get modelMap() {
        return this._modelMap;
    }
}

const mapVKModel = new MapVKModel();
export default mapVKModel;
