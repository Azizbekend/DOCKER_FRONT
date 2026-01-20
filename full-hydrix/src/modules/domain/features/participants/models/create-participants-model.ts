import { userAttachCompany, participantCreate, attachCompany, attachUser } from "@/packages/entities/participants/api";
import { CreateParticipantType } from "@/packages/entities/participants/type";
import { Role } from "@/packages/entities/user/enums";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CreateParticipantsModel {

    model: CreateParticipantType = {
        login: "",
        password: "",
        firstName: "",
        lastName: "",
        patronymic: "",
        email: "",
        phoneNumber: "",
        adress: "",
        isEmailApproved: false,
        baseRoleId: Role.Participant,
        docs: null, // Добавить документы
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setLogin(value: string) {
        this.model.login = value;
    }
    setPassword(value: string) {
        this.model.password = value;
    }
    setFirstName(value: string) {
        this.model.firstName = value;
    }
    setLastName(value: string) {
        this.model.lastName = value;
    }
    setPatronymic(value: string) {
        this.model.patronymic = value;
    }
    setEmail(value: string) {
        this.model.email = value;
    }
    setPhoneNumber(value: string) {
        this.model.phoneNumber = value;
    }
    setAdress(value: string) {
        this.model.adress = value;
    }

    reset() {
        this.model = {
            login: "",
            password: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            email: "",
            phoneNumber: "",
            adress: "",
            isEmailApproved: false,
            baseRoleId: Role.Participant
        }
    }

    async create(onAction: () => void, data: any) {
        try {
            const dataUser = await participantCreate(this.model);

            const result = await userAttachCompany({
                userId: dataUser.data.id,
                companyId: data.companyId
            });

            const result2 = await attachCompany({
                objectId: 14,
                companyId: data.companyId,
                companyName: data.companyName,
                companyRole: data.companyRole,
            });

            const result3 = await attachUser({
                objectCompanyLinkId: result.data.id,
                userId: dataUser.data.id
            });

            toast.success("Соединение 1", { progressStyle: { background: "green" } });
            toast.success("Соединение 2", { progressStyle: { background: "green" } });

            onAction();
            this.reset();
            toast.success("Участник создан", { progressStyle: { background: "green" } });

        } catch (error) {
            console.error("Ошибка при создании участника:", error);
            const errorMessage = "Ошибка при создании";
            toast.error(errorMessage, { progressStyle: { background: "red" } });
        }
    }
}

export const createParticipantsModel = new CreateParticipantsModel()