import { makeAutoObservable } from "mobx";
import { getAllPointsByUser, Point } from "../service/point-service";

export class PointsModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    private _model: Point[] = [];

    public get model() {
        return this._model;
    }

    init(userId: number) {
        getAllPointsByUser({ userId }).then(x => {
            this._model = x.data
        }).then(() => {
            this._model.map(async x => {
                const response = await fetch(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=24928587-9095-4b8a-a99e-6eabfc05b2cd&format=json&geocode=${x.address}&lang=ru_RU`
                );
                const data = await response.json();
                const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number).reverse() as [number, number]
                x.latitude = coordinates[0]
                x.longitude = coordinates[1]
            })
        })
    }
}

const pointsModel = new PointsModel();
export default pointsModel;