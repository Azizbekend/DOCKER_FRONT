import { Button } from "@/app/cores/core-trieco/UIKit";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import mobileModel from "../../kernel/model/mobile-model";
import ordersListModel from "./model/order-list-model";
import { observer } from "mobx-react-lite";
import { OrderModal } from "./components/order-modal";
import { OrderCard } from './components/order-card';
import { StatusColor, OrderStatusText } from '@/app/cores/core-trieco/lib/order';
import { toast } from "react-toastify";



export const OrdersView = observer(() => {
    const { user } = mobileModel;
    const navigate = useNavigate();
    const { init, model, filteredModel, filter, filterId } = ordersListModel;

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const statuses = Object.keys(OrderStatusText).map((key) => Number(key));
    useEffect(() => {
        init(user?.id ?? 0);
    }, [])


    return (
        <>
            <div className="overflow-hidden">
                <OrderModal isOpen={isOrderModalOpen} setShow={setIsOrderModalOpen} />
                <div className="mt-5 flex flex-col gap-8">
                    <div>
                        <div className="flex flex-row gap-4 items-center overflow-x-auto no-scrollbar pl-5 pr-5">
                            <Button onClick={() => { filter(-1) }} children="Все" class={`text-[14px] ${filterId !== -1 ? "!text-[#999999]" : "!text-[#2879E4] "}`} />
                            <div className="border-r-[1px] border-[#2879E4] w-[2px] h-[24px]" />
                            <div className="flex flex-row gap-4 items-center">
                                <span className="text-[#999999] text-[14px]">Статус: </span>
                                <div className="flex flex-row gap-4 items-center last:mr-5">
                                    {statuses.map((status) => (
                                        <Button
                                            children={OrderStatusText[status]}
                                            onClick={() => { filter(status) }}
                                            class={`!py-1 !px-3 min-w-fit w-full !rounded-[20px] text-white text-[14px]  ${filterId !== 6 && "bg-opacity-20"}`}
                                            style={{ backgroundColor: StatusColor(status) }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 px-4 mt-5">
                            {
                                filteredModel.map(x => (
                                    <OrderCard onClick={() => navigate(`/order/${x.id}`)} arrivalEndDate={x.arrivalEndDate!} arrivalStartDate={x.arrivalStartDate!} orderStatusId={x.orderStatusId || 1} selfCreated={x.selfCreated || false} />
                                ))
                            }
                        </div>
                        {/* <Table columns={columns} data={filterId != -1 ? filteredModel : model} class="" onRowClick={(value) => {orderModel.open(model.find((x: { id: any; }) => x.id === value.id)!); setIsOrderModalOpen(true)}} /> */}
                    </div>
                </div>
            </div>
        </>
    )
})