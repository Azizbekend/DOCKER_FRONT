import { Meta } from "@/app/api/meta";
import { GetUserById } from "@/app/cores/core-trieco/network/user/user";
import { User } from "@/entities/user/type";
import { makeAutoObservable } from "mobx";

export class ClientModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    private _meta: Meta = Meta.INITIAL;
    private _user?: User;

    get meta() {
        return this._meta;
    }

    get user() {
        return this._user;
    }

    setUser(value: any) {
        this._user = value;
    }

    init() {
        GetUserById({ id: Number(window.localStorage.getItem('refresh-token')) }).then(x => {
            this.setUser(x.data)
            this._meta = Meta.SUCCESS
        }).catch(x => {
            window.location.href = "/auth";
            window.localStorage.removeItem('refresh-token')
        })
    }

    logout() {
        this._user = undefined;
        window.localStorage.removeItem('refresh-token')
        window.localStorage.removeItem('latitude')
        window.localStorage.removeItem('longitude')
        window.localStorage.removeItem('pickup-id')

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refresh_token");
    }
}

const clientModel = new ClientModel();
export default clientModel;