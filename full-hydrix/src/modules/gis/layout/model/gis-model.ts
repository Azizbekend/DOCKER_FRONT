import { Meta } from "@/app/api/meta";
import WebSocketClient from "@/app/cores/core-gis/network/ws/ws-client";
import { GetUserById } from "@/app/cores/core-trieco/network/user/user";
import { Role } from "@/entities/user/role";
import { User } from "@/entities/user/type";
import { WaterCompany } from "@/entities/water-company/types";
import { makeAutoObservable } from "mobx";


export class GisModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    private _meta: Meta = Meta.INITIAL;
    private _user?: User;
    private _waterCompany?: WaterCompany;
    private _wsClient: WebSocketClient | null = null;


    get meta() {
        return this._meta;
    }

    get user() {
        return this._user;
    }

    get waterCompany() {
        return this._waterCompany
    }

    get wsClient() {
        return this._wsClient;
    }


    setUser(value: any) {
        this._user = value;
    }

    logout() {
        window.localStorage.removeItem('refresh-token');
        this._user = undefined;
        window.location.href = '/auth'
    }

    async init() {
        const response = await GetUserById({ id: Number(window.localStorage.getItem('refresh-token')) })

        if (response.data.roleId != Role.Ministry && response.data.roleId != Role.WaterCompany) {
            window.location.href = "/auth"
            window.localStorage.removeItem("refresh-token")
            throw "Пользователь не найден!";
        }

        if (response.data.roleId === Role.WaterCompany) {
            await getWaterCompanyByUserId({ UserId: response.data.id }).then(watt => {
                this._waterCompany = watt.data
            });
        }

        this.setUser(response.data)
        this._meta = Meta.SUCCESS

        this._wsClient = new WebSocketClient(WsRoute);
        this._wsClient.connect()
    }
}

const gisModel = new GisModel();
export default gisModel;