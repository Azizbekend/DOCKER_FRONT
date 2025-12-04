import { Button, Input, Modal } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { createUserModel } from "../models/create-users-model";
import { Password } from "@/app/cores/core-trieco/UIKit/password-input";
import PortalModal from "@/app/cores/core-trieco/UIKit/modal/portal";
import { useNavigate } from "react-router-dom";
import { Role } from "@/app/cores/core-trieco/enums/role";
import { EmailValidation } from "@/app/cores/core-trieco/UIKit/validation";
import clientModel from "@/modules/trieco/client/kernel/model/client-model";
import { useAuth } from "@/entities/user/context";

type Props = {
    show: boolean;
    setShow: (value: boolean) => void
}

export const CreateModal = observer(({ show, setShow }: Props) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [isCheck, setIsCheck] = useState<boolean>(false)

    const {
        handleEnter, changeINN, model, canSave, checkInput,
        changeEmail, changeFirstName, changeLastName,
        changePassword, changePatronymic, changePhone,
        changeRepeatPassword, isPasswordCorrect, save, role, changeRole,
        changeCompanyName, changeShortName, changeOGRN, changeKPP,
        changeDirectorName, changeAdress, registrate
    } = createUserModel;

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") setShow(false)
    }, [])

    useEffect(() => {
        if (show) {
            document.addEventListener("keydown", handleKeyPress)
            return () => {
                document.removeEventListener("keydown", handleKeyPress)
            }
        }
    }, [handleKeyPress, show])

    return (
        <>
            {show && (
                <>
                    <div className="fixed top-0 left-0 h-full w-full opacity-[40%] bg-[#192038] z-10"></div>
                    <div className="fixed top-0 right-0 h-screen bg-white overflow-y-auto min-w-[500px] max-w-[600px] z-20 flex flex-col">
                        <div className="items-center w-[100%] flex justify-between border-b-[1px] border-[#EFF4FA] px-[22px] py-[28px]">
                            <p className="text-2xl font-semibold leading-none">Создание пользователя</p>
                            <Button class="w-[24px] h-[24ox]" onClick={() => setShow(false)} children={<Icon systemName="close" />} />
                        </div>
                        <div className="overflow-y-auto flex flex-col justify-between  h-full">
                            <div className="overflow-y-auto pb-8 px-[31px] pt-[34px]">
                                <div>
                                    <span className="font-bold text-[16px]">Роль</span>
                                    <div className="flex flex-col gap-[10px] mt-[20px]">
                                        <label className="flex items-center gap-3 cursor-pointer font-semibold w-fit">
                                            <input type="radio" name="tankValue" onChange={() => { changeRole(Role.CompanyOperator); setIsCheck(false) }} checked={role === Role.CompanyOperator} />
                                            <span>Перевозчик</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer font-semibold w-fit">
                                            <input type="radio" name="tankValue" onChange={() => { changeRole(Role.CompanytClient); setIsCheck(false) }} checked={role === Role.CompanytClient} />
                                            <span>Предприятие</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer font-semibold w-fit">
                                            <input type="radio" name="tankValue" onChange={() => { changeRole(Role.Client); setIsCheck(false) }} checked={role === Role.Client} />
                                            <span>Заказчик</span>
                                        </label>
                                    </div>
                                </div>
                                {
                                    role !== Role.Client &&
                                    <div className="mt-[30px]">
                                        <span className="font-bold text-[16px]">Инфромация об организации</span>
                                        <div className="grid grid-cols-2 items-start gap-[10px] mt-[20px]">

                                            <div className="grid grid-cols-2 items-end gap-[10px] col-span-full">
                                                <div className="font-semibold leading-none">
                                                    <p className='mb-[9px]'>ИНН <span className='text-[#D31313]'>* </span></p>
                                                    <Input
                                                        value={model.inn}
                                                        headerTextStyle="!text-[14px]"
                                                        onChange={changeINN}
                                                        lengthOptions={{ maxLength: 10, minLength: 0 }}
                                                        class='rounded-[4px] pl-[14px]  w-full' />
                                                </div>

                                                <button
                                                    onClick={async () => { handleEnter() }}
                                                    disabled={model.inn.length != 10}
                                                    className="!text-white bg-[#4A85F6] rounded-[4px] font-semibold text-[13px] px-5 w-full py-[9px] mb-[4px]"
                                                >Получить по ИНН</button>

                                                {isCheck &&
                                                    <div className="flex flex-col mt-1 mt-[-10px]"><span className="font-semibold text-[#CB0D0D] text-[12px] mb-1 ">{checkInput(model.inn, 10, 10)}</span></div>
                                                }

                                            </div>

                                            <div className="font-semibold leading-none col-span-full">
                                                <p className='mb-[9px]'>Наинменование организации <span className='text-[#D31313]'>* </span></p>
                                                <Input
                                                    value={model.companyName}
                                                    onChange={changeCompanyName}
                                                    headerTextStyle="!text-[14px]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.companyName) : ""}
                                                    class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                            </div>

                                            <div className="font-semibold leading-none">
                                                <p className='mb-[9px]'>Сокращенное наименование <span className='text-[#D31313]'>* </span></p>
                                                <Input
                                                    value={model.shortName}
                                                    onChange={changeShortName}
                                                    headerTextStyle="!text-[14px]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.shortName) : ""}
                                                    class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                            </div>
                                            <div></div>

                                            <div className="font-semibold leading-none">
                                                <p className='mb-[9px]'>ОГРН <span className='text-[#D31313]'>* </span></p>
                                                <Input
                                                    value={model.ogrn}
                                                    onChange={changeOGRN}
                                                    lengthOptions={{ maxLength: 13, minLength: 0 }}
                                                    headerTextStyle="!text-[14px]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.ogrn, 13, 13) : ""}
                                                    class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                            </div>

                                            <div className="font-semibold leading-none">
                                                <p className='mb-[9px]'>КПП <span className='text-[#D31313]'>* </span></p>
                                                <Input
                                                    value={model.kpp}
                                                    onChange={changeKPP}
                                                    lengthOptions={{ maxLength: 9, minLength: 0 }}
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.kpp, 9, 9) : ""}
                                                    headerTextStyle="!text-[14px]"
                                                    class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                            </div>

                                            <div className="font-semibold leading-none col-span-full">
                                                <p className='mb-[9px]'>ФИО Руководителя <span className='text-[#D31313]'>* </span></p>
                                                <Input
                                                    value={model.directorName}
                                                    onChange={changeDirectorName}
                                                    headerTextStyle="!text-[14px]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.directorName) : ""}
                                                    class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                            </div>

                                            <div className="font-semibold leading-none col-span-full">
                                                <p className='mb-[9px]'>Адрес организации <span className='text-[#D31313]'>* </span></p>
                                                <Input
                                                    value={model.adress}
                                                    onChange={changeAdress}
                                                    headerTextStyle="!text-[14px]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.adress) : ""}
                                                    class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                            </div>

                                        </div>
                                    </div>
                                }
                                <div className="mt-[30px]">
                                    <span className="font-bold text-[16px]">Основная информация</span>
                                    <div className="grid grid-cols-2 items-start gap-[10px] mt-[20px]">
                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>Фамилия <span className='text-[#D31313]'>* </span></p>
                                            <Input
                                                value={model.lastName}
                                                onChange={changeLastName}
                                                headerTextStyle="!text-[14px]"
                                                underlineTextStyle="!text-[#CB0D0D]"
                                                underlineText={isCheck ? checkInput(model.lastName) : ""}
                                                class='rounded-[4px] pl-[14px]  w-full' />
                                        </div>

                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>Имя <span className='text-[#D31313]'>* </span></p>
                                            <Input
                                                value={model.firstName}
                                                onChange={changeFirstName}
                                                headerTextStyle="!text-[14px]"
                                                underlineTextStyle="!text-[#CB0D0D]"
                                                underlineText={isCheck ? checkInput(model.firstName) : ""}
                                                class='rounded-[4px] pl-[14px]  w-full' />
                                        </div>

                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>Отчество</p>
                                            <Input
                                                value={model.patronymic}
                                                onChange={changePatronymic}
                                                headerTextStyle="!text-[14px]"
                                                class='rounded-[4px] pl-[14px]  w-full' />
                                        </div>

                                        <div></div>

                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>E-mail <span className='text-[#D31313]'>* </span></p>
                                            <Input
                                                value={model.email}
                                                onChange={changeEmail}
                                                validationCallback={EmailValidation}
                                                headerTextStyle="!text-[14px]"
                                                underlineText="Будет использоваться в качестве логина"
                                                class='rounded-[4px] pl-[14px]  w-full' />

                                            {isCheck &&
                                                <div className="flex flex-col mt-1"><span className="text-[#CB0D0D] text-[12px] mb-1 ">{checkInput(model.email, 0, 0, "@")}</span></div>
                                            }
                                        </div>

                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>Телефон <span className='text-[#D31313]'>* </span></p>
                                            <Input
                                                value={model.phoneNumber}
                                                onChange={changePhone}
                                                type="phone"
                                                headerTextStyle="!text-[14px]"
                                                underlineTextStyle="!text-[#CB0D0D]"
                                                underlineText={isCheck ? checkInput(model.phoneNumber) : ""}
                                                class='rounded-[4px] pl-[14px]  w-full' />
                                        </div>

                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>Пароль <span className='text-[#D31313]'>* </span></p>
                                            <Password
                                                value={model.password}
                                                onChange={changePassword}
                                                headerTextStyle="!text-[14px]"
                                                underlineTextStyle="!text-[#CB0D0D]"
                                                underlineText={isCheck ? checkInput(model.password) : ""}
                                                class='rounded-[4px] pl-[14px]  w-full' />
                                        </div>

                                        <div className="font-semibold leading-none">
                                            <p className='mb-[9px]'>Повторите пароль <span className='text-[#D31313]'>* </span></p>
                                            <Password
                                                value={model.repeatPassword}
                                                onChange={changeRepeatPassword}
                                                underlineText={!isPasswordCorrect() ? "Пароли должны совпадать" : undefined}
                                                headerTextStyle="!text-[14px]"
                                                class='rounded-[4px] pl-[14px]  w-full' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-5 p-5 bg-[#F6F6F6]">
                                {(role === Role.Client || role === Role.CompanytClient) ?
                                    <Button
                                        children="Сохранить"
                                        class="!text-white bg-[#4A85F6] px-4 py-2 font-semibold rounded-xl"
                                        onClick={() => { registrate(setShow); setIsCheck(true) }} />
                                    :
                                    <Button
                                        children="Сохранить"
                                        class="!text-white bg-[#4A85F6] px-4 py-2 font-semibold rounded-xl"
                                        onClick={() => { save(setShow); setIsCheck(true) }} />
                                }
                                <Button children="Отмена" onClick={() => setShow(false)} class="!text-[#4A85F6] font-semibold border-2 border-[#4A85F6] px-7 py-2 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </>

            )}
        </>
    )
})