import { getBjCompDataId, getCompanybyObject, getCompanyObjectLinkId, getCompanyUsers } from "@/packages/entities/participants/api";
import { createServiceStageRequests, supplyRequestCreateStage } from "@/packages/entities/service-requests/api";
import { ServiceStageType } from "@/packages/entities/service-requests/type";
import { getObjectId } from "@/packages/hook/objectData/getObjectData";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ServiceStagesFormModel {
    model: ServiceStageType = {
        discription: '',
        stageType: 'Общая',
        serviceId: 0,
        creatorId: 0,
        implementerId: 0,
        requiredCount: 0,
    }


    companyList: any[] = []
    userList: { value: number, title: string }[] = []
    isLodaderHardwares: boolean = true
    objectId: number = 0
    implementersCompaneId: number = 0


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setServiceId(id: number) {
        this.model.serviceId = id
    }

    setCreatorId(id: number) {
        this.model.creatorId = id
    }

    setImplementerId(id: number) {
        this.model.implementerId = id
    }

    setDiscription(value: string) {
        this.model.discription = value
    }
    setStageType(value: string) {
        this.model.stageType = value
    }

    setRequiredCount(value: number) {
        this.model.requiredCount = value
    }

    clear() {
        this.model = {
            discription: '',
            stageType: '',
            serviceId: 0,
            creatorId: 0,
            implementerId: 0
        }
    }

    async init() {

        this.clear()

        try {
            const [allCompanies] = await Promise.all([
                getCompanybyObject({ id: getObjectId() })
            ])

            this.companyList = allCompanies.data.map((item: any) => {
                return {
                    value: item.companyId,
                    title: item.companyName
                }
            })

            this.objectId = getObjectId()


        } catch (error) {
            console.log(error)
        } finally {
            this.isLodaderHardwares = false

        }
    }


    async getUserList(id: number) {

        this.implementersCompaneId = id

        const [usersRes, companyObjectLinkRes] = await Promise.all([
            getCompanyUsers({ id }),
            getCompanyObjectLinkId({ companyId: id, objectId: this.objectId })
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




    async create(data: ServiceStageType, pushStage: (data: any) => void, serviceId: number, userId: number, userCompanyId: number, objectId: number, hardwareId: number) {
        if (data.discription === '' || data.stageType === '') {
            toast.error("Заполните все поля", { progressStyle: { background: "red" } })
            return
        }

        try {
            let createRes: any = null

            if (this.model.stageType == "Общий") {
                createRes = await createServiceStageRequests({
                    discription: this.model.discription,
                    stageType: this.model.stageType,
                    serviceId: serviceId,
                    creatorId: userId,
                    creatorsCompanyId: userCompanyId,
                    implementerId: this.model.implementerId,
                    implementersCompanyId: this.implementersCompaneId

                })
            } else {
                createRes = await supplyRequestCreateStage({
                    creatorId: userId,
                    // creatorsCompanyId: this.model.implementerId,
                    currentImplementerId: this.model.implementerId,
                    currentImplementerCompanyId: this.implementersCompaneId,
                    productName: this.model.discription,
                    requiredCount: this.model.requiredCount || 0,
                    hardwareId: hardwareId,
                    objectId: objectId,
                    serviceId: serviceId,
                })
            }

            pushStage(createRes.data)
            toast.success("Этап успешно создан", { progressStyle: { background: "green" } })

            this.clear()
        } catch (error) {
            toast.error("Ошибка при создании этапа", { progressStyle: { background: "red" } })
            console.log(error)
        }
    }

}


export const serviceStagesFormModel = new ServiceStagesFormModel()


