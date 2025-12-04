import { OrderStatus, OrderStatusText, StatusColor } from "@/app/cores/core-trieco/lib/order";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Order } from "../services/calender";

type Props = {
    order: Order
}

export const OrderCard = ({ order }: Props) => {
    let el = order.orderStatusId as OrderStatus
    const bgColor = `${StatusColor(el)} `

    const startDate = new Date(order.arrivalStartDate ?? "")
    const formattedDate = new Date().getDate() === startDate.getDate() ? "Сегодня" : format(startDate, 'd MMMM yyyy', { locale: ru });

    return (
        <div className="bg-white rounded-[12px] p-4 shadow-[5px_9px_30px_-2px_rgba(34,_34,_35,_0.3)] flex flex-col gap-3 z-20" >
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col gap-3 w-full">
                    <span className="font-bold text-[14px]">Заявка №{order.orderStatusId}</span>

                    <div className="text-white max-w-fit text-[12px] rounded-3xl py-1 px-3 text-center" style={{ backgroundColor: bgColor }}>
                        {OrderStatusText[el]}
                    </div>

                    <div className="grid grid-cols-[40%_1fr]  gap-y-[13px]  w-full ">
                        <span className="font-bold text-[14px]">Адрес</span>
                        <p className="font-light text-[12px]">{order.adress}</p>

                        <span className="font-bold text-[14px]">Исполнитель</span>
                        <p className="font-semibold text-[12px]">{order.userLastName + " " + order.userFirstName + " " + order?.userPatronymic}</p>
                    </div>
                </div>
            </div>
            <hr className="border-[#F0F0F0] border-[1px]" />
            <div className="flex justify-between">
                <span className="font-semibold text-[12px] text-[#575757]">
                    {formattedDate}, {format(order.arrivalStartDate, 'HH:mm', { locale: ru })}-{format(order.arrivalEndDate, 'HH:mm', { locale: ru })}
                </span>

                <span className="font-bold text-[14px]">Объем {order.wasteVolume} м3</span>
            </div>
        </div>
    )
}