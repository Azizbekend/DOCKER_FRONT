import { getByCompany } from "@/packages/entities/participants/api";
import { getUserByCompany, getUserById } from "@/packages/entities/user/api";
import { makeAutoObservable } from "mobx";

class AddParticipantsModel {

    allUsers: any[] = []
    addUsers: any[] = []

    listLoader: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    pushUser(user: any) {
        this.addUsers.push(user)
    }
    removeUser(id: number) {
        this.addUsers = this.addUsers.filter((item) => {
            return item.id !== id
        })
    }

    reset() {
        this.allUsers = []
        this.addUsers = []
        this.listLoader = true
    }

    async init(id: number) {

        this.reset()


        try {
            const usersRes = await getByCompany({ id: id })
            const usersAll = usersRes.data


            for (const user of usersAll) {
                if (!user.userId) continue;

                try {
                    const userRes = await getUserById({ id: user.userId });
                    if (userRes.data) {
                        this.allUsers.push(userRes.data);
                    }
                } catch (userError) {
                    console.error(
                        `Ошибка получения пользователя ${user.userId}`,
                        userError
                    );
                }
            }

            const usersAddsRes = await getUserByCompany({ id: id })
            const usersAdds = usersAddsRes.data

            let ids: number[] = []

            usersAdds.forEach(element => {
                if (element.userId) {
                    ids.push(element.userId)
                }
            });


            this.addUsers = this.allUsers.filter((item: any) => {
                if (ids.find((user: any) => user.id === item.id)) {
                    return item
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export const addParticipantsModel = new AddParticipantsModel()