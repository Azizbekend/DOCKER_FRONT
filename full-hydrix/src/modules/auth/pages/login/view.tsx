import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { observer } from "mobx-react-lite";

import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Password } from "@/packages/shared-ui/Inputs/input-password";
import { Button } from "@/packages/shared-ui/button";

import loginModel from "./model/login-model";
import { Registration } from "../registration";
import { useAuth } from "@/packages/entities/user/context";
import { Link } from "react-router-dom";

export const LoginView = observer(() => {

    const { initUser, initCompany, initTriecoCompany } = useAuth();
    const [isregister, setIsRegister] = useState<boolean>(false)
    const { model, validError, isLoading, canSubmit, isErrorStart, login } = loginModel;

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            login(initUser, initCompany, initTriecoCompany);
        },
        [login],
    );

    useEffect(() => {
        console.log(validError.username.length)
    }, [validError.username])

    return (
        <>
            <Registration show={isregister} onClose={() => setIsRegister(false)} />
            <div className="flex bg-white flex-col max-w-[500px] px-12 py-14 rounded-2xl w-full gap-6 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] border border-gray-100">
                <div className="text-center">
                    <h1 className="text-gray-900 text-2xl font-bold mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        Авторизация
                    </h1>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        Войдите в систему для продолжения работы
                    </p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "flex flex-row-reverse justify-end text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="E-mail"
                        isRequired
                        validText={validError.username}
                    >
                        <Input
                            placeholder="Введите E-mail"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.username}
                            onChange={loginModel.setEmail}
                            disabled={isLoading}
                            type="text"
                            isError={isErrorStart && validError.username.length > 0}
                        />
                    </InputContainer>

                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "flex flex-row-reverse justify-end text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="Пароль"
                        isRequired
                        validText={validError.password}
                    >
                        <Password
                            placeholder="Введите пароль"
                            classNames={{
                                container: "border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#4A85F6] transition-all duration-200",
                                input: "px-4 py-3 text-gray-900 w-full focus:outline-none",
                                icon: "mx-3 text-gray-500 cursor-pointer",
                            }}
                            value={model.password}
                            onChange={loginModel.setPassword}
                            disabled={isLoading}
                            isError={isErrorStart && validError.password.length > 0}
                        />
                    </InputContainer>

                    <Button
                        type="submit"
                        disabled={!canSubmit}
                        class="bg-[#4A85F6] text-center justify-center py-3.5 text-white font-semibold rounded-lg shadow-[0px_4px_20px_0px_rgba(74,133,246,0.25)] hover:shadow-[0px_6px_25px_0px_rgba(74,133,246,0.35)] transition-all duration-200"
                    >
                        <span className="font-bold text-[16px] text-white">
                            {isLoading ? "Загрузка..." : "Вход"}
                        </span>
                    </Button>
                    {/* 
                    <div className="text-center">
                        <Link
                            to={"/menu-moduls"}
                            className="text-[#000000] font-medium hover:text-[#3a6bc9] transition-colors duration-200 block"
                            style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                            В меню
                        </Link>
                    </div> */}

                    <div
                        className="cursor-pointer font-semibold text-[#4A85F6] hover:text-[#3a6bc9] text-center w-full duration-300"
                        onClick={() => setIsRegister(true)}
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                        Заявка на регистрацию в системе
                    </div>
                </form>
            </div>
        </>
    );
});