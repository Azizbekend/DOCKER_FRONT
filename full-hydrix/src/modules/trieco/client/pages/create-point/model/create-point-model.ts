import { createPoint } from "@/entities/point/api";
import { Point } from "@/entities/point/type";
import { makeAutoObservable } from "mobx";

export class CreatePointModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this.model = {
            address: "",
            latitude: 0,
            longitude: 0,
            userId: 0,
            wasteVolume: 0,
            id: 0,
            pointId: 0
        }
    }

    model: Point;

    changeAddress(value: string) {
        this.model.address = value;

    }

    changeWasteVolume(value: number) {
        this.model.wasteVolume = value;
    }

    get canCreate() {
        return true
        return this.model.address != "" && this.model.wasteVolume != 0
    }

    create(userId: number) {

        createPoint({
            id: this.model.id,
            pointId: this.model.pointId,
            address: this.model.address,
            wasteVolume: this.model.wasteVolume,
            userId: userId,
            latitude: this.model.latitude,
            longitude: this.model.longitude,
        }).then(x => {
            window.location.href = '/trieco/client'
        })
    }
}

const createPointModel = new CreatePointModel();
export default createPointModel;