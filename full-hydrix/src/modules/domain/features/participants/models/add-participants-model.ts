import {
    attachUser,
    deleteUserFromObject,
    getBjCompDataId,
    getCompanyObjectLinkId,
    getCompanyUsers
} from "@/packages/entities/participants/api";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class AddParticipantsModel {

    allUsers: any[] = [];
    attachUsers: any[] = [];
    attachUsersIds: number[] = [];

    companyId = 0;
    listLoader = true;

    usersToAttach: number[] = [];
    usersToDetach: number[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    pushUser(user: any) {
        if (this.attachUsersIds.includes(user.id)) return;

        this.attachUsers.push(user);
        this.attachUsersIds.push(user.id);

        this.usersToAttach.push(user.id);
        this.usersToDetach = this.usersToDetach.filter(id => id !== user.id);
    }

    removeUser(userId: number) {
        this.attachUsers = this.attachUsers.filter(u => u.id !== userId);
        this.attachUsersIds = this.attachUsersIds.filter(id => id !== userId);

        this.usersToDetach.push(userId);
        this.usersToAttach = this.usersToAttach.filter(id => id !== userId);
    }

    reset() {
        this.allUsers = [];
        this.attachUsers = [];
        this.attachUsersIds = [];
        this.usersToAttach = [];
        this.usersToDetach = [];
        this.companyId = 0;
        this.listLoader = true;
    }

    async init(companyId: number) {
        this.reset();
        this.companyId = companyId;

        try {
            const [usersRes, companyObjectLinkRes] = await Promise.all([
                getCompanyUsers({ id: companyId }),
                getCompanyObjectLinkId({ companyId, objectId: 14 })
            ]);

            this.allUsers = usersRes.data;

            const attachUsersRes = await getBjCompDataId({
                objCompLinkId: companyObjectLinkRes.data.id
            });

            this.attachUsersIds = attachUsersRes.data.map(e => e.userId);
            this.attachUsers = this.allUsers.filter(u =>
                this.attachUsersIds.includes(u.id)
            );

        } catch (e) {
            console.error("Ошибка инициализации:", e);
        } finally {
            this.listLoader = false;
        }
    }


    async getUpdateList(updateList: (companyId: number, data: any[]) => void) {
        try {
            const companyObjectLinkRes = await getCompanyObjectLinkId({
                companyId: this.companyId,
                objectId: 14
            });

            const linkId = companyObjectLinkRes.data.id;

            await Promise.all([
                ...this.usersToAttach.map(userId =>
                    attachUser({ objectCompanyLinkId: linkId, userId })
                ),
                ...this.usersToDetach.map(userId =>
                    deleteUserFromObject({ objectCompanyLinkId: linkId, userId })
                )
            ]);

            this.usersToAttach = [];
            this.usersToDetach = [];
            updateList(this.companyId, this.attachUsers);

            toast.success("Участники обновились")

        } catch (e) {
            console.error("Ошибка синхронизации пользователей:", e);
        }
    }
}

export const addParticipantsModel = new AddParticipantsModel();
