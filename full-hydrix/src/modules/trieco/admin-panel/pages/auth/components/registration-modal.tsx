import { getFNSData } from "@/core/network/fns/fns";
import { Button, Input, Modal } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { registrationModel } from "../model/register-model";
import { Password } from "@/app/cores/core-trieco/UIKit/password-input";
import PortalModal from "@/app/cores/core-trieco/UIKit/modal/portal";
import clientModel from "@/modules/client/kernel/model/client-model";
import { useNavigate } from "react-router-dom";
import { Role } from "@/app/cores/core-trieco/enums/role";
import { EmailValidation } from "@/app/cores/core-trieco/UIKit/validation";
import { EmailConfirmModel } from "@/modules/client/viewports/emal-confirm/models/confirm-model";

type Props = {
    show: boolean;
    setShow: (value: boolean) => void
}

export const RegistrationModal = observer(({ show, setShow }: Props) => {
    const navigate = useNavigate();
    const { setUser } = clientModel
    const [isCheck, setIsCheck] = useState<boolean>(false)
    const emailConfirmModel = new EmailConfirmModel()

    const {
        handleEnter, changeINN, model, canSave, checkInput,
        changeEmail, changeFirstName, changeLastName,
        changePassword, changePatronymic, changePhone,
        changeRepeatPassword, isPasswordCorrect, save, role, changeRole,
        changeCompanyName, changeShortName, changeOGRN, changeKPP,
        changeDirectorName, changeAdress, registrate
    } = registrationModel;

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
                <PortalModal wrapperId='modal-portal'>
                    <div className={"h-screen w-screen top-0 left-0 fixed  bg-[#192038] bg-opacity-40"}>
                        <div className="flex h-full w-full items-center justify-center">
                            <div className={"flex flex-col bg-white rounded-lg h-[75%] max-h-min overflow-hidden"}>
                                <div className="flex justify-between w-full text-white bg-[#4A85F6] p-5">
                                    <span className="font-bold text-[22px]">Регистрация</span>
                                    <Icon systemName="close-white" className="cursor-pointer" width={24} height={24} onClick={() => setShow(false)} />
                                </div>
                                <div className="overflow-y-auto pb-8">
                                    <div className="px-5 pt-5">

                                        {/* <div className="bg-[#FFEEDF] px-2 py-4 flex flex-row gap-3 rounded-md mb-4">
                                            <Icon systemName="info" />
                                            <span className="text-[#222121] text-[13px] font-semibold">Организация не существует, необходимо скорректировать форму регистрации</span>
                                        </div> */}

                                        <span className="font-bold text-[16px]">Роль пользователя</span>
                                        <div className="flex flex-col gap-[15px] mt-[35px]">
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

                                    <div className="mt-2 px-5 pt-5">
                                        {
                                            role !== Role.Client &&
                                            <div>
                                                <span className="font-bold text-[16px]">Инфромация об организации</span>
                                                <div className="w-full flex gap-[30px] flex-row items-end mt-[35px]">
                                                    <Input
                                                        isRequired
                                                        value={model.inn}
                                                        headerText="ИНН"
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[29.5%]"
                                                        onChange={changeINN}
                                                        lengthOptions={{ maxLength: 10, minLength: 0 }}
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.inn, 10, 10) : ""}
                                                        class='rounded-[4px] pl-[14px]  w-full' />
                                                    <div>
                                                        <Button
                                                            //! disabled={model.inn.length != 10} Когда будет готов бек
                                                            disabled
                                                            children="Получить по ИНН"
                                                            onClick={async () => { handleEnter() }}
                                                            class="!text-white bg-[#4A85F6] rounded-[4px] font-semibold text-[13px] px-2 py-3 w-[200px] !w-fit" />
                                                        <div className="flex flex-col mt-1"></div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-[30px] mt-3">
                                                    <Input
                                                        isRequired
                                                        value={model.companyName}
                                                        onChange={changeCompanyName}
                                                        headerText="Наинменование организации"
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[calc(50%-30px)]"
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.companyName) : ""}
                                                        class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                                    <Input
                                                        isRequired
                                                        value={model.shortName}
                                                        onChange={changeShortName}
                                                        headerText="Сокращенное наименование"
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[calc(50%-30px)]"
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.shortName) : ""}
                                                        class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                                </div>
                                                <div className="flex flex-row gap-[30px] mt-3">
                                                    <Input
                                                        isRequired
                                                        value={model.ogrn}
                                                        onChange={changeOGRN}
                                                        lengthOptions={{ maxLength: 13, minLength: 0 }}
                                                        headerText="ОГРН"
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[calc(100%/3-30px)]"
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.ogrn, 13, 13) : ""}
                                                        class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                                    <Input
                                                        isRequired
                                                        value={model.kpp}
                                                        headerText="КПП"
                                                        onChange={changeKPP}
                                                        lengthOptions={{ maxLength: 9, minLength: 0 }}
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.kpp, 9, 9) : ""}
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[calc(100%/3-30px)]"
                                                        class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                                    <Input
                                                        isRequired
                                                        value={model.directorName}
                                                        onChange={changeDirectorName}
                                                        headerText="ФИО Руководителя"
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[calc(100%/3-30px)]"
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.directorName) : ""}
                                                        class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                                </div>
                                                <div className="flex flex-row gap-[30px] mt-3">
                                                    <Input
                                                        isRequired
                                                        value={model.adress}
                                                        onChange={changeAdress}
                                                        headerText="Адрес организации"
                                                        headerTextStyle="!text-[14px]"
                                                        wrapperClass="w-[calc(100%-30px)]"
                                                        underlineTextStyle="!text-[#CB0D0D]"
                                                        underlineText={isCheck ? checkInput(model.adress) : ""}
                                                        class='disabled:bg-[#eee] rounded-[4px] pl-[14px]  w-full' />
                                                </div>
                                            </div>
                                        }
                                        <div className={`${role === Role.Client ? "" : "mt-[35px]"}`}>
                                            <span className="font-bold text-[16px]">Основная информация</span>
                                            <div className="flex flex-row gap-[30px] mt-[35px]">
                                                <Input
                                                    isRequired
                                                    value={model.lastName}
                                                    onChange={changeLastName}
                                                    headerText="Фамилия"
                                                    headerTextStyle="!text-[14px]"
                                                    wrapperClass="w-[calc(100%/3-30px)]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.lastName) : ""}
                                                    class='rounded-[4px] pl-[14px]  w-full' />
                                                <Input
                                                    isRequired
                                                    value={model.firstName}
                                                    onChange={changeFirstName}
                                                    headerText="Имя"
                                                    headerTextStyle="!text-[14px]"
                                                    wrapperClass="w-[calc(100%/3-30px)]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.firstName) : ""}
                                                    class='rounded-[4px] pl-[14px]  w-full' />
                                                <Input
                                                    value={model.patronymic}
                                                    onChange={changePatronymic}
                                                    headerText="Отчество"
                                                    headerTextStyle="!text-[14px]"
                                                    wrapperClass="w-[calc(100%/3-30px)]"
                                                    class='rounded-[4px] pl-[14px]  w-full' />
                                            </div>
                                            <div className="flex flex-row gap-[30px] mt-2">
                                                <div className="w-[calc(100%/3-30px)] overflow-hidden">
                                                    <Input
                                                        wrapperClass="w-full"
                                                        headerText="E-mail"
                                                        value={model.email}
                                                        onChange={changeEmail}
                                                        isRequired
                                                        validationCallback={EmailValidation}
                                                        headerTextStyle="!text-[14px]"
                                                        underlineText="Будет использоваться в качестве логина"
                                                        class='rounded-[4px] pl-[14px]  w-full' />

                                                    {isCheck &&
                                                        <div className="flex flex-col mt-1"><span className="text-[#CB0D0D] text-[12px] mb-1 ">{checkInput(model.email, 0, 0, "@")}</span></div>
                                                    }


                                                </div>
                                                <Input
                                                    isRequired
                                                    value={model.phoneNumber}
                                                    onChange={changePhone}
                                                    headerText="Телефон"
                                                    type="phone"
                                                    headerTextStyle="!text-[14px]"
                                                    wrapperClass="w-[calc(100%/3-30px)]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.phoneNumber) : ""}
                                                    class='rounded-[4px] pl-[14px]  w-full' />
                                            </div>
                                            <div className="flex flex-row gap-[30px] mt-2">
                                                <Password
                                                    isRequired
                                                    value={model.password}
                                                    onChange={changePassword}
                                                    headerText="Пароль"
                                                    wrapperClass="w-[calc(100%/3-30px)]"
                                                    headerTextStyle="!text-[14px]"
                                                    underlineTextStyle="!text-[#CB0D0D]"
                                                    underlineText={isCheck ? checkInput(model.password) : ""}
                                                    class='rounded-[4px] pl-[14px]  w-full' />
                                                <Password
                                                    isRequired
                                                    value={model.repeatPassword}
                                                    onChange={changeRepeatPassword}
                                                    underlineText={!isPasswordCorrect() ? "Пароли должны совпадать" : undefined}
                                                    headerText="Повторите пароль"
                                                    wrapperClass="w-[calc(100%/3-30px)]"
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
                                            onClick={() => { registrate((id) => { emailConfirmModel.setUserId(id); navigate({ pathname: `/registration/confirm`, search: `?email=${model.email}` }) }); setIsCheck(true) }} />
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
                    </div>
                </PortalModal>
            )}
        </>
    )
})