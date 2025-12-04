import { OrderStatus, OrderStatusText, StatusColor } from "@/app/cores/core-trieco/lib/order";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type Props = {
    orderStatusId: number,
    arrivalStartDate: string;
    arrivalEndDate: string;
    title?: string;
    selfCreated?: boolean;
    onDeleteClick?: () => void;
    onClick?: () => void;
}

export const OrderCard = ({ orderStatusId, arrivalEndDate, arrivalStartDate, selfCreated, onDeleteClick, onClick }: Props) => {
    let el = orderStatusId as OrderStatus
    const bgColor = `${StatusColor(el)} `

    const startDate = new Date(arrivalStartDate ?? "")
    const formattedDate = new Date().getDate() === startDate.getDate() ? "Сегодня" : format(startDate, 'd MMMM', { locale: ru });
    return (
        <div className="bg-white rounded-lg p-4 shadow-[0px_12px_40px_-4px_rgba(188,196,207,0.25)] flex flex-col gap-3 z-20" onClick={() => onClick && onClick()}>
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="text-white max-w-fit text-[12px] rounded-3xl py-1 px-3 text-center" style={{ backgroundColor: bgColor }}>
                        {OrderStatusText[el]}
                    </div>
                    <span className="font-bold text-[14px]">
                        Вывоз жбо
                    </span>
                </div>
                <div className="mr-4">
                    {
                        orderStatusId === OrderStatus.New && <Icon systemName="delete" onClick={() => onDeleteClick && onDeleteClick()} />
                    }

                    {
                        selfCreated && <Icon systemName="ambulance"></Icon>
                    }

                </div>
            </div>
            <hr className="border-[#F0F0F0] border-[1px]" />
            <span className="font-semibold text-[12px] text-[#575757]">
                {formattedDate}, {format(arrivalStartDate, 'HH:mm', { locale: ru })}-{format(arrivalEndDate, 'HH:mm', { locale: ru })}
            </span>
        </div>
    )
}