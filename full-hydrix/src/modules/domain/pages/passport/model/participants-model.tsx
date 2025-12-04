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
            name: "John Doe",
        },
        {
            id: 2,
            name: "Jane Doe",
        },
        {
            id: 3,
            name: "Jim Doe",
        },
        {
            id: 4,
            name: "Jane Doe",
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