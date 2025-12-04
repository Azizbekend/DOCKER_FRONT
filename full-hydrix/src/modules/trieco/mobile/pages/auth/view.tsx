import { Button, Input } from '@/app/cores/core-trieco/UIKit'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import authModel from './entities/auth-model'
import mobileModel from '../../kernel/model/mobile-model'
import { Password } from '@/app/cores/core-trieco/UIKit/password-input'
import { SelectionComponent } from '../../components/selection'
import { Icon } from '@/app/cores/core-trieco/UIKit/icon'
import bg from '../../kernel/static/img/bg-2.png'
import { CodeInput } from '@/app/cores/core-trieco/UIKit/code-input'
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import { useCallback, useState } from 'react'
import adminModel from '@/modules/admin/kernel/model/admin-model'

const SMARTCAPTCHA_SERVER_KEY = "ysc1_IHj8ZJChzcyjm4fUnmagsKvkQhaCca9GbcS6D3RD979e1b86";

export const AuthView = observer(() => {
    const navigate = useNavigate();
    const { model, canSendAgain,
        changeLogin, changePassword,
        login, canAuthByLogin,
        canSendCode, formattedTime,
        authType, changeCode, code,
        setAuthType, sendCode, changePhone, isCodeSended,
        canAuthByPhone, toggleIsCodeSended, loginByPhone, isError, role,
        attempt, isCapcha, changAttempt, changCapcha,
    } = authModel;

    const { setUser } = mobileModel
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

    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <img src={bg} className='absolute z-0 bg-cover bg-no-repeat w-full h-full' />
            <div className='flex flex-row items-center justify-center gap-5 py-3 w-full bg-white shadow-[0px_4px_4px_0px_#00000040] z-10'>
                <Icon systemName='client-logo' width={24} height={24} />
                <span className='text-[#0A0A0A] font-bold text-[16px]'>TRIECO</span>
            </div>
            <div className='flex items-center justify-center w-full h-full text-[#0D0C22] rounded-md z-10'>
                <div className='flex flex-col shadow-[0_0_11px_0_rgba(0, 0, 0, 0.25)] bg-white mx-4 justify-center gap-2 px-5 py-4 rounded-sm'>
                    {
                        isCodeSended &&
                        <div className='w-full flex items-center justify-center'>
                            <Icon systemName='phone-call' width={27} height={27} />
                        </div>
                    }
                    <span className='text-center font-bold text-[18px] mb-3'>{isCodeSended ? "Вам поступит звонок" : "Вход на сайт"}</span>
                    {!isCodeSended && <SelectionComponent
                        onSelect={(v) => setAuthType(v.value)}
                        itemsStyle="!rounded-[3px] !px-6"
                        items={[{ label: "По логину", value: 1 }, { label: "По телефону", value: 2 }]}
                        className='w-full flex justify-between mb-3' selected={authType} />}
                    {
                        authType === 1 ?
                            <>
                                <span className='font-bold text-[14px]'>Логин</span>
                                <Input
                                    placeholder=''
                                    value={model.username}
                                    onChange={(value) => changeLogin(value)}
                                    class='h-[50px] rounded-[10px] pl-[14px]' />
                                <div className='flex justify-between mt-2'>
                                    <span className='font-bold text-[14px]'>Пароль</span>
                                    {/* <span className='text-[12px] text-[#4A85F6]' onClick={() => navigate('/reset')}>Забыли пароль?</span> */}
                                </div>

                                <Password
                                    value={model.password}
                                    onChange={(value) => changePassword(value)}
                                    class='h-[50px] rounded-[10px] pl-[14px]' />
                                {isError === true && <span className='text-[#CB0D0D]'>Неправильный логин или пароль</span>}
                                <Button onClick={() => { loginStart() }}
                                    disabled={!canAuthByLogin}
                                    children="Войти"
                                    class='text-[14px] mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] !py-3 !px-2' />
                                <Button onClick={() => { navigate('/registration') }}
                                    children="Регистрация"
                                    class='text-[14px] !text-[#3065C9] font-bold flex items-center justify-center rounded-xl border-[#C5C5C5] border-[2px] !py-3 !px-2' />

                                <div className="captcha-container w-full sm:w-auto p-4 sm:p-0">
                                    <InvisibleSmartCaptcha
                                        key={resetCaptcha}
                                        visible={isCapcha}
                                        test={false}
                                        sitekey={SMARTCAPTCHA_SERVER_KEY}
                                        onSuccess={handleSuccess}
                                        onTokenExpired={handleTokenExpired}
                                    />
                                </div>

                            </> :
                            <>
                                {
                                    isCodeSended ?
                                        <>
                                            <span className='text-center w-full text-[#6E6D7ACC] text-[12px]'>Введите в поле последние 4 цифры номера, с которого Вам позвонят</span>
                                            <CodeInput className='w-full justify-between' length={4} onComplete={() => { }} onChange={changeCode} />
                                            <Button onClick={sendCode}
                                                disabled={!canSendAgain}
                                                class='text-[12px] mt-4 font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] !py-2 !px-2'
                                            >
                                                <span className='text-white w-full text-center'>Получить новый код можно через {formattedTime}</span>
                                            </Button>
                                            <Button onClick={loginByPhone}
                                                disabled={!canAuthByPhone}
                                                children="Войти"
                                                class='text-[14px] text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] !py-3 !px-2' />
                                            <Button onClick={toggleIsCodeSended}
                                                children="Изменить номер"
                                                class='text-[14px] !text-[#4A85F6] font-bold flex items-center justify-center rounded-xl bg-transparent !py-3 !px-2' />
                                        </> :
                                        <>
                                            <span className='font-bold text-[14px]'>Номер телефона</span>
                                            <Input
                                                type='phone'
                                                value={model.phone}
                                                onChange={(value) => changePhone(value)}
                                                underlineText='Позвоним на номер с кодом для подтверждения владельца'
                                                class='h-[50px] rounded-[10px] pl-[14px]' />
                                            <Button onClick={sendCode}
                                                disabled={!canSendCode}
                                                children="Получить код"
                                                class='text-[14px] mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] !py-3 !px-2' />
                                            <Button onClick={() => { }}
                                                children="Регистрация"
                                                class='text-[14px] !text-[#3065C9] font-bold flex items-center justify-center rounded-xl border-[#C5C5C5] border-[2px] !py-3 !px-2' />
                                        </>
                                }
                            </>
                    }


                    <span className='font-semibold text-[10px] text-[#0D0C22]'>
                        Авторизуясь на сайте, я принимаю условия <span className='text-[#4A85F6]'>правил сайта</span> и <span className='text-[#4A85F6]'>политики обработки
                            персональных данных</span> и даю согласие на обработку персональных данных в соответствии
                        с законодательством России и пользовательским соглашением.</span>
                </div>

            </div>
        </div>

    )
})