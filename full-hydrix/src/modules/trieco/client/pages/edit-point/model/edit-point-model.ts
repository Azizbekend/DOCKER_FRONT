import { editPoint } from "@/entities/point/api";
import { Point } from "@/entities/point/type";
import { makeAutoObservable } from "mobx";

export class EditPointModel {
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

    get isAddress() {
        return this.model.address != ""
    }

    changeWasteVolume(value: number) {
        this.model.wasteVolume = value;
    }

    init(entity: PointEntity) {
        this.model = {
            pointId: entity.id,
            address: entity.address,
            latitude: entity.latitude,
            longitude: entity.longitude,
            userId: entity.userId,
            wasteVolume: entity.wasteVolume,
            id: entity.id
        }
    }

    edit() {
        editPoint({
            address: this.model.address,
            pointId: this.model.id,
            wasteVolume: this.model.wasteVolume,
            latitude: this.model.latitude,
            longitude: this.model.longitude
        }).then(x => {
            window.location.href = '/'
        })
    }
}

export type PointEntity = {
    id: number,
    address: string,
    wasteVolume: number,
    userId: number,
    latitude: number,
    longitude: number,
}


const editPointModel = new EditPointModel();
export default editPointModel;