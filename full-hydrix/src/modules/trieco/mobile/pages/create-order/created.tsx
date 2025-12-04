import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate } from "react-router-dom"
import createOrderModel from "./entities/create-order-model"
import { PageCount } from "./components/page-count"

export const Created = () => {
    const { clearData, pageCounter } = createOrderModel;
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-8 max-w-[80%] items-center justify-center h-max mt-8 mb-8 mx-auto">
            <PageCount page={pageCounter} />
            <Icon systemName="checkmate" />
            <div className="max-w-[550px] flex flex-col gap-7 text-center">
                <span className="font-bold text-[31px]">Спасибо!</span>
                <div>
                    <span className="text-[20px] font-semibold">Ваша заявка успешно оформлена. Следите за её статусом на главной странице или в списке заявок! </span>
                    <span className="text-[20px] font-bold">Номер вашей заявки № 5550</span>
                </div>
            </div>
            <Button onClick={() => { clearData(); navigate('/') }} children={"На главную"} class="bg-[#4A85F6] flex items-center justify-center py-2 px-16" />
        </div>
    )
}