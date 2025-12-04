import { Button } from "@/app/cores/core-trieco/UIKit/button"
import { Input } from "@/app/cores/core-trieco/UIKit/input"
import authModel from "../viewports/auth/model/auth-model"
import { observer } from "mobx-react-lite"
import { RegistrationModal } from "../viewports/auth/components/registration-modal"
import { Password } from "@/app/cores/core-trieco/UIKit/password-input"
import { useState } from "react"
import { RecoveryModal } from "../viewports/auth/components/recovery-modal"

export const AuthForm = observer(() => {
    const { changeLogin, changePassword, model, login, isError, canAuth } = authModel;
    const [showModal, setShow] = useState(false)
    const [showRecoveryModal, setRecoveryModal] = useState(false)

    return (
        <>
            <RegistrationModal show={showModal} setShow={setShow} />
            <RecoveryModal setShow={setRecoveryModal} show={showRecoveryModal} />
            <span className='font-bold text-[16px] w-[322px]'>Логин</span>
            <Input
                value={model.username}
                onChange={(value) => { changeLogin(value) }}
                class="h-[56px] rounded-[10px] pl-[14px]" />

            <div className='w-[322px] flex justify-between mt-2'>
                <span className='font-bold text-[16px]'>Пароль</span>
                <span className='cursor-pointer text-[16px] text-[#4A85F6]' onClick={() => { setRecoveryModal(true) }}>Забыли пароль?</span>
            </div>
            <Password
                value={model.password}
                onChange={(value) => changePassword(value)}
                class='h-[56px] rounded-[10px] pl-[14px]' />

            {isError === true && <span className='text-[#CB0D0D]'>Неправильный логин или пароль</span>}
            <Button onClick={() => { login() }}
                disabled={!canAuth}
                children="Войти"
                class="mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4" />
            <Button onClick={() => { setShow(true) }}
                children="Регистрация"
                class="!text-[#3065C9] font-bold flex items-center justify-center rounded-xl border-[#4A85F6] border-[3px] py-4" />
        </>
    )
})