import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import clientModel from "../../kernel/model/client-model";
import bg from '../../kernel/static/img/bg.png'
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
        <div className="w-full h-screen flex flex-col">
            <div className='flex flex-row items-center justify-center gap-5 py-3 bg-white shadow-[0px_4px_4px_0px_#00000040] z-10'>
                <Icon systemName='client-logo' />
                <span className='text-[#0A0A0A] font-bold text-[30px]'>TRIECO</span>
            </div>
            <div className='flex-grow relative overflow-hidden'>
                <img src={bg} className='w-full h-full object-cover -z-10' />
            </div>
            <div className='absolute h-screen w-screen flex justify-center items-center'>
                <div className='flex flex-col bg-white p-9 gap-2 text-[#0D0C22] shadow-[0px_0px_10.7px_rgba(0,_0,_0,_0.25)] rounded-md items-center min-w-[450px] w-min'>
                    <Icon systemName="mail-blue-check" />
                    <span className='text-center font-bold text-[22px]'>Введите код</span>
                    <span className='text-[14px] text-[#6E6D7ACC] text-center mb-4'>Мы отправили письмо с кодом на почту {params.get('email')}</span>
                    <CodeInput length={7} onComplete={() => { }} onChange={(v) => setCurrentCode(v)} className="gap-2" />
                    {isError === true && <span className='text-[#CB0D0D] text-right w-full'>Неправильный код</span>}
                    {/* {isError === true && <span className='text-[#CB0D0D]'>Неправильный логин или пароль</span>} */}
                    {/* <Button onClick={() => { login(setUser) }}
                        disabled={!canAuth}
                        children="Войти"
                        class='mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4' /> */}
                    <Button onClick={() => { confirm(); }}
                        children="Отправить"
                        class='mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4 w-full' />
                    <hr className="border-[#D1D1D1] border-[1px] w-full mt-3" />
                    <span className='font-semibold text-[12px] text-[#0D0C22] text-justify mt-3'>
                        Регистрируясь на сайте, я принимаю условия <span className='text-[#4A85F6]'>правил сайта</span> и <span className='text-[#4A85F6]'>политики обработки
                            персональных данных</span> и даю согласие на обработку персональных данных в соответствии
                        с законодательством России и пользовательским соглашением.</span>
                </div>
            </div>

        </div>
    )
})