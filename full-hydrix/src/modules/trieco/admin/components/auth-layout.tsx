import { Icon } from '@/app/cores/core-trieco/UIKit/icon'
import bg from '../kernel/static/img/bg.png'
import { Button, Input } from '@/app/cores/core-trieco/UIKit'
import { observer } from 'mobx-react-lite'
import { Outlet, useNavigate } from 'react-router-dom'

export const AuthLayout = observer(() => {
    const navigate = useNavigate();
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
                <div className='flex flex-col bg-white p-9 gap-2 text-[#0D0C22] shadow-[0_0_11px_0_rgba(0, 0, 0, 0.25)] rounded-md max-w-[420px]'>
                    <span className='text-center font-bold text-[22px]'>Вход на сайт</span>
                    <div className='flex gap-[7px]'>
                        <Button onClick={() => { navigate("/auth") }}
                            children="Клиент"
                            class='font-bold flex items-center justify-center w-full rounded py-2.5 !text-black border-[1px]' />
                        <Button onClick={() => { navigate("/admin/auth") }}
                            children="Перевозчик"
                            class='font-bold flex items-center justify-center w-full rounded py-2.5 bg-[#4A85F6]' />
                    </div>

                    <Outlet />

                    <span className='font-semibold text-[12px] text-[#0D0C22]'>
                        Авторизуясь на сайте, я принимаю условия <span className='text-[#4A85F6]'>правил сайта</span> и <span className='text-[#4A85F6]'>политики обработки
                            персональных данных</span> и даю согласие на обработку персональных данных в соответствии
                        с законодательством России и пользовательским соглашением.</span>
                </div>
            </div>

        </div>
    )
})