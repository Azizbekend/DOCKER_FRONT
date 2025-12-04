import { emailApprove, emailConfirm } from "@/app/cores/core-trieco/network/user/user";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

export class EmailConfirmModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    private _isConfirmed: boolean = false;
    private _userId: number = 0;
    private _code: string = "";
    private _currentCode: string = "";
    private _isError: boolean = false;

    get isConfirmed() {
        return this._isConfirmed;
    }

    get code() {
        return this._code;
    }

    get isError() {
        return this._isError;
    }

    get userId() {
        return this._userId;
    }

    setCurrentCode(value: string) {
        this._currentCode = value;
        this._isError = false
    }

    setUserId(value: number) {
        this._userId = value;
    }

    setCode(value: string) {
        this._code = value;
    }

    sendCode(email: string) {
        emailConfirm({
            EmailAddress: email,
            UserId: this._userId,
        }).then(x => { this.setCode(x.data['code']); console.log(this._code) })
    }

    async confirm() {
        if (this.code != this._currentCode) {
            this._isError = true;
            toast("Неправильный код", { progressStyle: { background: "red" } })
            return;
        }

        try {
            const approveResponse = await emailApprove({
                UserId: this._userId
            })
            toast("Почта подтверждена успешно", { progressStyle: { background: "green" } })
            window.location.href = "/auth"
        } catch (error) {
            toast("Неправильный код", { progressStyle: { background: "red" } })
        }
    }
}

const emailConfirmModel = new EmailConfirmModel();

export default emailConfirmModel;