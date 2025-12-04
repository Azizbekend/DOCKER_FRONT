import { makeAutoObservable } from "mobx";
import { createSewer, CreateSewerRequest, createSewerUser, Sewer } from "../services/sewers";

export class CreateSewerModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this.model = {
            sewerBusinessType: "",
            userId: 0,
            sewerCarModel: "",
            sewerNumberPlate: "",
            tankVolume: 0,
            name: "",
            email: "",
            phone: "",
        }

    }

    model: CreateSewerRequest

    changeSewerNumberPlate(value: string) {
        this.model.sewerNumberPlate = value
    }

    changeTankVolume(value: string) {
        this.model.tankVolume = Number(value)
    }

    changeName(value: string) {
        this.model.name = value;
    }

    changeBusinessType(value: string) {
        this.model.sewerBusinessType = value
    }

    changeSewerCarModel(value: string) {
        this.model.sewerCarModel = value;
    }

    changeLogin(value: string) {
        this.model.login = value;
    }

    changePhone(value: string) {
        this.model.phone = value;
    }

    changeEmail(value: string) {
        this.model.email = value;
    }

    createSewer(addSewer?: (sewer: Sewer) => void) {
        createSewerUser({
            firstName: this.model.name.split(' ')[1],
            lastName: this.model.name.split(' ')[0],
            login: this.model.login ?? "",
            email: this.model.email,
            phoneNumber: this.model.phone,
            password: "pass",
            roleId: 2,
        }).then(x => {
            this.model.userId = x.data["id"]
            createSewer(this.model).then(y => {
                addSewer && addSewer({
                    email: this.model.email,
                    phoneNumber: this.model.phone,
                    rating: 0,
                    firstName: this.model.name.split(' ')[1],
                    lastName: this.model.name.split(' ')[0],
                    id: y.data.id,
                    patronymic: "",
                    sewerBusinessType: this.model.sewerBusinessType,
                    sewerCarModel: this.model.sewerCarModel,
                    sewerNumberPlate: this.model.sewerNumberPlate,
                    tankVolume: this.model.tankVolume,
                    userId: this.model.userId
                })
            })
        })
    }
}

const createSewerModel = new CreateSewerModel();
export default createSewerModel;