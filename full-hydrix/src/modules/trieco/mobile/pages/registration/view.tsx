import { Icon } from '@/app/cores/core-trieco/UIKit/icon'
import bg from '../../kernel/static/img/bg-2.png'
import { Button, Input } from '@/app/cores/core-trieco/UIKit'
import { observer } from 'mobx-react-lite'
import mobileModel from '../../kernel/model/mobile-model'
import { SelectionComponent } from '../../components/selection'
import { useNavigate } from 'react-router-dom'
import registrationModel from './entities/registration-model'
import { Password } from '@/app/cores/core-trieco/UIKit/password-input'
import emailConfirmModel from '../emal-confirm/models/confirm-model'

export const RegistrationView = observer(() => {
    const navigate = useNavigate();
    const {
        model, changeFirstName,
        changeLastName, changePassword,
        changeRepeatPassword, changeRole,
        changeEmail, registrate, changePhone,
        changeLogin, changeCompanyName,
        checkPassword, canRegistrate
    } = registrationModel;
    const { setUser } = mobileModel
    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            <img src={bg} className='absolute z-0 bg-cover bg-no-repeat w-full h-full' />
            <div className='flex flex-row items-center justify-center gap-5 py-3 w-full bg-white shadow-[0px_4px_4px_0px_#00000040] z-10'>
                <Icon systemName='client-logo' width={24} height={24} />
                <span className='text-[#0A0A0A] font-bold text-[16px]'>TRIECO</span>
            </div>
            <div className='flex items-center justify-center w-full h-full text-[#0D0C22] rounded-md z-10'>
                <div className='flex flex-col shadow-[0_0_11px_0_rgba(0, 0, 0, 0.25)] bg-white mx-4 justify-center gap-2 px-5 py-4 rounded-sm'>
                    <span className='text-center font-bold text-[16px] mb-3'>Регистрация</span>
                    <div className='flex flex-row gap-4'>
                        <Input
                            isRequired
                            headerText='Фамилия'
                            placeholder=''
                            value={model.lastName}
                            onChange={(value) => changeLastName(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                        <Input
                            isRequired
                            headerText='Имя'
                            placeholder=''
                            value={model.firstName}
                            onChange={(value) => changeFirstName(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                        {/* <Input
                            headerText='Отчество'
                            placeholder=''
                            // onChange={(value) => changePhone(value)}
                            class='h-[43] rounded-[10px] pl-[14px]' /> */}
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Input
                            isRequired
                            headerText='Логин'
                            placeholder=''
                            value={model.login}
                            onChange={(value) => changeLogin(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                        <Input
                            headerText='Телефон'
                            placeholder=''
                            type='phone'
                            value={model.phoneNumber}
                            onChange={(value) => changePhone(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Input
                            wrapperClass='w-full'
                            type='email'
                            isRequired
                            headerText='E-mail'
                            placeholder=''
                            value={model.email}
                            onChange={(value) => changeEmail(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Password
                            isRequired
                            headerText='Пароль'
                            placeholder=''
                            value={model.password}
                            onChange={(value) => changePassword(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                        <Password
                            isRequired
                            headerText='Повторите пароль'
                            underlineText={`${!checkPassword ? "Пароли должны совпадать" : ""}`}
                            placeholder=''
                            value={model.repeatPassword}
                            onChange={(value) => changeRepeatPassword(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                    </div>
                    <SelectionComponent items={[{ label: "Клиент", value: 1 }, { label: "Предприятие", value: 5 }]} selected={1} className='mt-4' onSelect={x => { changeRole(x.value); changeCompanyName("") }} />
                    {
                        model.roleId === 5 &&
                        <Input
                            isRequired
                            headerText='Наименование организации'
                            placeholder=''
                            value={model.companyName}
                            onChange={(value) => changeCompanyName(value)}
                            class='h-8 rounded-[10px] pl-2 text-[12px]' />
                    }
                    <div className='flex flex-row justify-between mt-3'>
                        <Button
                            disabled={!canRegistrate()}
                            onClick={() => registrate((id) => { emailConfirmModel.setUserId(id); navigate({ pathname: `/registration/confirm`, search: `?email=${model.email}` }) })}
                            children="Регистрация"
                            class='text-white font-bold flex items-center text-[13px] justify-center rounded-xl bg-[#4A85F6] px-7' />
                        <Button
                            onClick={() => { navigate('/auth') }}
                            children="Отменить"
                            class='!text-[#4A85F6] font-bold flex items-center justify-center rounded-xl bg-whiteborder-[#C5C5C5] border-[1px] text-[13px] px-7' />
                    </div>

                </div>

            </div>
        </div>
    )
})