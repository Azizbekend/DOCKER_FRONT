import { Button } from "@/app/cores/core-trieco/UIKit"
import { Input } from "@/app/cores/core-trieco/UIKit/input"
import { observer } from "mobx-react-lite"
import profileModel from "../models/profile-model"
import { useEffect, useState } from "react"
import { EditPasswordModal } from "../components/modals/edit-password-modal"
import { EditLoginModal } from "../components/modals/edit-login-modal"
import { EmailValidation } from "@/app/cores/core-trieco/UIKit/validation"
import { EmailConfirmModal } from "../components/modals/email-confirm-modal"
import { useAuth } from "@/entities/user/context"

export const Profile = observer(() => {
    const [isPasswordEditModalShow, setPasswordEditModalShow] = useState(false);
    const [isLoginEditModalShow, setLoginEditModalShow] = useState(false);
    const [isConfirmCodeModalShow, setConfirmCodeModalShow] = useState(false);

    const {
        currentUser: user, changeEmail,
        changeFirstName, changeLastName,
        changeMiddleName, changePhone,
        init, isChanged, isError, updateUser, sendConfirmCode
    } = profileModel;

    useEffect(() => {
        // init(useAuth().user)
    }, [])


    return (
        <div className="flex flex-col gap-6">
            {/* <EditPasswordModal setShow={setPasswordEditModalShow} show={isPasswordEditModalShow} />
            <EditLoginModal setShow={setLoginEditModalShow} show={isLoginEditModalShow} />
            <EmailConfirmModal setShow={setConfirmCodeModalShow} show={isConfirmCodeModalShow} /> */}

            <div className="flex flex-col justify-center border-b-[1px] pb-6 border-[#EAEAEA]">
                <span className="text-[20px] font-bold">
                    Профиль
                </span>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div className="flex flex-row gap-5 items-center">
                        <div className="rounded-[50%] bg-[#D9D9D9] w-14 h-14"></div>
                        <span className="text-[18px]">{useAuth().user?.lastName} {useAuth().user?.firstName} {useAuth().user?.patronymic}</span>
                    </div>

                    <Button class="bg-[#4080FB] bg-opacity-10 !py-3 !px-4 !text-[#4080FB]" children='Изменить изображение' />
                </div>
            </div>
            <div className="flex flex-col gap-6 border-b-[1px] pb-6 border-[#EAEAEA]">
                <span className="text-[16px] font-semibold">Персональные данные</span>
                <div className="flex flex-row gap-6">
                    <Input
                        headerText="Фамилия"
                        placeholder="Иванов"
                        value={user?.lastName}
                        onChange={changeLastName}
                        isRequired
                    />
                    <Input
                        headerText="Имя"
                        placeholder="Иван"
                        value={user?.firstName}
                        onChange={changeFirstName}
                        isRequired
                    />
                    <Input
                        headerText="Отчество"
                        value={user?.patronymic}
                        onChange={changeMiddleName}
                        placeholder="Иванович"
                    />
                </div>
                <div className="flex flex-row gap-6">
                    <Input
                        wrapperClass="w-[250px]"
                        headerText="E-mail"
                        type="email"
                        placeholder="ivanov@mail.ru"
                        value={user?.email}
                        onChange={changeEmail}
                        validationCallback={EmailValidation}
                        isRequired
                    />
                    <Input
                        type="phone"
                        headerText="Моб. телефон"
                        placeholder="+7 (965) 457-45-66"
                        value={user?.phoneNumber}
                        onChange={changePhone}
                        isRequired
                    />
                </div>
                <div>
                    {/* disabled={!isChanged(useAuth().user!) || isError} */}
                    <Button onClick={updateUser} children='Обновить профиль' class="bg-[#4A85F6] rounded-lg !py-3 !px-10 font-bold" />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-[16px] font-semibold">Вход в систему</span>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="font-semibold">{user?.login}</span>
                        <span className="text-[16px] text-[#636161]">Ваш логин для входа в систему</span>
                    </div>
                    <div>
                        <Button onClick={() => setLoginEditModalShow(true)} class="bg-[#4080FB] bg-opacity-10 !py-3 !px-4 !text-[#4080FB]" children='Изменить логин' />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-5 gap-2">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[16px] font-semibold">Подверждение почты</span>
                        <span className="text-[16px] text-[#636161]">Ваша почта <span className={`${user?.isEmailApproved ? "text-[#3ad141] font-semibold" : "text-[#C30707]"}`}>{!user?.isEmailApproved && "не "}подтверждена</span></span>
                    </div>
                    <div>
                        <Button disabled={user?.isEmailApproved} class="bg-[#4080FB] bg-opacity-10 !py-3 !px-4 !text-[#4080FB]" children='Отправить код подтверждения' onClick={() => { setConfirmCodeModalShow(true); sendConfirmCode() }} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-5 gap-2 mb-10">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[16px] font-semibold">Смена пароля</span>
                        <span className="text-[16px] text-[#636161]">Для безопасности вашей учетной записи, регулярно обновляйте пароль</span>
                    </div>
                    <div>
                        <Button class="bg-[#4080FB] bg-opacity-10 !py-3 !px-4 !text-[#4080FB]" children='Изменить пароль' onClick={() => setPasswordEditModalShow(true)} />
                    </div>
                </div>
            </div>
        </div>
    )
})
