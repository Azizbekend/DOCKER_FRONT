import { getBjCompDataId, getCompanybyObject, getCompanyObjectLinkId, getCompanyUsers } from '@/packages/entities/participants/api';
import { makeAutoObservable } from 'mobx';


class StageSupplyFormModel {

    data: any = {
        creatorId: 0,
        creatiorCompanyId: 0,
        hardwareId: 0,
        objectId: 0,
        serviceId: 0,
        stageId: 0,
        implementerId: 0,
        implementersCompanyId: 0,
        discription: "",
        supplierName: "",
        count: 0,

        expenseNumber: "",
        expenses: 0,
    }

    companyList: any = []
    userList: any = []

    isLoader: boolean = false


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    clear() {
        this.data = {
            creatorId: 0,
            creatiorCompanyId: 0,
            hardwareId: 0,
            objectId: 0,
            serviceId: 0,
            stageId: 0,
            implementerId: 0,
            implementersCompanyId: 0,
            discription: "",
            supplierName: "",
            count: 0,
            expenseNumber: "",
            expenses: 0,
        }

        this.companyList = []
        this.userList = []

        this.isLoader = false
    }


    async init({
        creatorId,
        creatiorCompanyId,
        hardwareId,
        objectId,
        serviceId,
        stageId
    }: {
        creatorId: number | undefined,
        creatiorCompanyId: number | undefined,
        hardwareId: number,
        objectId: number,
        serviceId: number,
        stageId: number | undefined,
    }) {
        this.data.creatorId = creatorId;
        this.data.creatiorCompanyId = creatiorCompanyId;
        this.data.hardwareId = hardwareId;
        this.data.objectId = objectId;
        this.data.serviceId = serviceId;
        this.data.stageId = stageId;






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

        } catch (error) {
            console.log(error)
        }
    }


    setImplementerId(id: number) {
        this.data.implementerId = id
    }

    async getUserList(id: number) {

        this.data.implementersCompanyId = id

        const [usersRes, companyObjectLinkRes] = await Promise.all([
            getCompanyUsers({ id }),
            getCompanyObjectLinkId({ companyId: id, objectId: this.data.objectId })
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

    setDiscription(discription: string) {
        this.data.discription = discription
    }
    setSupplierName(supplierName: string) {
        this.data.supplierName = supplierName
    }

    setCount(realCount: number) {
        this.data.count = realCount
    }

    setExpenseNumber(expenseNumber: string) {
        this.data.expenseNumber = expenseNumber
    }

    setExpenses(expenses: number) {
        this.data.expenses = expenses
    }
}

export const stageSupplyFormModel = new StageSupplyFormModel()