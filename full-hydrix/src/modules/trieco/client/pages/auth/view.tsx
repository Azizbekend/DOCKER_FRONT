import { Icon } from '@/app/cores/core-trieco/UIKit/icon'
import bg from '../../kernel/static/img/bg.png'
import loginCarrier from '../../kernel/static/img/loginCarrier.png'
import loginClient from '../../kernel/static/img/loginClient.png'
import { Button, Input } from '@/app/cores/core-trieco/UIKit'
import { observer } from 'mobx-react-lite'
import clientModel from '../../kernel/model/client-model'
import { useNavigate } from 'react-router-dom'
import authModel from './model/auth-model'
import { Password } from '@/app/cores/core-trieco/UIKit/password-input'
import { useCallback, useState } from 'react'
import { RegistrationModal } from "./components/registration-modal"
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import adminModel from '@/modules/admin/kernel/model/admin-model'

const SMARTCAPTCHA_SERVER_KEY = "ysc1_IHj8ZJChzcyjm4fUnmagsKvkQhaCca9GbcS6D3RD979e1b86";

export const AuthView = observer(() => {
    const navigate = useNavigate();
    const { model, changeLogin, changePassword, login, canAuth, isError, setRole, role,
        attempt, isCapcha, changAttempt, changCapcha, } = authModel;

    const { setUser } = clientModel

    const [resetCaptcha, setResetCaptcha] = useState<number>(0);

    const loginStart = () => {

        if (attempt === 3) {
            changCapcha(true)
        } else {
            login(role === "client" ? setUser : adminModel.setUser)
        }
    }

    const handleSuccess = useCallback(() => {
        changCapcha(false)
        handleReset()
        changAttempt(0)
    }, []);

    const handleTokenExpired = useCallback(() => {
        handleReset()
        changAttempt(0)
    }, []);

    const handleReset = () => setResetCaptcha((prev) => prev + 1);


    const [showModal, setShow] = useState(false)

    return (
        <>
            <RegistrationModal show={showModal} setShow={setShow} />

            <div className="w-full h-screen flex flex-col">
                <div className='flex flex-row items-center justify-center gap-5 py-3 bg-white shadow-[0px_4px_4px_0px_#00000040] z-10'>
                    <Icon systemName='client-logo' />
                    <span className='text-[#0A0A0A] font-bold text-[30px]'>TRIECO</span>
                </div>
                <div className='flex-grow relative overflow-hidden'>
                    <img src={bg} className='w-full h-full object-cover -z-10' />
                </div>
                <div className='absolute h-screen w-screen flex justify-center items-center'>
                    <div className={`relative mt-[100px] flex ease-in-out duration-300 ${role === "client" ? "translate-x-[35%]" : "-translate-x-[35%]"}`}>
                        <div className={`absolute top-0 left-0 ease-in-out duration-300 h-full ${role === "client" ? "-translate-x-[100%]" : "translate-x-[0%] z-0 "}`}>
                            <img src={loginClient} alt="loginCarrier" className='w-full h-full object-cover' />
                            <div className='absolute bottom-[30px] left-1/2 transform -translate-x-1/2'>
                                <p className='font-bold text-white text-[30px]'>Клиент</p>
                            </div>
                        </div>

                        <div className={` flex flex-col bg-white p-9 gap-2 z-10 text-[#0D0C22] shadow-[0px_0px_10.7px_rgba(0,_0,_0,_0.25)] max-w-[420px]`}>
                            <span className='text-center font-bold text-[22px]'>Вход на сайт</span>
                            <div className='flex gap-[15px]'>
                                <Button onClick={() => setRole("client")}
                                    children="Клиент"
                                    class={`font-bold flex items-center justify-center w-full rounded py-2.5 ${role === "client" ? "bg-[#4A85F6]" : "!text-black border-[1px]"} `} />
                                <Button onClick={() => setRole("carrier")}
                                    children="Перевозчик"
                                    class={`font-bold flex items-center justify-center w-full rounded py-2.5 ${role === "carrier" ? "bg-[#4A85F6]" : "!text-black border-[1px]"} `} />
                            </div>
                            <span className='font-bold text-[16px] w-[322px]'>Логин</span>
                            <Input
                                disabled={isCapcha}
                                value={model.username}
                                onChange={(value) => changeLogin(value)}
                                class='h-[56px] rounded-[10px] pl-[14px]' />
                            <div className='w-[322px] flex justify-between mt-2'>
                                <span className='font-bold text-[16px]'>Пароль</span>
                                <span className='cursor-pointer text-[16px] text-[#4A85F6]' onClick={() => navigate('/reset')}>Забыли пароль?</span>
                            </div>
                            <Password
                                disabled={isCapcha}
                                value={model.password}
                                onChange={(value) => changePassword(value)}
                                class='h-[56px] rounded-[10px] pl-[14px]' />

                            {isError === true && <span className='text-[#CB0D0D]'>Неправильный логин или пароль</span>}
                            <Button onClick={() => { loginStart() }}
                                disabled={!canAuth}
                                children="Войти"
                                class='mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4' />

                            <Button onClick={() => { setShow(true) }}
                                children="Зарегистрироваться"
                                class="!text-[#3065C9] font-bold flex items-center justify-center rounded-xl border-[#C5C5C5] hover:border-[#4A85F6]  border-[1px] py-4" />

                            <InvisibleSmartCaptcha
                                key={resetCaptcha}
                                visible={isCapcha}
                                test={false}
                                sitekey={SMARTCAPTCHA_SERVER_KEY}
                                onSuccess={handleSuccess}
                                onTokenExpired={handleTokenExpired}
                            />


                            <span className='font-semibold text-[12px] text-[#0D0C22]'>
                                Авторизуясь на сайте, я принимаю условия <span className='text-[#4A85F6]'>правил сайта</span> и <span className='text-[#4A85F6]'>политики обработки
                                    персональных данных</span> и даю согласие на обработку персональных данных в соответствии
                                с законодательством России и пользовательским соглашением.</span>
                        </div>

                        <div className={`absolute top-0 right-0 ease-in-out duration-300 h-full ${role === "carrier" ? "translate-x-[100%]" : "translate-x-[0%] z-0 "}`}>
                            <img src={loginCarrier} alt="loginCarrier" className='w-full h-full object-cover' />
                            <div className='absolute bottom-[30px] left-1/2 transform -translate-x-1/2'>
                                <p className='font-bold text-white text-[30px]'>Перевозчик</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})