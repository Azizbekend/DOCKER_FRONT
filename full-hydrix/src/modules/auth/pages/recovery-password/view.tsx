import bg from '../../kernel/static/img/bg.png'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"
import recoveryModel from './model/recovery-model'
import { useEffect } from 'react'

export const PasswordRecoveryView = observer(() => {
    const navigate = useNavigate();
    // const { canSend, changeEmail, email, recovery } = recoveryModel;


    return (
        <div className="w-full h-screen flex flex-col">
            {/* <div className='flex flex-row items-center justify-center gap-5 py-3 bg-white shadow-[0px_4px_4px_0px_#00000040] z-10'>
                <Icon systemName='client-logo' />
                <span className='text-[#0A0A0A] font-bold text-[30px]'>TRIECO</span>
            </div>
            <div className='flex-grow relative overflow-hidden'>
                <img src={bg} className='w-full h-full object-cover -z-10' />
            </div>
            <div className='absolute h-screen w-screen flex justify-center items-center'>
                <div className='flex flex-col bg-white p-9 gap-4 text-[#0D0C22] shadow-[0px_0px_10.7px_rgba(0,_0,_0,_0.25)] rounded-md items-center min-w-[442px] w-min'>
                    <span className='text-center font-bold text-[22px] mb-5'>Забыли пароль?</span>
                    <span className='text-center font-semibold text-[16px] min-w-[290px] w-min'>Введите адрес электронной почты, с которым вы зарегистрированы.</span>
                    <div className="w-full">
                        <Input
                            onChange={(v) => changeEmail(v)}
                            value={email}
                            type='email'
                            headerText='E-mail'
                            isRequired
                            placeholder=''
                            class='h-[56px] !w-full block' />
                    </div>
                    <Button
                        disabled={!canSend}
                        onClick={recovery}
                        children="Восстановить пароль"
                        class='text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4 w-full' />
                    <hr className="border-[#D1D1D1] border-[1px] w-full" />

                    <Button onClick={() => { navigate('/auth') }}
                        children="Вернуться на страницу авторизации"
                        class='!text-[#4A85F6] font-bold flex items-center justify-center rounded-xl border-[#4A85F6] border-[3px] py-4 w-full' />
                </div>
            </div> */}
        </div>
    )
})