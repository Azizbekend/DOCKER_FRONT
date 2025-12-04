import { Meta } from "@/app/api/meta";
import { WsRoute } from "@/app/cores/core-gis/network/api-routes";
import { GetUserById, getUserCompany } from "@/app/cores/core-trieco/network/user/user";
import WebSocketClient from "@/app/cores/core-trieco/network/ws/ws-client";
import { User } from "@/entities/user/type";
import { makeAutoObservable } from "mobx";

export class AdminModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    private _meta: Meta = Meta.INITIAL;
    private _user?: User;
    private _companyId: number | null = null;
    private _wsClient: WebSocketClient | null = null;

    get meta() {
        return this._meta;
    }

    get user() {
        return this._user;
    }

    get wsClient() {
        return this._wsClient;
    }

    get companyId() {
        return this._companyId;
    }

    setUser(value: any) {
        this._user = value;
    }

    logout() {
        window.localStorage.removeItem('refresh-token');
        this._user = undefined;
        window.location.href = '/auth'


        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refresh_token");
    }


    async init() {
        const token = window.localStorage.getItem('refresh-token')

        // if (!token) {
        //     window.location.href = "/auth"
        // }

        // TODO: Доделать
        const userResp = await GetUserById({ id: Number(window.localStorage.getItem('refresh-token')) })
        this.setUser(userResp.data)

        const companyResp = await getUserCompany({ UserId: Number(window.localStorage.getItem('refresh-token')) })


        this._companyId = companyResp.data.companyId;

        this._wsClient = new WebSocketClient(WsRoute);
        this._wsClient.connect()

        this._meta = Meta.SUCCESS
    }
}

const adminModel = new AdminModel();
export default adminModel;