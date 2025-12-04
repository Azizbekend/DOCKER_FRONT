import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate, useSearchParams } from "react-router-dom"
import bg from '../../kernel/static/img/bg-2.png'
import { CodeInput } from "@/app/cores/core-trieco/UIKit/code-input";
import emailConfirmModel from "./models/confirm-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";


export const EmailConfirmView = observer(() => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const { userId, confirm, sendCode, isConfirmed, isError, setCurrentCode } = emailConfirmModel;

    useEffect(() => {
        sendCode(params.get("email") || "")
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <img src={bg} className='absolute z-0 bg-cover bg-no-repeat w-full h-full' />
            <div className='flex flex-row items-center justify-center gap-5 py-3 w-full bg-white shadow-[0px_4px_4px_0px_#00000040] z-10'>
                <Icon systemName='client-logo' width={24} height={24} />
                <span className='text-[#0A0A0A] font-bold text-[16px]'>TRIECO</span>
            </div>
            <div className='flex items-center justify-center w-full h-full text-[#0D0C22] z-10'>
                <div className='flex flex-col shadow-[0_0_11px_0_rgba(0, 0, 0, 0.25)] bg-white mx-4 justify-center gap-2 px-5 py-4 rounded-md'>
                    <span className='text-center font-bold text-[18px]'>Введите код</span>
                    <span className='text-[12px] text-[#6E6D7ACC] text-center mb-4'>Мы отправили письмо с кодом на почту <span className="font-semibold">{params.get('email')}</span></span>
                    <CodeInput length={7} onComplete={() => { confirm(); }} onChange={(v) => setCurrentCode(v)} />
                    {/* {isError === true && <span className='text-[#CB0D0D] text-rightw w-full'>Неправильный код</span>} */}
                    {/* {isError === true && <span className='text-[#CB0D0D]'>Неправильный логин или пароль</span>} */}
                    {/* <Button onClick={() => { login(setUser) }}
                        disabled={!canAuth}
                        children="Войти"
                        class='mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4' /> */}
                    {/* <Button onClick={() => { confirm(); }}
                        children="Отправить"
                        class='mt-4 text-white font-bold flex items-center justify-center rounded-xl text-[13px] bg-[#4A85F6] py-3 w-full' /> */}
                    <span className='font-semibold text-[11px] text-[#0D0C22] text-justify mt-3'>
                        Регистрируясь на сайте, я принимаю условия <span className='text-[#4A85F6]'>правил сайта</span> и <span className='text-[#4A85F6]'>политики обработки
                            персональных данных</span> и даю согласие на обработку персональных данных в соответствии
                        с законодательством России и пользовательским соглашением.</span>

                </div>

            </div>
        </div>
    )
})