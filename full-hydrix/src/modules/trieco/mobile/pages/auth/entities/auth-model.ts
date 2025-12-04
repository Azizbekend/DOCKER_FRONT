import { makeAutoObservable } from "mobx";
import {
  authorization,
  authorizationByPhone,
  AuthRequest,
  getIP,
} from "../services/auth-service";
import { toast } from "react-toastify";
import { Role } from "@/app/cores/core-trieco/enums/role";

export class AuthModel {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._model = {
      password: "",
      username: "",
      phone: "",
    };
  }

  private _model: AuthRequest;
  private _role: string = "client";
  private _isError: boolean = false;

  private _authType: number = 1;

  private _isCodeSended: boolean = false;
  private _currentCode: string = "";
  private _code: string = "";
  private _userId: number = 0;
  private _canSendAgain: boolean = false;

  private timeLeft: number = 0;
  private intervalId: NodeJS.Timeout | null = null;

  private _attempt: number = 0;
  private _isCapcha: boolean = false;

  public get authType() {
    return this._authType;
  }

  public get isError() {
    return this._isError;
  }

  public get model() {
    return this._model;
  }

  public get code() {
    return this._currentCode;
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

  get canAuthByLogin(): boolean {
    return this._model.password != "" && this._model.username != "";
  }

  get canSendCode(): boolean {
    return this._model.phone != "" && this._model.phone.length > 11;
  }

  get canAuthByPhone() {
    return this._code === this._currentCode && this._currentCode != "";
  }

  get isCodeSended() {
    return this._isCodeSended;
  }

  get canSendAgain() {
    return this._canSendAgain;
  }

  toggleIsCodeSended() {
    this._code = "";
    this._isCodeSended = false;
    this._userId = 0;
    this._currentCode = "";
  }

  setAuthType(value: any) {
    this._authType = value;
  }

  changePhone(value: any) {
    this._model.phone = value;
  }

  changeLogin(value: string) {
    this._isError = false;
    this._model.username = value;
  }

  changePassword(value: string) {
    this._isError = false;
    this._model.password = value;
  }

  changeCode(value: string) {
    this._currentCode = value;
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

  sendCode() {
    getIP().then((x) => {
      authorizationByPhone({
        IpAdress: x,
        Phone: this._model.phone,
      })
        .then((x) => {
          this._code = x.data["code"];
          this._userId = x.data["userId"];
          toast("Код был отправлен", {
            progressStyle: { background: "green" },
          });
          this._isCodeSended = true;
          this.startTimer(120);
        })
        .catch(() => {
          toast("Не удалось отправить код", {
            progressStyle: { background: "red" },
          });
        });
    });
  }

  loginByPhone() {
    if (this._code != this._currentCode) {
      toast("Неправильный код");
      return;
    }

    window.location.href = "/";
    window.localStorage.setItem("refresh-token", this._userId.toString());
  }

  login(setUser: (value: any) => void) {
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

        window.location.href = "/";
        window.localStorage.setItem("refresh-token", x.data["id"]);
        this.changAttempt(++this._attempt);
      })
      .catch((x) => {
        this._isError = true;
      });
  }

  startTimer(duration: number) {
    this.timeLeft = duration;
    this._canSendAgain = false;
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this._canSendAgain = true;
    }
  }

  get formattedTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    return `${this.formatTimeUnit(
      minutes,
      "минута",
      "минуты",
      "минут"
    )} ${this.formatTimeUnit(seconds, "секунда", "секунды", "секунд")}`;
  }

  private formatTimeUnit(
    value: number,
    singular: string,
    few: string,
    many: string
  ): string {
    if (value === 1) {
      return `${value} ${singular}`;
    } else if (value >= 2 && value <= 4) {
      return `${value} ${few}`;
    } else {
      return `${value} ${many}`;
    }
  }
}

const authModel = new AuthModel();
export default authModel;
