import { makeAutoObservable } from "mobx";
import { GetUserById } from "@/app/cores/core-trieco/network/user/user";
import { User } from "./type";
import { WaterCompany } from "../water-company/types";

export class UserModel {
    private _user: User | null = null;
    private _waterCompany: WaterCompany | null = null;
    private _isLoading = false;
    private _error: string | null = null;

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
        if (storedUser) {
            try {
                this._user = JSON.parse(storedUser);
            } catch {
                this.clearStorage();
            }
        }
    }

    setUser(user: User) {
        this._user = user;
        this._error = null;
        localStorage.setItem("user", JSON.stringify(user));
    }

    updateUser(updates: Partial<User>) {
        if (this._user) {
            this._user = { ...this._user, ...updates };
            localStorage.setItem("user", JSON.stringify(this._user));
        }
    }

    async initUser() {
        const token = this.getToken();
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) {
            this.clearUser();
            return;
        }

        this._isLoading = true;
        this._error = null;

        try {
            const userResp = await GetUserById({ id: Number(userId) });
            this.setUser(userResp.data);
        } catch (error) {
            this._error = "Failed to load user data";
            this.clearUser();
        } finally {
            this._isLoading = false;
        }
    }

    initCompany(data: WaterCompany) {
        this._waterCompany = data;
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
    }

    getToken(): string | null {
        return localStorage.getItem("jwtToken") || localStorage.getItem("refresh_token");
    }
}

export const userModel = new UserModel();