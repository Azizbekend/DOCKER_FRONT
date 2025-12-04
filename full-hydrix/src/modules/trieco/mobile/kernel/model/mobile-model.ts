import { Meta } from "@/app/cores/core-trieco/network/meta";
import { User } from "@/app/cores/core-trieco/network/models";
import { GetUserById } from "@/app/cores/core-trieco/network/user/user";
import { makeAutoObservable } from "mobx";

export class MobileModel {
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
        }).catch(() => {
            window.location.href = "/auth";
            window.localStorage.removeItem('refresh-token')
        })
    }

    logout() {
        window.location.href = "/"
        this._user = undefined;
        window.localStorage.removeItem('refresh-token')
        window.localStorage.removeItem('latitude')
        window.localStorage.removeItem('longitude')
        window.localStorage.removeItem('pickup-id')
    }
}

const mobileModel = new MobileModel();
export default mobileModel;