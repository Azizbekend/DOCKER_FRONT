import { makeAutoObservable } from "mobx"

interface userListType {
    id: number,
    name: string
}

class ParticipantsModel {

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

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

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

export const perticipantsModel = new ParticipantsModel()