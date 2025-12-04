import bg from '../../kernel/static/img/bg.png'
import { Button, Input } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate } from "react-router-dom"

export const PasswordRecoveryView = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#EBF0FF] w-full h-screen flex flex-col">
            <div className='flex flex-row items-center justify-center gap-5 py-3'>
                <Icon systemName='client-logo' />
                <span className='text-[#0A0A0A] font-bold text-[30px]'>TRIECO</span>
            </div>
            <div className='flex-grow relative overflow-hidden'>
                <img src={bg} className='w-full h-full object-contain -z-10' />
            </div>
            <div className='absolute h-screen w-screen flex justify-center items-center'>
                <div className='flex flex-col bg-white p-9 gap-4 text-[#0D0C22] shadow-[0_0_11px_0_rgba(0, 0, 0, 0.25)] rounded-md max-w-[420px]'>
                    <span className='text-center font-bold text-[22px]'>Забыли пароль?</span>
                    <span className='text-center font-semibold text-[16px]'>Введите адрес электронной почты, с которым вы зарегистрированы.</span>
                    <Input
                        headerText='E-mail'
                        isRequired
                        placeholder=''
                        class='h-[56px] rounded-[10px] pl-[14px]' />
                    <Button
                        children="Восстановить пароль"
                        class='text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4' />
                    <Button onClick={() => { navigate('/registration') }}
                        children="Вернуться"
                        class='!text-[#4A85F6] font-bold flex items-center justify-center rounded-xl border-[#4A85F6] border-[3px] py-4' />
                </div>
            </div>

        </div>
    )
}