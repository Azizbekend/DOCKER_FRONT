import { getAllPointsByUser } from "@/packages/entities/point/api";
import { Point } from "@/packages/entities/point/type";
import { makeAutoObservable } from "mobx";

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
        })
    }
}

const pointsModel = new PointsModel();
export default pointsModel;