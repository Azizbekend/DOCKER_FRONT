import { useEffect, useState } from "react";
import headerStore from "../../kernel/helper/header-store";
import createOrderModel from "./entities/create-order-model";
import mobileModel from "../../kernel/model/mobile-model";
import { Button, Input } from "@/app/cores/core-trieco/UIKit";
import adminModel from "@/modules/admin/kernel/model/admin-model";
import { observer } from "mobx-react-lite";
import { PageCount } from "./components/page-count";


export const Cashless = observer(() => {
    const [coordinates, setCoordinates] = useState<[number, number]>();
    const [isCheck, setIsCheck] = useState<boolean>(false)
    const { user } = mobileModel;

    const { pageCounter, modelPay, checkInput, changeCardNumber, changeAddress, changeMonthDate, changeYearDate,
        changeName, changeCVC, changeEmail, save, setPage, getPoints, cost } = createOrderModel;

    useEffect(() => {
        headerStore.setOnBackButtonClick(() => { setPage(2); headerStore.setOnBackButtonClick(undefined), headerStore.setTitle("Создание заявки") })
        if (user?.roleId !== 5) return;
        getPoints(user?.id || 0)

        return () => {
            headerStore.setOnBackButtonClick(undefined);
        }
    }, [])

    return (
        <div className='px-5 w-[100%] flex flex-col justify-between pb-5 max-w-[400px] mx-auto'>
            <div className="flex flex-col gap-5">

                <PageCount page={pageCounter} />



                <div className="mt-5">
                    <span className="font-bold text-[22px] leading-4">Оплата картой</span>
                </div>
                <Input
                    headerText="Номер карты" isRequired
                    onChange={(v) => changeCardNumber(v)}
                    lengthOptions={{ minLength: 19, maxLength: 19 }}
                    value={modelPay.cardNumber} class="text-[13px]" headerTextStyle="!text-[13px]"
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck ? checkInput(modelPay.cardNumber, 19, 19) : ""} />
                <div>
                    <span className="font-semibold text-[13px] mb-1 ">Срок действия<span className="text-[#C30707]">*</span></span>
                    <div className="flex gap-1.5">
                        <Input
                            lengthOptions={{ minLength: 2, maxLength: 2 }}
                            onChange={(v) => changeMonthDate(v)} wrapperClass="w-[17%]"
                            value={modelPay.monthDate} class="text-[13px]" headerTextStyle="!text-[13px]" />
                        <Input
                            lengthOptions={{ minLength: 2, maxLength: 2 }}
                            onChange={(v) => changeYearDate(v)} wrapperClass="w-[17%]"
                            value={modelPay.yearDate} class="text-[13px]" headerTextStyle="!text-[13px]" />
                    </div>

                    {isCheck ?
                        <>
                            <div className="flex flex-col mt-1"><span className="text-[#CB0D0D] text-[12px] mb-1 ">{checkInput(modelPay.monthDate, 2, 2)}</span></div>
                            <div className="flex flex-col mt-1"><span className="text-[#CB0D0D] text-[12px] mb-1 ">{checkInput(modelPay.yearDate, 2, 2)}</span></div>
                        </>
                        : ""}
                </div>
                <div>
                    <div className="flex gap-1.5">
                        <Input
                            wrapperClass="w-[80%]" isRequired
                            headerText="Имя владельца"
                            onChange={(v) => changeName(v)}
                            value={modelPay.name} class="text-[13px]" headerTextStyle="!text-[13px]"
                            underlineTextStyle="!text-[#CB0D0D]"
                            underlineText={isCheck && checkInput(modelPay.name) ? "Обязательное поле" : ""} />
                        <Input
                            wrapperClass="w-[20%]" isRequired
                            headerText="CVC"
                            onChange={(v) => changeCVC(v)}
                            value={modelPay.cvc} class="text-[13px]" headerTextStyle="!text-[13px]"
                            underlineTextStyle="!text-[#CB0D0D]"
                            underlineText={isCheck ? checkInput(modelPay.cvc, 3, 3) : ""} />
                    </div>
                </div>

                <Input
                    type="email"
                    headerText="E-mail для квитанции" isRequired
                    onChange={changeEmail}
                    value={modelPay.email} class="text-[13px]" headerTextStyle="!text-[13px]"
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck ? checkInput(modelPay.email) : ""} />

                <div className="font-bold text-[13px]">
                    <p>Стоимость: </p>
                    <p className="font-semibold text-[20px] mt-5 mb-7">{cost} руб.</p>
                </div>
            </div>

            <Button children="Оформить заявку" onClick={() => { save(user?.id ?? 0, adminModel.companyId ?? null); setIsCheck(true); }}
                class='bg-[#4A85F6] rounded-lg w-full flex items-center justify-center font-bold text-[17px]' />
        </div>
    )
})