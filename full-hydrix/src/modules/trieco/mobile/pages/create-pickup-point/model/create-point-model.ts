import { createPoint, editPoint, Point } from "@/modules/client/components/points/service/point-service";
import { makeAutoObservable } from "mobx";

export class CreatePointModel {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
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
        return this.model.address != "" && this.model.wasteVolume != 0
    }

    create(userId: number) {
        this.model.userId = userId
        createPoint(this.model).then(x => {
            window.location.href = '/'
        })
    }
}

const createPointModel = new CreatePointModel();
export default createPointModel;