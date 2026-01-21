import { getAllHardware } from "@/packages/entities/hardware/api";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { getBjCompDataId, getCompanybyObject, getCompanyObjectLinkId, getCompanyUsers } from "@/packages/entities/participants/api";
import { createServiceRequests } from "@/packages/entities/service-requests/api";
import { FormCommonServiceModelType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CreateRequestModel {

    model: FormCommonServiceModelType = {
        title: "",
        discription: "",
        type: "",
        creatorId: 0,
        implementerId: 0,
        hardwareId: 0,
        objectId: 0,
        companyId: 0
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

    setImplementerId(value: number) {
        this.model.implementerId = value
    }

    clear() {
        this.model = {
            title: "",
            discription: "",
            type: "",
            creatorId: 0,
            implementerId: 0,
            hardwareId: 0,
            objectId: 0,
        }
    }

    async init(id: number) {
        this.clear()
        try {
            const [allHardwareRes, allCompanies] = await Promise.all([
                getAllHardware(),
                getCompanybyObject({ id: id })
            ])

            this.hardwareList = allHardwareRes.data.map((item: HardwareInterface) => ({
                value: item.id,
                title: item.name
            }))

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

        this.model.companyId = id

        const [usersRes, companyObjectLinkRes] = await Promise.all([
            getCompanyUsers({ id }),
            getCompanyObjectLinkId({ companyId: id, objectId: this.model.objectId })
        ]);

        const allUsers = usersRes.data;
        const attachUsersRes = await getBjCompDataId({ objCompLinkId: companyObjectLinkRes.data.id });

        let ids: number[] = []
        attachUsersRes.data.forEach(element => { ids.push(element.userId) });

        this.userList = allUsers
            .filter(user => ids.includes(user.id))
            .map(user => ({
                value: user.id,
                title: user.lastName + " " + user.firstName + " " + user.patronymic
            }));

        console.log(this.userList)

    }

    async create(id: number) {
        this.model.creatorId = id

        createServiceRequests(this.model)
            .then((res) => {
                this.clear()
                toast.success("Заявка создана", { progressStyle: { background: "green" } })
            })
            .catch((err) => {
                console.log(err)
                toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } })
            })
    }
}

export const createRequestModel = new CreateRequestModel()