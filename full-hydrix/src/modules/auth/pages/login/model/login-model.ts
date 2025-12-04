import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { authAdmin, AuthEntity } from "../services/login-service";
import { testEmail } from "@/shared/ui/Inputs/setting/input-valid-email";
import { Role } from "@/entities/user/role";
import { getWaterCompanyByUserId } from "@/app/cores/core-gis/network/water-company/type";
import { WaterCompany } from "@/entities/water-company/types";

class LoginModel {
    model: AuthEntity = { username: "", password: "" };
    validError: AuthEntity = { username: "", password: "" };

    isErrorStart: boolean = false;
    // isCapcha = false;
    // capchaCount = 0;
    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setEmail(value: string) {
        if (this.isErrorStart) this.validEmail(value)
        this.model.username = value;
    }

    validEmail(value: string) {
        this.validError.username = value.length == 0 ? "Поле пустое" : testEmail(value).errorTxt;
        return Boolean(this.validError.username);
    }


    setPassword(value: string) {
        if (this.isErrorStart) this.validPassword(value);
        this.model.password = value;
    }

    validPassword(value: string) {
        this.validError.password = value.length == 0 ? "Поле пустое" : "";
        return Boolean(this.validError.password);
    }

    // setCapcha(value: boolean) {
    //     this.isCapcha = value;
    // }

    // setCapchaCount(value: number) {
    //     this.capchaCount = value;
    //     if (value >= 3) {
    //         this.setCapcha(true);
    //     } else {
    //         this.setCapcha(false);
    //     }
    // }

    // infoLink() {
    //     toast.info(
    //         `Уважаемый пользователь! 
    //   Данное приложение не требует установки. Используйте функции авторизации или регистрации, предусмотренные функционалом приложения.
    //   С информацией об эксплуатации приложения вы можете ознакомиться в соответствующем разделе.`,
    //         { progressStyle: { alignItems: "start", background: "blue" } }
    //     );
    // }

    get canSubmit() {
        const hasCredentials = Boolean(this.model.username?.trim()) && Boolean(this.model.password?.trim());
        return hasCredentials && !this.isLoading;
        // return hasCredentials && !this.isCapcha && !this.isLoading;
    }

    private incrementCapchaAttempts() {
        // this.setCapchaCount(this.capchaCount + 1);
    }


    public async login(initUser: () => void, initCompany: (data: WaterCompany) => void) {
        await authAdmin(this.model)
            .then(response => {


                window.localStorage.setItem("access_token", response.data['jwtToken'])
                window.localStorage.setItem("refresh_token", response.data['refreshToken'])
                window.localStorage.setItem("user_id", response.data['id'])
                initUser()

                switch (response.data.roleId) {
                    case Role.Client:
                        alert("Client")
                        break;
                    case Role.CompanyOperator:
                        alert("CompanyOperator")
                        break;
                    case Role.WaterCompany:
                        alert("WaterCompany")
                        getWaterCompanyByUserId({ UserId: response.data.id }).then(x => {
                            initCompany(x.data)
                            window.location.href = `/gis/company/${x.data.id}`
                        })

                        break;
                    case Role.Ministry:
                        alert("Ministry")
                        window.location.href = '/menu-moduls'
                        break;
                    case Role.Admin:
                        alert("Admin")
                        break;
                }

            })
    }

    async logins() {

        // window.location.href = "/menu-moduls";

        if (this.validEmail(this.model.username) && this.validPassword(this.model.password)) {
            this.isErrorStart = true;
            this.incrementCapchaAttempts();
            return;
        }

        // if (this.isCapcha) {
        //     toast.warn("Подтвердите, что вы не робот.");
        //     return;
        // }

        this.isLoading = true;
        this.isErrorStart = false;

        try {
            // TODO: реализовать сетевой запрос авторизации после подключения API.
            toast.info("Функция авторизации находится в разработке.");
        } catch (error) {
            this.incrementCapchaAttempts();
            toast.error("Не удалось выполнить авторизацию. Повторите попытку позже.");
        } finally {
            setTimeout(() => {
                this.isLoading = false;
            }, 5000);
        }
    }
}

export default new LoginModel();