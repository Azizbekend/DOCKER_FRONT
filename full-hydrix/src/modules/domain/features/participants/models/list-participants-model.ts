import { getCompanyByObject } from "@/packages/entities/company/api";
import { getByCompany } from "@/packages/entities/participants/api";
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

    async updateList(id: number) {

        const foundCompany = this.listParticipants.find(item => item.company.companyId === id)?.company;
        const companyItem = {
            company: foundCompany,
            users: []
        };

        try {
            const usersRes = await getByCompany({ id: companyItem.companyId });
            const users = usersRes.data ?? [];

            for (const user of users) {
                if (!user.userId) continue;

                try {
                    const userRes = await getUserById({ id: user.userId });
                    if (userRes.data) {
                        companyItem.users.push(userRes.data);
                    }
                } catch (userError) {
                    console.error(
                        `Ошибка получения пользователя ${user.userId}`,
                        userError
                    );
                }
            }

            const index = this.listParticipants.findIndex(item => item.company.companyId === id);

            this.listParticipants[index] = companyItem

        } catch (companyError) {
            console.error(
                `Ошибка получения пользователей компании ${companyItem.companyId}`,
                companyError
            );
        }
    }

    async init(id: number) {
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
                    const usersRes = await getByCompany({ id: company.companyId });
                    const users = usersRes.data ?? [];

                    for (const user of users) {
                        if (!user.userId) continue;

                        try {
                            const userRes = await getUserById({ id: user.userId });
                            if (userRes.data) {
                                companyItem.users.push(userRes.data);
                            }
                        } catch (userError) {
                            console.error(
                                `Ошибка получения пользователя ${user.userId}`,
                                userError
                            );
                        }
                    }

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