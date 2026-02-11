import { getAllHardware } from "@/packages/entities/hardware/api";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { getBjCompDataId, getCompanybyObject, getCompanyObjectLinkId, getCompanyUsers } from "@/packages/entities/participants/api";
import { createServiceRequests } from "@/packages/entities/service-requests/api";
import { FormCommonServiceModelType } from "@/packages/entities/service-requests/type";
import { supplyRequestCreate } from "@/packages/entities/supply-request/api";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CreateRequestModel {

    model: FormCommonServiceModelType = {
        title: "",
        discription: "",
        type: "",
        creatorId: 0,
        implementerId: 0,
        implementersCompaneId: 0,
        hardwareId: 0,
        objectId: 0,
        requiredCount: 0,
    }

    hardwareList: { value: number, title: string }[] = []
    companyList: { value: number, title: string }[] = []
    userList: { value: number, title: string }[] = []

    isLodaderHardwares: boolean = true

    objectId: number = 0

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setTitle(value: string) {
        this.model.title = value
    }

    setDiscription(value: string) {
        this.model.discription = value
    }

    setType(value: string) {
        this.model.type = value
    }

    setHardwareId(value: number) {
        this.model.hardwareId = value
    }

    setRequiredCount(value: number) {
        this.model.requiredCount = value
    }

    setImplementerId(value: number) {
        this.model.implementerId = value
    }

    clear() {
        this.model = {
            title: "Тестовая поставка товара",
            discription: "",
            type: "",
            creatorId: 0,
            implementerId: 0,
            hardwareId: 0,
            objectId: 0,
            requiredCount: 5,
        }
    }

    async init(id: number) {
        this.clear()
        try {
            const [allHardwareRes, allCompanies] = await Promise.all([
                getAllHardware(),
                getCompanybyObject({ id: id })
            ])

            this.hardwareList = allHardwareRes.data.map((item: HardwareInterface) => {
                return {
                    value: item.id,
                    title: item.name
                }
            })

            this.companyList = allCompanies.data.map((item: any) => {
                return {
                    value: item.companyId,
                    title: item.companyName
                }
            })

            this.model.objectId = id
        } catch (error) {
            console.log(error)
        } finally {
            this.isLodaderHardwares = false

        }
    }


    async getUserList(id: number) {

        this.model.implementersCompaneId = id

        const [usersRes, companyObjectLinkRes] = await Promise.all([
            getCompanyUsers({ id }),
            getCompanyObjectLinkId({ companyId: id, objectId: this.model.objectId })
        ]);

        const allUsers = usersRes.data;
        const attachUsersRes = await getBjCompDataId({ objCompLinkId: companyObjectLinkRes.data.id });

        let ids: number[] = []
        attachUsersRes.data.forEach(element => { ids.push(element.userId) });

        this.userList = allUsers.filter(user => ids.includes(user.id)).map(user => ({
            value: user.id,
            title: user.lastName + " " + user.firstName + " " + user.patronymic
        }));
    }

    async create({ id, comanyId, onAction }: { id: number, comanyId: number, onAction: () => void }) {

        this.model.creatorId = id

        try {

            let result: any = null;
            if (this.model.type == "Общий") {
                result = await createServiceRequests({
                    title: this.model.title,
                    discription: this.model.discription,
                    type: this.model.type,
                    creatorId: this.model.creatorId,
                    creatorsCompanyId: comanyId,
                    implementerId: this.model.implementerId,
                    implementersCompaneId: this.model.implementersCompaneId,
                    hardwareId: this.model.hardwareId,
                    objectId: this.model.objectId,
                })


                onAction()

            } else if (this.model.type == "Поставочная") {
                result = await supplyRequestCreate({
                    creatorId: this.model.creatorId,
                    creatorsCompanyId: comanyId,
                    nextImplementerId: this.model.implementerId,
                    nextImplementerCompanyId: this.model.implementersCompaneId,
                    productName: this.model.title,
                    requiredCount: this.model.requiredCount || 0,
                    hardwareId: this.model.hardwareId,
                    objectId: this.model.objectId,
                    requestType: "asda",
                })
                onAction()

                toast.success("Заявка создана", { progressStyle: { background: "green" } })

            } else {
                toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } })
            }

            // this.clear()

        } catch (error) {
            toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } })
        }
    }
}

export const createRequestModel = new CreateRequestModel()