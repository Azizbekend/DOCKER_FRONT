import { getCompanyByObject } from "@/packages/entities/company/api";
import { getBjCompDataId, getByCompany, getCompanyObjectLinkId, getCompanyUsers } from "@/packages/entities/participants/api";
import { getUserById } from "@/packages/entities/user/api";
import { makeAutoObservable } from "mobx";

class ListParticipantsModel {
    openCompanyId: any = 0;
    listParticipants: any[] = []
    isLoading: boolean = false

    showModalParticipants: boolean = false
    showAddModalParticipants: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setShowModalParticipants(value: boolean, data?: any) {
        this.openCompanyId = data
        this.showModalParticipants = value
    }

    setShowAddModalParticipants(value: boolean, id: number = 0) {
        this.showAddModalParticipants = value
        this.openCompanyId = id
    }

    pushParticipants(value: any) {
        this.listParticipants.push({
            company: value.company,
            users: value.users
        })
    }

    async updateList(companyId: number, data: any) {
        const listParticipantsCompanyListUpdate = this.listParticipants.map(participant => {
            console.log(participant.company?.companyId)
            if (participant.company?.companyId === companyId) {

                console.log({ ...participant, users: data })

                return {
                    ...participant,
                    users: data
                };
            }
            return participant;
        });
        this.listParticipants = listParticipantsCompanyListUpdate;



    }

    async init(id: number) {
        const userData = JSON.parse(localStorage.getItem('user'))
        try {
            this.isLoading = true;
            const res = await getCompanyByObject({ id: 14 });
            const companyList = res.data ?? [];
            const fullData: Array<{ company: any; users: any[] }> = [];

            for (const company of companyList) {
                const companyItem = {
                    company,
                    users: []
                };


                try {

                    const [usersRes, companyObjectLinkRes] = await Promise.all([
                        getCompanyUsers({ id: companyItem.company.companyId }),
                        getCompanyObjectLinkId({ companyId: companyItem.company.companyId, objectId: 14 })
                    ]);

                    const attachUsersRes = await getBjCompDataId({ objCompLinkId: companyObjectLinkRes.data.id });


                    attachUsersRes.data.forEach(element => {

                        if (element.userId == userData.id) {
                            localStorage.setItem("userDostup", JSON.stringify(element))
                        }

                    });

                    let attachUsersIds: number[] = []

                    // Прохожу и получаю подкреплённых
                    attachUsersRes.data.forEach(element => { attachUsersIds.push(element.userId) });
                    companyItem.users = usersRes.data.filter(user => attachUsersIds.includes(user.id));


                } catch (companyError) {
                    console.error(
                        `Ошибка получения пользователей компании ${company.companyId}`,
                        companyError
                    );
                }

                fullData.push(companyItem);
            }

            this.listParticipants = fullData;

            console.log(this.listParticipants)
        } catch (err) {
            console.error('Error in init:', err);
        } finally {
            this.isLoading = false;
        }
    }

}

export const listParticipantsModel = new ListParticipantsModel()