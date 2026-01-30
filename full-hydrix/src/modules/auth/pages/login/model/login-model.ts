import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { authAdmin, AuthEntity } from "../services/login-service";
import { testEmail } from "@/packages/shared-ui/Inputs/setting/input-valid-email";
import { Role } from "@/packages/entities/user/enums";
import { getWaterCompanyByUserId } from "@/app/cores/core-gis/network/water-company/type";
import { InitTriecoCompanyInterface, WaterCompany } from "@/packages/entities/water-company/types";
import { getUserCompany } from "@/app/cores/core-trieco/network/user/user";
import { authoriseDespetcher } from "@/packages/entities/user/api";

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

    public async login(setUser: (data: any) => void, initCompany: (data: WaterCompany) => void, initTriecoCompany: (data: InitTriecoCompanyInterface) => void) {

        if (this.model.username == "guest") {
            await authAdmin({
                username: "aovks",
                password: "ffggrr",
            }).then(async (response) => {
                window.localStorage.setItem("access_token", response.data['jwtToken'])
                window.localStorage.setItem("refresh_token", response.data['refreshToken'])
                window.localStorage.setItem("user_id", "99999")
                // setUser()

                await getWaterCompanyByUserId({ UserId: response.data.id }).then(x => {
                    initCompany(x.data)
                    setTimeout(() => {
                        window.location.href = '/menu-moduls'
                    }, 1000)
                })

            })

        } else if (false // this.model.username == "ruslam@mail.ru" || // this.model.username == "ggvp@mail.ru" || // this.model.username == "minisrty" || // this.model.username == "aovks"
        ) {
            await authAdmin(this.model)
                .then(response => {

                    window.localStorage.setItem("access_token", response.data['jwtToken'])
                    window.localStorage.setItem("refresh_token", response.data['refreshToken'])
                    window.localStorage.setItem("user_id", response.data['id'])
                    // setUser()

                    switch (response.data.roleId) {
                        case Role.Client:
                            setTimeout(() => {
                                window.location.href = '/trieco/client'
                            }, 1000)
                            break;
                        case Role.CompanyOperator:
                            getUserCompany({ UserId: response.data.id })
                                .then(x => {
                                    initTriecoCompany(x.data)
                                    setTimeout(() => {
                                        window.location.href = '/trieco/admin'
                                    }, 1000)
                                })

                            break;
                        case Role.WaterCompany:
                            getWaterCompanyByUserId({ UserId: response.data.id }).then(x => {
                                initCompany(x.data)
                                setTimeout(() => {
                                    window.location.href = '/menu-moduls'
                                }, 1000)
                            })
                            break;
                        case Role.Ministry:
                            setTimeout(() => {
                                window.location.href = '/menu-moduls'
                            }, 1000)
                            break;
                        case Role.Admin:
                            break;
                    }
                })
        } else {

            try {
                const adminResponse = await authAdmin({
                    username: 'aovks',
                    password: 'ffggrr',
                })

                window.localStorage.setItem('access_token', adminResponse.data.jwtToken)
                window.localStorage.setItem('refresh_token', adminResponse.data.refreshToken)
                window.localStorage.setItem('user_id', adminResponse.data.id)

                await getWaterCompanyByUserId({ UserId: adminResponse.data.id }).then(x => { initCompany(x.data) })


                const response = await authoriseDespetcher({
                    login: this.model.username,
                    password: this.model.password,
                })

                const authDate = new Date().toISOString();
                const user = { ...response.data, id: response.data.userId, dateAuthConnect: authDate }
                setUser(user)

                switch (response.data.baseRoleId) {
                    case Role.Client:
                        setTimeout(() => {
                            window.location.href = '/trieco/client'
                        }, 1000)
                        break

                    case Role.Sewer:
                    case Role.TransporterCompany:
                    case Role.Participant:
                    case Role.Admin:
                        setTimeout(() => {
                            window.location.href = '/menu-moduls'
                        }, 1000)
                        break
                }


            } catch (error) {
                console.log(error)
                toast.error("Неверный логин или пароль")
            }
        }
    }
}

export default new LoginModel();