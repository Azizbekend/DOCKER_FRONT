import { User } from "@/app/cores/core-trieco/network/models";
import { UpdateUserEntity, updateUserService } from "../service/user";
import { makeAutoObservable } from "mobx";

export class UpdateUserModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        this.model = {
            id: 0,
            adress: "",
            email: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            phoneNumber: ""
        }
    }

    private _pageIndex: number = 1;

    get pageIndex() {
        return this._pageIndex;
    }

    setPage(value: number) {
        this._pageIndex = value;
    }

    nextPage() {
        this._pageIndex++;
    }

    model: UpdateUserEntity

    init(user: User) {
        this.model = {
            adress: user.adress,
            email: user.email,
            firstName: user.firstName,
            id: user.id,
            lastName: user.lastName,
            patronymic: user.patronymic,
            phoneNumber: user.phoneNumber
        }
    }

    changeEmail(value: string) {
        this.model.email = value;
    }

    changeFirstName(value: string) {
        this.model.firstName = value;
    }

    changeLastName(value: string) {
        this.model.lastName = value
    }

    changeMiddleName(value: string) {
        this.model.patronymic = value;
    }

    changePhone(value: string) {
        this.model.phoneNumber = value;
    }

    isChanged(user: User) {
        return (
            this.model.firstName != user.firstName ||
            this.model.phoneNumber != user.phoneNumber ||
            this.model.adress != user.adress ||
            this.model.email != user.email ||
            this.model.lastName != user.lastName ||
            this.model.patronymic != user.patronymic
        )
    }

    update(onUpdate: (value: any) => void) {
        updateUserService(this.model).then(x => {
            onUpdate({ ...this.model })
        })
    }
}

const updateUserModel = new UpdateUserModel();
export default updateUserModel;