import { observer } from "mobx-react-lite";
import orderModel from "./model/order-model";
import { useNavigate, useParams } from "react-router-dom";
import { OrderStatus, OrderStatusText, StatusColor } from "@/app/cores/core-trieco/lib/order";
import { format } from "date-fns";
import { useEffect } from "react";
import headerStore from "../../kernel/helper/header-store";
import { Button } from "@/app/cores/core-trieco/UIKit";
import orderListModel from "../orders/model/order-list-model";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";


export const OrderView = observer(() => {
    const { id } = useParams();
    const { order, init, isCancel, toggleCancel, setIsCancel } = orderModel;
    const navigate = useNavigate();

    useEffect(() => {
        init(Number(id));
        setIsCancel(false);

        headerStore.setTitle(`Заявки`);
        headerStore.setOnBackButtonClick(() => {
            navigate(-1);
            headerStore.clear();
        });

        return () => {
            headerStore.clear();
        };
    }, []);

    useEffect(() => {
        headerStore.setOnBackButtonClick(() => {
            isCancel ? toggleCancel() : navigate(-1);
        });
    }, [isCancel, navigate, toggleCancel]);

    if (!order) return <></>;

    const OrderDetails = () => (
        <div className="p-2 max-w-full max-h-full">
            <div className="p-4 w-full bg-white rounded-xl z-30 relative shadow-[12px_12px_40px_4px_#BCC4CF40]">
                <div className="flex flex-col mb-[14px]">
                    <p className="font-bold text-lg">Подробная информация</p>
                </div>
                <div className="flex flex-col mb-[14px]">
                    <p className="font-bold text-base">Заявка №{id}</p>
                    <span className="font-normal text-base">{order?.adress}</span>
                </div>
                <div className="flex flex-col font-[400] gap-5 leading-[120%] text-[14px] m-auto mb-6">
                    <DataRow label="Статус" value={OrderStatusText[Number(order.orderStatusId) as OrderStatus]} bg_color={Number(order.orderStatusId)} />
                    <DataRow label="№ заявки" value={order?.id} />
                    <DataRow label="Объем" value={`${order?.wasteVolume} куб. метра`} />
                    <DataRow label="Адрес" value={order?.adress || ""} />
                    <DataRow label="Имя Фамилия контактного лица" value={`${order?.userLastName} ${order?.userFirstName} ${order?.userPatronymic || ""}`} />
                    <DataRow label="Контактный телефон" value={order?.userPhone || ""} />
                    <DataRow label="Дата" value={`${format(order?.arrivalStartDate || "", 'dd.MM.yyyy')}`} />
                    <DataRow label="Время вывоза" value={`${format(order?.arrivalStartDate || "", 'HH:mm')}-${format(order?.arrivalEndDate || "", 'HH:mm')}`} />
                    {order?.orderStatusId === 5 ? (
                        <span className="text-[#D80F0F] mt-3 font-bold">Отменен</span>
                    ) : (
                        <Button onClick={() => orderModel.toggleCancel()}
                            class='flex items-center justify-center font-[700] px-[49px] !text-[#D80F0F] py-[10px] rounded-[8px] border-[2px] border-solid border-[#D80F0F]'
                            children="Отменить" />
                    )}
                </div>
            </div>
        </div>
    );

    const CancelOrderModal = () => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black">
            <div className="bg-white z-50 relative rounded-xl shadow-[0px_12px_40px_-4px_#BCC4CF40] p-6 w-11/12 sm:w-[400px]">
                <div className="flex justify-between w-full">
                    <span className="text-[#222B45] font-semibold text-[17px]"></span>
                    <Icon systemName="close" className="cursor-pointer" width={24} height={24} onClick={() => orderModel.toggleCancel()} />
                </div>
                <span className="flex text-xl text-center font-bold mb-[24px] max-w-[200px] mx-auto">Причина отмены заявки</span>
                <div className="leading-none mb-[19px]">
                    <p className='mb-[9px] text-sm font-normal'>Напишите причину отмены заявки</p>
                    <textarea
                        className="resize-none w-full h-[100px] border-2 border-[#D1D5DB] rounded-lg p-4 text-sm font-normal text-[#4A4A4A] focus:outline-none focus:border-[#4A85F6] placeholder:text-[#A1A1A1]"
                    />
                </div>
                <div className="flex flex-col w-full gap-2 items-center">
                    <Button onClick={() => {
                        orderModel.cancelOrder((id) => orderListModel.changeOrderStatus(id, OrderStatus.Cancelled));
                        toggleCancel();
                    }}
                        class="bg-[#4A85F6] flex justify-center !py-3 px-6 w-full font-bold" children="Отправить" />
                </div>
            </div>
        </div>
    );


    return (
        <>
            {isCancel ? <CancelOrderModal /> : null}
            <OrderDetails />
        </>
    );
});

const DataRow: React.FC<{ label: string, value: string | number, bg_color?: number }> = ({ label, value, bg_color }) => {
    const backgroundColor = bg_color ? StatusColor(bg_color) : undefined;

    return (
        <div className="flex justify-between relative">
            <div className="w-1/4 mr-4 text-[#4e4e4e] text-sm">{label}</div>
            <div className="w-2/4 flex justify-start">
                <div
                    className={`self-center text-[#353535] font-semibold text-sm ${backgroundColor ? "text-white text-lg rounded-xl" : "text-left"}`}
                    style={{
                        backgroundColor,
                        padding: backgroundColor ? "4px 14px" : undefined,
                        margin: backgroundColor ? "0px -10px" : undefined,
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
};
