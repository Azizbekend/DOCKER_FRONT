import { makeAutoObservable } from "mobx";
import { User, UserType } from "../../entities/user/type";
import { InitTriecoCompanyInterface, WaterCompany } from "../../entities/water-company/types";
import { Role } from "../../entities/user/enums";
import { getByUser } from "@/packages/entities/user/api";
import { GetUserById } from "@/app/cores/core-trieco/network/user/user";

export class UserModel {
    private _user: User | UserType | null = null;
    private _waterCompany: WaterCompany | null = null;
    private _isLoading = false;
    private _error: string | null = null;
    private _triecoCompanyId: number | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.initFromStorage();
    }

    get user() {
        return this._user;
    }

    get waterCompany() {
        return this._waterCompany;
    }

    get triecoCompanyId() {
        return this._triecoCompanyId;
    }

    get isLoading() {
        return this._isLoading;
    }

    get error() {
        return this._error;
    }

    get isAuthenticated() {
        return !!this._user && !!this.getToken();
    }

    private initFromStorage() {
        const storedUser = localStorage.getItem("user");
        const storedWaterCompany = localStorage.getItem("waterCompany");
        const storedTriecoCompany = localStorage.getItem("triecoCompany");

        if (storedUser) {
            try {
                this._user = JSON.parse(storedUser);
                if (storedWaterCompany) this._waterCompany = JSON.parse(storedWaterCompany);
                if (storedTriecoCompany) this._triecoCompanyId = JSON.parse(storedTriecoCompany).companyId
            } catch {
                this.clearStorage();
            }
        }
    }

    setUser(user: User | UserType) {
        this._user = user;
        this._error = null;
        localStorage.setItem("user", JSON.stringify(this._user));
    }

    updateUser(updates: Partial<User | UserType>) {
        if (this._user) {
            this._user = { ...this._user, ...updates };
            localStorage.setItem("user", JSON.stringify(this._user));
        }
    }

    async initUser() {
        const token = this.getToken();
        const userId = JSON.parse(localStorage.getItem("user")).id;

        this._isLoading = true;
        this._error = null;

        try {
            if (userId === "99999") {
                this.setUser({
                    id: 99999,
                    login: "Guest",
                    firstName: "Guest",
                    lastName: "Guest",
                    patronymic: "Guest",
                    email: "Guest",
                    phoneNumber: "Guest",
                    adress: "Guest",
                    companyId: 99999,
                    roleId: Role.Guest
                })
            } else {
                // const userResp = await GetUserById({ id: Number(userId) });
                const userResp = await getByUser({ id: Number(userId) })
                this.setUser(userResp.data);
            }
        } catch (error) {
            this._error = "Failed to load user data";
            // this.clearUser();
        } finally {
            this._isLoading = false;
        }
    }

    initCompany(data: WaterCompany) {
        this._waterCompany = data;
        localStorage.setItem("waterCompany", JSON.stringify(data));
    }

    initTriecoCompany(data: InitTriecoCompanyInterface) {
        this._triecoCompanyId = data.companyId
        localStorage.setItem("triecoCompany", JSON.stringify(data));
    }

    logout() {
        this.clearUser();
        window.location.href = '/';
    }

    private clearUser() {
        this._user = null;
        this._error = null;
        this.clearStorage();

    }

    private clearStorage() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user");
        localStorage.removeItem("waterCompanyuser");
    }

    getToken(): string | null {
        return localStorage.getItem("jwtToken") || localStorage.getItem("refresh_token");
    }
}

export const userModel = new UserModel();