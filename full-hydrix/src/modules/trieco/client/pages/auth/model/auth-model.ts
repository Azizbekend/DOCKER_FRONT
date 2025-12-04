import { makeAutoObservable } from "mobx";
import {
  authorization,
  AuthRequest,
  authAdmin,
} from "../services/auth-service";
import { getUserCompany } from "@/app/cores/core-trieco/network/user/user";
import { Role } from "@/app/cores/core-trieco/enums/role";

export class AuthModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._model = {
      password: "",
      username: "",
    };
  }

  private _model: AuthRequest;
  private _role: string = "client";
  private _isError: boolean = false;

  private _attempt: number = 0;
  private _isCapcha: boolean = false;

  public get isError() {
    return this._isError;
  }

  public get model() {
    return this._model;
  }

  public get role() {
    return this._role;
  }

  public get attempt() {
    return this._attempt;
  }

  public get isCapcha() {
    return this._isCapcha;
  }

  changAttempt(value: number) {
    this._attempt = value;

    if (this._attempt === 3) {
      this.changCapcha(true);
    }
  }

  changCapcha(value: boolean) {
    this._isCapcha = value;
  }

  get canAuth(): boolean {
    return this._model.password != "" && this._model.username != "";
  }

  setRole(value: string) {
    this._role = value;
    this._model.password = "";
    this._model.username = "";
  }

  changeLogin(value: string) {
    this._isError = false;
    this._model.username = value;
  }

  changePassword(value: string) {
    this._isError = false;
    this._model.password = value;
  }

  login(setUser: (value: any) => void) {
    if (this._role === "client") {
      authorization(this._model)
        .then((x) => {
          setUser(x.data);

          if (
            x.data["roleId"] != Role.Client &&
            x.data["roleId"] != Role.CompanytClient
          ) {
            this._isError = true;

            this.changAttempt(++this._attempt);
            return;
          }
          this.changAttempt(0);

          window.localStorage.setItem("refresh-token", x.data["id"]);
          window.localStorage.setItem("access_token", x.data["jwtToken"]);
          window.localStorage.setItem("refresh_token", x.data["refreshToken"]);

          window.location.href = "/";
        })
        .catch((x) => {
          this._isError = true;
          this.changAttempt(++this._attempt);
        });
    } else if (this._role === "carrier") {
      authAdmin(this._model)
        .then(async (x) => {
          try {
            window.localStorage.setItem("access_token", x.data["jwtToken"]);
            window.localStorage.setItem(
              "refresh_token",
              x.data["refreshToken"]
            );

            const companyResponse = await getUserCompany({ UserId: x.data.id });

            window.localStorage.setItem("refresh-token", x.data["id"]);
            this.changAttempt(0);

            if (x.data["roleId"] === Role.CompanyOperator) {
              window.location.href = "/admin/sewers";
              return;
            }

            window.location.href = "/";
          } catch (error) {
            this._isError = true;
            this.changAttempt(++this._attempt);
          }
        })
        .catch((x) => {
          if (x.status !== 200) {
            this._isError = true;
            this.changAttempt(++this._attempt);
            return;
          }
        });
    }
  }
}

const authModel = new AuthModel();
export default authModel;
