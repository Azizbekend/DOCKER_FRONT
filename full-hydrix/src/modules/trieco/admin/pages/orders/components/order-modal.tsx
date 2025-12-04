import { observer } from "mobx-react-lite";
import { Modal } from "@/app/cores/core-trieco/UIKit";
import { format } from "date-fns";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { OrderStatus, StatusColor, OrderStatusText } from "@/app/cores/core-trieco/lib/order";
import orderModel from "../model/order-model";

type Props = {
    isOpen: boolean;
    setShow: (value: boolean) => void;
}

export const OrderModal = observer(({ isOpen, setShow }: Props) => {
    const { order } = orderModel;

    if (!order) return <></>

    let el = Number(order.orderStatusId) as OrderStatus
    const bgColor = `${StatusColor(el)}`

    return (
        <Modal title={"Подробная информация о заявке"} setShow={setShow} show={isOpen}>
            <>
                <div className="flex">
                    {order.selfCreated && (
                        <div className="mr-4">
                            <Icon systemName="ambulance"></Icon>
                        </div>
                    )}
                    <div className="flex flex-col mb-[14px]">
                        <p className="font-bold text-base leading-[120%]">Заявка на вывоз ЖБО</p>
                        <span className="font-normal">{order?.adress}</span>
                    </div>
                </div>


                <div className="flex gap-[48px] mb-[14px]">
                    <p className="font-normal w-[165px]">Статус</p>
                    <p className={`rounded-full py-[6px] px-[8px] text-[10px] font-normal text-xs flex items-center justify-center leading-normal text-center text-white`} style={{ backgroundColor: bgColor }}>{OrderStatusText[el]}</p>
                </div>
                <div className="flex flex-col font-[400] gap-[17px] leading-[120%] mb-[29px]">
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">№ заявки</p>
                        <p className="text-[#353535] font-[600]">{order?.id}</p>
                    </div>
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">Объем</p>
                        <p className="text-[#353535] font-[600]">{order?.wasteVolume} куб. метра</p>
                    </div>
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">Адрес</p>
                        <p className="text-[#353535] w-[350px] font-[600]">{order?.adress}</p>
                    </div>
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">Имя Фамилия</p>
                        <p className="text-[#353535] font-[600]">{order?.userLastName} {order?.userFirstName} {order?.userPatronymic}</p>
                    </div>
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">Контактный телефон</p>
                        <p className="text-[#353535] font-[600]">{order?.userPhone}</p>
                    </div>
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">Дата</p>
                        <p className="text-[#353535] font-[600]">{format(order?.arrivalStartDate || "", 'dd.MM.yyyy')}</p>
                    </div>
                    <div className="flex gap-[48px]">
                        <p className="text-[#4e4e4e] w-[165px]">Время вывоза</p>
                        <p className="text-[#353535] font-[600]"> {format(order?.arrivalStartDate || "", 'HH:mm')}-{format(order?.arrivalEndDate || "", 'HH:mm')}</p>
                    </div>
                </div>
                {
                    order?.orderStatusId === 5 && <span className="px-[49px] text-[#ad0606] py-[10px]">Отменен</span>
                }
            </>
        </Modal>
    )
});
// orderListModel.changeOrderStatus(id, OrderStatus.Cancelled)); setShow(false); orderModel.setIsCancel()