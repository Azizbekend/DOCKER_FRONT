import { Button, Input } from "@/app/cores/core-trieco/UIKit";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { observer } from "mobx-react-lite";
import { NowDate, Order } from "../services/calender";
import { OrderCard } from "./order-card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
    setShow: (value: boolean) => void;
    orders: Order[];
    nowDate: NowDate;
};

export const OrdersLinsPanel = observer(({ setShow, orders, nowDate }: Props) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full opacity-[40%] bg-[#192038] z-10"></div>
            <div className="fixed top-0 right-0 h-screen bg-white overflow-y-auto min-w-[500px] max-w-[550px] z-20 flex flex-col">
                <div className="items-center w-[100%] flex justify-between border-b-[1px] border-[#EFF4FA] px-[22px] py-[28px]">
                    <p className="text-[24px] font-semibold leading-none">Подробная информация о заявках</p>
                    <Button class="w-[24px] h-[24ox]" onClick={() => setShow(false)} children={<Icon systemName="close" />} />
                </div>

                <div className="px-[31px] flex flex-col gap-[30px] mb-[55px] pt-[34px]">
                    <p className="font-semibold text-[20px]">Заявки на {format(orders[0].arrivalStartDate, 'd MMMM yyyy', { locale: ru })} года</p>
                    {orders.map(x => (
                        <OrderCard order={x} />
                    ))}
                </div>
            </div>
        </>
    )
})