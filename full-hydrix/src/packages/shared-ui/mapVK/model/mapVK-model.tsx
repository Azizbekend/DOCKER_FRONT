import { makeAutoObservable } from "mobx";
import { MapData } from "../service/mapVK";

export class MapVKModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this._modelMap = {
            initialZoom: 12,
            initialCenter: [49.106414, 55.796127],
            token: 'c62caf135a4d33c160e9d22b68f27713e6a52c80a69dfcf538ecd76797049887',
        }
    }

    private _modelMap: MapData;

    get modelMap() {
        return this._modelMap;
    }
}

const mapVKModel = new MapVKModel();
export default mapVKModel;
