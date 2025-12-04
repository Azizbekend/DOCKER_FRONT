import { Icon } from '@/app/cores/core-trieco/UIKit/icon'
import bg from '../../kernel/static/img/bg.png'
import { Button, Input } from '@/app/cores/core-trieco/UIKit'
import { observer } from 'mobx-react-lite'
import clientModel from '../../kernel/model/client-model'
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
        changeEmail, registrate,
        changeLogin, changeCompanyName,
        checkPassword, canRegistrate, changePhone
    } = registrationModel;
    const { setUser } = clientModel
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
                <div className='flex flex-col bg-white p-9 gap-4 text-[#0D0C22] shadow-[0_0_11px_0_rgba(0, 0, 0, 0.25)] rounded-md max-w-[720px]'>
                    <span className='font-bold text-[22px]'>Регистрация</span>
                    <div className='flex flex-row gap-8'>
                        <Input
                            isRequired
                            headerText='Фамилия'
                            placeholder=''
                            value={model.lastName}
                            onChange={(value) => changeLastName(value)}
                            class='h-[43px] rounded-[10px] pl-[14px]' />
                        <Input
                            isRequired
                            headerText='Имя'
                            placeholder=''
                            value={model.firstName}
                            onChange={(value) => changeFirstName(value)}
                            class='h-[43] rounded-[10px] pl-[14px]' />
                        {/* <Input
                            headerText='Отчество'
                            placeholder=''
                            class='h-[43] rounded-[10px] pl-[14px]' /> */}
                    </div>
                    <div className='flex flex-row gap-8'>
                        <Input
                            isRequired
                            headerText='Логин'
                            placeholder=''
                            value={model.login}
                            onChange={(value) => changeLogin(value)}
                            class='h-[43px] rounded-[10px] pl-[14px]' />
                        <Input
                            wrapperClass='max-w-[200px]'
                            type='email'
                            isRequired
                            headerText='E-mail'
                            placeholder=''
                            value={model.email}
                            onChange={(value) => changeEmail(value)}
                            class='h-[43px] rounded-[10px] pl-[14px]' />
                        <Input
                            headerText='Телефон'
                            type='phone'
                            value={model.phoneNumber}
                            onChange={(value) => changePhone(value)}
                            class='h-[43] rounded-[10px] pl-[14px]' />
                    </div>
                    <div className='flex flex-row gap-8'>
                        <Password
                            isRequired
                            headerText='Пароль'
                            placeholder=''
                            value={model.password}
                            onChange={(value) => changePassword(value)}
                            class='h-[43px] rounded-[10px] pl-[14px]' />
                        <Password
                            isRequired
                            headerText='Повторите пароль'
                            underlineText={`${!checkPassword ? "Пароли должны совпадать" : ""}`}
                            placeholder=''
                            value={model.repeatPassword}
                            onChange={(value) => changeRepeatPassword(value)}
                            class='h-[43] rounded-[10px] pl-[14px]' />
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
                            class='h-[43] rounded-[10px] pl-[14px]' />
                    }
                    <div className='flex flex-row gap-8 mt-10'>
                        <Button
                            disabled={!canRegistrate()}
                            onClick={() => { registrate((id) => { emailConfirmModel.setUserId(id); navigate({ pathname: `/registration/confirm`, search: `?email=${model.email}` }) }); }}
                            children="Регистрация"
                            class='text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-3 px-6' />
                        <Button
                            onClick={() => { navigate('/auth') }}
                            children="Отменить"
                            class='!text-[#4A85F6] font-bold flex items-center justify-center rounded-xl bg-white py-3 px-6 border-[#C5C5C5] border-[1px]' />
                    </div>

                </div>
            </div>

        </div>
    )
})