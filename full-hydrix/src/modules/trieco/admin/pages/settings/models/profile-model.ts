import { User } from "@/app/cores/core-trieco/network/models";
import { makeAutoObservable, toJS } from "mobx";
import { updateUser } from "../services/user";
import { ValidationResult } from "@/app/cores/core-trieco/UIKit";
import { emailApprove, emailConfirm } from "@/app/cores/core-trieco/network/user/user";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/user/context";

export class ProfileModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private _isError: boolean = false;
  private _currentUser: User = {
    id: 0,
    login: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    email: "",
    phoneNumber: "",
    adress: "",
    roleId: 0,
    isEmailApproved: false,
  };

  private _sendedCode: string = "";
  private _code: string = "";

  get currentUser() {
    return this._currentUser;
  }

  get isError() {
    return this._isError;
  }

  get code() {
    return this._code;
  }

  init(user: User) {
    this._currentUser = { ...user };
  }

  changeFirstName(value: string) {
    this._currentUser!.firstName = value;
  }

  changeLastName(value: string) {
    this._currentUser!.lastName = value;
  }

  changeMiddleName(value: string) {
    this._currentUser!.patronymic = value;
  }

  changeEmail(value: string, valid?: ValidationResult) {
    this._currentUser!.email = value;
    this._isError = !valid!.success;
  }

  changePhone(value: string) {
    this._currentUser!.phoneNumber = value;
  }

  isChanged(user: User) {
    return (
      user.firstName != this.currentUser?.firstName ||
      user.lastName != this.currentUser?.lastName ||
      user.patronymic != this.currentUser?.patronymic ||
      user.login != this.currentUser?.login ||
      user.phoneNumber != this.currentUser?.phoneNumber ||
      user.email != this.currentUser?.email
    );
  }

  changeCode(value: string) {
    this._code = value;
  }

  async sendConfirmCode() {
    const response = await emailConfirm({
      EmailAddress: this.currentUser?.email || "",
      UserId: this.currentUser?.id || 0,
    });

    this._sendedCode = response.data.code;
  }

  async confirmCode(onConfirm?: () => void) {
    if (this._code != this._sendedCode) {
      toast("Код подверждения неверный", {
        progressStyle: { background: "red" },
      });
      return;
    }

    const response = await emailApprove({ UserId: this.currentUser?.id || 0 });
    if (response.status === 200) {
      this._currentUser!.isEmailApproved = true;
    }
    onConfirm && onConfirm();
  }

  updateUser() {
    updateUser(this.currentUser!).then(() => {
      // useAuth().setUser({ ...this.currentUser });
    });
  }
}

const profileModel = new ProfileModel();
export default profileModel;
