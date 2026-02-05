
import { makeAutoObservable } from "mobx";
import mmrgl, { Map, MapLibreGL } from 'mmr-gl';

export class MapVKModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this._modelMap = {
            initialZoom: 12,
            initialCenter: [49.106414, 55.796127],
            token: '8d0b8f78327a59037142f25206d2e9f8721c6ff9c8d99d1081b317fb1963d7d9',
        }
    }

    private _modelMap: MapData;

    get modelMap() {
        return this._modelMap;
    }
}

const mapVKModel = new MapVKModel();
export default mapVKModel;
