import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { observer } from "mobx-react-lite";

import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Input } from "@/shared/ui/Inputs/input-text";
import { Password } from "@/shared/ui/Inputs/input-password";
import { Button } from "@/shared/ui/button";

import loginModel from "./model/login-model";
import { Registration } from "../registration";
import { useAuth } from "@/entities/user/context";
import { Link } from "react-router-dom";

export const LoginView = observer(() => {
    const { initUser, initCompany } = useAuth();

    const [isregister, setIsRegister] = useState<boolean>(false)
    const { model, validError, isLoading, canSubmit, isErrorStart, login, } = loginModel;

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            login(initUser, initCompany);
        },
        [login],
    );

    useEffect(() => {
        console.log(validError.username.length)
    }, [validError.username])

    return (
        <>
            <Registration show={isregister} onClose={() => setIsRegister(false)} />
            <div className="flex bg-white flex-col max-w-[500px] px-14 py-16 rounded-xl w-full gap-4 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]">
                <span className="text-black text-center text-[23px] leading-[46px] font-bold">Авторизация</span>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <InputContainer classNames={{ wrapper: "w-full", header: " flex flex-row-reverse justify-end" }}
                        headerText="Логин"
                        isRequired
                        validText={validError.username}
                    >
                        <Input
                            placeholder="Логин"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.username}
                            onChange={loginModel.setEmail}
                            disabled={isLoading}
                            type="text"
                            isError={isErrorStart && validError.username.length > 0}
                        />
                    </InputContainer>

                    <InputContainer classNames={{ wrapper: "w-full", header: " flex flex-row-reverse justify-end" }}
                        headerText="Пароль"
                        isRequired
                        validText={validError.password}
                    >
                        <Password
                            placeholder="Пароль"
                            classNames={{
                                container: "border-[1.5px] rounded-lg overflow-hidden",
                                input: "px-3 py-3",
                                icon: "mx-3",
                            }}
                            value={model.password}
                            onChange={loginModel.setPassword}
                            disabled={isLoading}
                            isError={isErrorStart && validError.password.length > 0}
                        />
                    </InputContainer>


                    {/* {captchaMessage && (
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-[#C30707] text-[13px]">{captchaMessage}</span>
                        </div>
                    )} */}

                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        class="bg-[#4A85F6] text-center justify-center py-3 shadow-[0px_6px_75px_0px_rgba(100,87,87,0.05)]"
                    >
                        <span className="font-bold text-[16px] text-white">
                            {isLoading ? "Загрузка..." : "Вход"}
                        </span>
                    </Button>

                    <Link to={"/menu-moduls"}>В меню</Link>

                    <div className="cursor-pointer font-semibold text-[var(--clr-accent)] hover:opacity-50 w-fit duration-300" onClick={() => setIsRegister(true)}>Заявка на регистрацию в системе</div>
                </form>

                {/* <div className="flex flex-col gap-1 text-[14px] mt-2">
                    <a className="text-center w-full text-[#4A85F6] duration-300 hover:opacity-50" href="docs/functionSpecifications.pdf" download>
                        Функциональные характеристики ПО
                    </a>

                    <a className='text-center w-full text-[#4A85F6] cursor-pointer' onClick={infoLink}>Информация, необходимая для установки программного обеспечения</a>

                    <a className="text-center w-full text-[#4A85F6] duration-300 hover:opacity-50" href="docs/functionGuide.pdf" download>
                        Информация, необходимая для эксплуатации программного обеспечения
                    </a>
                </div> */}
            </div >
        </>
    );
});