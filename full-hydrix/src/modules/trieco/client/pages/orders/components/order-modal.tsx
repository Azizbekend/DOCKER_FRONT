import { Button } from "@/app/cores/core-trieco/UIKit/button"
import { observer } from "mobx-react-lite";
import { Input, Modal } from "@/app/cores/core-trieco/UIKit";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import orderModel from "../model/order-model";
import { format } from "date-fns";
import orderListModel from "../model/order-list-model";
import { OrderStatus, StatusColor, OrderStatusText } from "@/app/cores/core-trieco/lib/order";

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
        <Modal title={orderModel.isCancel ? "Подробная информация о заявке" : "Причина отмены"} setShow={setShow} show={isOpen}>
            {orderModel.isCancel ?
                <div className="max-w-[613px]">
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
                        <p className={`rounded-full py-[6px] px-[8px] text-[10px] bg-[${bgColor}] font-normal text-xs flex items-center justify-center leading-normal text-center text-white`} style={{ backgroundColor: bgColor }}>{OrderStatusText[el]}</p>
                    </div>
                    <div className="flex flex-col font-[400] gap-[17px] leading-[120%] mb-[29px]">
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Код</p>
                            <p className="text-[#353535] font-[600]">{order?.code}</p>
                        </div>
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
                            <p className="text-[#353535] font-[600] flex-1">{order?.userLastName} {order?.userFirstName} {order?.userPatronymic}</p>
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
                        order?.orderStatusId === 5 ? <span className="px-[49px] text-[#ad0606] py-[10px]">Отменен</span> : <Button onClick={() => orderModel.setIsCancel()} class='w-[max-content] font-[700] px-[49px] !text-[#ad0606] py-[10px] rounded-[8px] border-[2px] border-solid border-[#ad0606]' children="Отменить" />
                    }
                </div> :
                <>
                    <div className="flex flex-col gap-3">
                        <Input headerText="Напишите причину отмены заявки" />
                        <div className="flex flex-row gap-6 items-center">
                            <Button onClick={() => { orderModel.cancelOrder((id) => orderListModel.changeOrderStatus(id, OrderStatus.Cancelled)); setShow(false); orderModel.setIsCancel() }} children="Отменить" class="bg-[#4A85F6] w-max !py-3 px-6" />
                            <Button onClick={() => orderModel.setIsCancel()} class='w-[max-content] !text-[#4A85F6] font-semibold !py-2 !px-6 rounded-[8px]' children="Назад" />
                        </div>
                    </div>
                </>
            }
        </Modal>
    )
});