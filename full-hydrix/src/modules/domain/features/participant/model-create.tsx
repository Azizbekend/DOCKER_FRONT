import { userListType } from "@/packages/entities/object/type";
import { WaterCompany } from "@/packages/entities/water-company/types";
import { makeAutoObservable } from "mobx"
import { toast } from "react-toastify";


class CreateCompanyModel {

    innInput: string = "";
    roleInput: string = "";
    companyList: WaterCompany[] = [{
        id: 1,
        name: 'Муниципальное унитарное предприятие г. Казани "Водоканал"',
        waterCompanyName: 'Муниципальное унитарное предприятие г. Казани "Водоканал"',
        address: "Республика Татарстан, г. Казань, ул.Горького, 34",
        municipality: {
            id: 1,
            name: "string"
        },
        municipalityName: "string",
        ogrn: "string",
        inn: "1021602830370",
        kpp: "string",
        operator: {
            userId: 1,
            firstName: "Абдулхаков Рустам Рифгатович",
            lastName: "string",
            patronymic: "string",
            phone: "+7 (843) 231-69-96",
            email: "string",
            login: "string",
            roleName: "string",
            isRevoked: true,
            waterCompanyId: 1,
            plantId: 1,
            workplace: "string",
        },
        isTransporter: true,
        isDeleted: true,
        email: "string",
        phoneNumber: "+7 (843) 231-62-60",
    }]

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setInnInput(value: string) {
        this.innInput = value;
    }
    setRoleInput(value: string) {
        this.roleInput = value;
    }

    createCompany() {
        toast("Компания добавлена", {
            progressStyle: { background: "green" },
        })
    }


    userList: userListType[] = [];
    allUserList: userListType[] = [
        {
            id: 1,
            name: "Димтрий Андреевич",
        },
        {
            id: 2,
            name: "Александ Дмитреевич",
        },
        {
            id: 3,
            name: "Евгений Ивнович",
        },
        {
            id: 4,
            name: "Тарасов Барис",
        }
    ];

    addUser(user: userListType) {
        this.userList.push(user)
    }
    removeUser(id: number) {
        this.userList = this.userList.filter((item) => {
            if (item.id !== id) {
                return item
            }
        })
    }
}

export const createCompanyModel = new CreateCompanyModel()