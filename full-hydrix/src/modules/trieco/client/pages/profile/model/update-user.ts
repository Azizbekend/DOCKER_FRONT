import { User } from "@/entities/user/type";
import { UpdateUserEntity, updateUserService } from "../service/user";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

export class UpdateUserModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.model = {
            id: 0,
            adress: "",
            email: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            phoneNumber: ""
        };
    }

    model: UpdateUserEntity;
    isValidPhone = false

    // Геттер для автоматической проверки валидности
    get isValid() {
        const fieldsToValidate = Object.entries(this.model)
            .filter(([key]) => key !== "adress")
            .filter(([key]) => key !== "patronymic")
            .map(([, value]) => value);

        return fieldsToValidate.every((field) => field !== null && field !== "") && this.isValidPhone;
    }


    init(user: User) {
        this.model = {
            adress: user.adress,
            email: user.email,
            firstName: user.firstName,
            id: user.id,
            lastName: user.lastName,
            patronymic: user.patronymic,
            phoneNumber: user.phoneNumber
        };

        if (user.phoneNumber) {
            this.isValidPhone = true;
        }
    }

    changeEmail(value: string) {
        this.model.email = value;
    }

    changeFirstName(value: string) {
        this.model.firstName = value;
    }

    changeLastName(value: string) {
        this.model.lastName = value;
    }

    changeMiddleName(value: string) {
        this.model.patronymic = value;
    }

    changePhone(value: string) {
        this.model.phoneNumber = value;

        const isPhoneValid = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value);

        this.isValidPhone = !isPhoneValid ? false : true
    }


    update(onUpdate: (value: any) => void) {

        if (this.isValid) {
            updateUserService(this.model)
                .then(x => {
                    onUpdate(this.model);
                    toast("Данные обнавлены", {
                        progressStyle: { background: "green" },
                    })
                })
                .catch(() => {
                    toast("Ошибка в обновлении", {
                        progressStyle: { background: "red" },
                    })
                });
        } else {
            toast("Не все поля заполнены", {
                progressStyle: { background: "red" },
            })
        }
    }
}

const updateUserModel = new UpdateUserModel();
export default updateUserModel;
