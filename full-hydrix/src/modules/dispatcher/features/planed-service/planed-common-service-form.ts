import { getBjCompDataId, getCompanybyObject, getCompanyObjectLinkId, getCompanyUsers } from '@/packages/entities/participants/api';
import { createPlanedCommonServiceApi } from '@/packages/entities/planed-services/api';
import { CreatePlanedCommonServicesInterface } from '@/packages/entities/planed-services/type';
import { SeletectItemInterface } from '@/packages/shared-ui/Selector/type';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';


class PlanedCommonServiceFormModel {

    model: CreatePlanedCommonServicesInterface = {
        discription: "",
        implementerId: 0,
        implementersCompaneId: 0,
        creatorId: 0,
        creatorsCompanyId: 6,
        planServiceId: 0,
        objectId: 0,
    }

    companyList: SeletectItemInterface[] = []
    userList: SeletectItemInterface[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setDiscription(value: string) {
        this.model.discription = value
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

    setImplementerId(value: number) {
        this.model.implementerId = value
    }

    clear() {
        this.model = {
            discription: "",
            creatorId: 0,
            creatorsCompanyId: 6,
            implementerId: 0,
            implementersCompaneId: 0,
            planServiceId: 0,
            objectId: 0,
        }

        this.companyList = []
        this.userList = []
    }

    async init({ creatorId, creatorsCompanyId, planServiceId, objectId }: { creatorId: number, creatorsCompanyId: number, planServiceId: number, objectId: number, }) {
        this.clear()
        try {
            this.model.creatorId = creatorId
            this.model.creatorsCompanyId = 6
            this.model.planServiceId = planServiceId
            this.model.objectId = objectId

            const allCompanies = await getCompanybyObject({ id: objectId });
            this.companyList = allCompanies.data.map((item: any) => {
                return {
                    value: item.companyId,
                    title: item.companyName
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    isValid(): boolean {
        return (
            this.model.discription.length > 0 &&
            this.model.creatorId > 0 &&
            this.model.creatorsCompanyId > 0 &&
            this.model.implementerId > 0 &&
            this.model.implementersCompaneId > 0 &&
            this.model.planServiceId > 0 &&
            this.model.objectId > 0
        )
    }

    async create(onActin: () => void) {

        if (!this.isValid()) {
            toast.error("Заполните все поля")
            return
        }

        try {
            const res = await createPlanedCommonServiceApi(this.model)
            console.log(res.data)
            onActin()
            toast.success("ТО создано")

        } catch (error) {
            console.log(error)
            toast.error("Ошибка при создании ТО")
        }
    }
}

export const planedCommonServiceFormModel = new PlanedCommonServiceFormModel()