import { attachUser, deleteUserFromObject, getBjCompDataId, getCompanyObjectLinkId, getCompanyUsers, getUserCompanyObjectLinkId } from "@/packages/entities/participants/api";
import { makeAutoObservable } from "mobx";

class AddParticipantsModel {

    allUsers: any[] = []
    attachUsers: any[] = []
    listLoader: boolean = true

    companyId: number = 0
    attachUsersIds: number[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    async pushUser(user: any) {
        // Добавляем пользователя в список прикреплённых

        this.attachUsersIds.push(user.id)
        this.attachUsers.push(user)

        // Получаем id привязки companyObjectLink
        const companyObjectLinkData = await getCompanyObjectLinkId({
            companyId: this.companyId,
            objectId: 14
        });

        // Прикрепляем пользователя к объекту
        const attachUserDate = await attachUser({
            objectCompanyLinkId: companyObjectLinkData.data.id,
            userId: user.id
        });



    }

    async removeUser(id_user: number) {
        try {
            const companyObjectLinkData = await getCompanyObjectLinkId({
                companyId: this.companyId,
                objectId: 14
            });

            const deleteUser = await deleteUserFromObject({ userId: id_user, objectCompanyLinkId: companyObjectLinkData.data.id })

            this.attachUsers = this.attachUsers.filter((item) => {
                return item.id !== id_user
            })

            this.attachUsersIds = this.attachUsers.map((item) => {
                return item.id
            })

        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }

    }

    reset() {
        this.allUsers = []
        this.attachUsers = []
        this.listLoader = true
        this.companyId = 0
    }

    async init(id: number) {

        this.reset()
        this.companyId = id

        try {
            const [usersRes, companyObjectLinkRes] = await Promise.all([
                getCompanyUsers({ id }),
                getCompanyObjectLinkId({ companyId: id, objectId: 14 })
            ]);

            // Список всех пользователей в компании
            this.allUsers = usersRes.data;

            // Метод для получения id привязанных пользователей
            const attachUsersRes = await getBjCompDataId({ objCompLinkId: companyObjectLinkRes.data.id });
            // получаю список ids
            attachUsersRes.data.forEach(element => { this.attachUsersIds.push(element.userId) });
            // Прохожу и получаю подкреплённых
            this.attachUsers = this.allUsers.filter(user =>
                this.attachUsersIds.includes(user.id)
            );

            console.log('Все пользователи:', this.allUsers);
            console.log('Прикрепленные пользователи:', this.attachUsers);

        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    }


    async getUpdateList(updateList: (companyId: number, data: any) => void) {
        updateList(this.companyId, this.attachUsers)
    }
}

export const addParticipantsModel = new AddParticipantsModel()