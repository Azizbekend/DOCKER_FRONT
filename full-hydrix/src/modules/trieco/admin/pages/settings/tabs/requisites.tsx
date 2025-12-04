import { Button, Input } from "@/app/cores/core-trieco/UIKit"
import { observer } from "mobx-react-lite"
import paymentModel from "../models/payments-model"
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/entities/user/context";

export const Requisites = observer(() => {

    const {
        init, paymentDetails,
        canSave, changeBIK,
        changeBankName, changeCorrAcc,
        changeKPP, changePaymentAccount, save
    } = paymentModel;

    const { user } = useAuth();

    useEffect(() => {
        init(user?.id || 0);
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <span className="text-[20px] font-bold">
                Платежные реквизиты
            </span>
            <div className="flex flex-row gap-7">
                <Input
                    headerText="Расчетный счет"
                    type="text"
                    onChange={changePaymentAccount}
                    lengthOptions={{ maxLength: 20, minLength: 20 }}
                    value={paymentDetails.paymentAccount}
                    isRequired
                />
                <Input
                    headerText="БИК"
                    lengthOptions={{ maxLength: 9, minLength: 9 }}
                    onChange={changeBIK}
                    value={paymentDetails.bik}
                    type="text"
                    isRequired
                />
                <Input
                    headerText="КПП платежный"
                    onChange={changeKPP}
                    lengthOptions={{ maxLength: 9, minLength: 9 }}
                    value={paymentDetails.kpp}
                    type="text"
                    isRequired
                />
            </div>
            <div className="flex flex-row gap-7">
                <Input
                    headerText="Корр. счёт"
                    onChange={changeCorrAcc}
                    lengthOptions={{ maxLength: 20, minLength: 20 }}
                    value={paymentDetails.corresAccount}
                    type="text"
                    isRequired
                />
                <Input
                    onChange={changeBankName}
                    class="w-[300px]"
                    value={paymentDetails.bankName}
                    headerText="Наименование банка"
                    isRequired
                />
            </div>
            <div>
                <Button disabled={!canSave} onClick={() => save((v) => toast(v))} children='Сохранить' class="bg-[#4A85F6] rounded-lg !py-3 !px-10 font-bold" />
            </div>
        </div>
    )
})