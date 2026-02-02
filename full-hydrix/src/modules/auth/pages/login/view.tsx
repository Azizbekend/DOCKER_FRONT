import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Password } from "@/packages/shared-ui/Inputs/input-password";
import { Button } from "@/packages/shared-ui/button/button";
import loginModel from "./model/login-model";
import { Registration } from "../registration";
import { useAuth } from "@/packages/entities/user/context";
import { toast } from "react-toastify";

export const LoginView = observer(() => {
  const { setUser, initCompany, initTriecoCompany } = useAuth();
  const [isregister, setIsRegister] = useState<boolean>(false);
  const { model, validError, isLoading, canSubmit, isErrorStart, login } = loginModel;

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      login(setUser, initCompany, initTriecoCompany);
    },
    [login],
  );


  useEffect(() => {

    const logoutInfo = localStorage.getItem("logout")
    if (logoutInfo) {
      toast.info(logoutInfo)
    }

    localStorage.clear()
  }, [])

  return (
    <>
      <Registration show={isregister} onClose={() => setIsRegister(false)} />

      {/* Адаптивная обертка */}
      <div className="flex flex-col items-center justify-center p-4">
        <div
          className="bg-white flex flex-col w-full max-w-[500px] rounded-2xl shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] border border-gray-100"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {/* Мобильные отступы */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-2">
                Авторизация
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Войдите в систему для продолжения работы
              </p>
            </div>

            <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
              <InputContainer
                classNames={{
                  wrapper: "w-full",
                  header: "flex flex-row-reverse justify-end text-sm font-medium text-gray-700 mb-2"
                }}
                headerText="Электронная почта"
                isRequired
                validText={validError.username}
              >
                <Input
                  placeholder="Введите электронную почту"
                  className="w-full border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
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
                    container: "w-full border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#4A85F6] transition-all duration-200",
                    input: "px-3 py-2.5 sm:px-4 sm:py-3 text-gray-900 w-full focus:outline-none text-base",
                    icon: "mx-2 sm:mx-3 text-gray-500 cursor-pointer",
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
                class="bg-[#4A85F6] text-center justify-center py-3 sm:py-3.5 text-white font-semibold rounded-lg shadow-[0px_4px_20px_0px_rgba(74,133,246,0.25)] hover:shadow-[0px_6px_25px_0px_rgba(74,133,246,0.35)] transition-all duration-200 w-full"
              >
                <span className="font-bold text-base text-white">
                  {isLoading ? "Загрузка..." : "Вход"}
                </span>
              </Button>

              <div
                className="cursor-pointer font-semibold text-[#4A85F6] hover:text-[#3a6bc9] text-center w-full duration-300 text-sm sm:text-base"
                onClick={() => setIsRegister(true)}
              >
                Заявка на регистрацию в системе
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});