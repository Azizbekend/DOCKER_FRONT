import { IncedentRequestType } from "@/packages/entities/incident/type";
import { getBjCompDataId, getCompanybyObject, getCompanyObjectLinkId, getCompanyUsers } from "@/packages/entities/participants/api";
import { createIncidentServiceRequests } from "@/packages/entities/service-requests/api";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";


class CreateRequestPanelModel {
    model: IncedentRequestType = {
        title: "",
        discription: "",
        incidentId: 0,

        creatorId: 0,
        creatorsCompanyId: 0,
        implementerId: 0,
        implementersCompaneId: 0,

        hardwareId: 0,
        objectId: 0,
    }

    companyList: { value: number, title: string }[] = []
    userList: { value: number, title: string }[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    setTitle(value: string) {
        this.model.title = value
    }

    setDiscription(value: string) {
        this.model.discription = value
    }

    setImplementerId(value: number) {
        this.model.implementerId = value
        console.log(this.model.implementerId)
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


    clear() {
        this.model = {
            title: "",
            discription: "",
            incidentId: 0,

            creatorId: 0,
            creatorsCompanyId: 0,
            implementerId: 0,
            implementersCompaneId: 0,

            hardwareId: 0,
            objectId: 0,
        }
    }

    async init({ incidentId, hardwareId, objectId, userId, creatorsCompanyId }: { incidentId: number, hardwareId: number, objectId: number, userId: number, creatorsCompanyId: number }) {
        this.clear()

        try {
            const [allCompanies] = await Promise.all([
                getCompanybyObject({ id: objectId })
            ])

            this.companyList = allCompanies.data.map((item: any) => {
                return {
                    value: item.companyId,
                    title: item.companyName
                }
            })

            this.model.objectId = objectId
            this.model.hardwareId = hardwareId
            this.model.incidentId = incidentId
            this.model.creatorId = userId
            this.model.creatorsCompanyId = creatorsCompanyId
            
        } catch (error) {
            console.log(error)
        }
    }

    async create(pushObject: (data: any) => void) {
        try {
            let result: any = null;
            result = await createIncidentServiceRequests({
                title: this.model.title,
                discription: this.model.discription,
                incidentId: this.model.incidentId,
                creatorId: this.model.creatorId,
                creatorsCompanyId: this.model.creatorsCompanyId,
                implementerId: this.model.implementerId,
                implementersCompaneId: this.model.implementersCompaneId,
                hardwareId: this.model.hardwareId,
                objectId: this.model.objectId,
            })

            pushObject(result.data)

            this.clear()
            toast.success("Заявка создана", { progressStyle: { background: "green" } })

        } catch (error) {
            console.log(error)
            toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } })
        }
    }
}

export const createRequestPanelModel = new CreateRequestPanelModel()
