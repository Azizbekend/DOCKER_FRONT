import { format, parseISO } from 'date-fns';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clientModel from "../../kernel/model/client-model";
import ordersListModel from "./model/order-list-model";
import { observer } from "mobx-react-lite";
import { ru } from "date-fns/locale";
import orderModel from "./model/order-model";
import { Icon } from "@/shared/ui/icon";
import { Order } from "./service/order";
import { formatAddress } from "@/shared/ui/format-adress";
import { OrderStatus } from "@/entities/order/order-status";
import useOrderStatus from "@/entities/order/useOrderStatus";
import { OrderStatusText, StatusColor } from "@/app/cores/core-trieco/lib/order";
import { OrderCard } from "../../layout/oder-card";
import { Table } from "@/shared/ui/table/index";
import { Button } from "@/shared/ui/button";
import { TableColumn } from "@/shared/ui/table/types";
import { useAuth } from '@/entities/user/context';
import { OrderModal } from './components/order-modal';

const columns: TableColumn<Order>[] = [
    // {
    //     header: "",
    //     key: "selfCreated",
    //     cell: ({ selfCreated }) => {
    //         return (
    //             <div style={{ flex: "0 0 50px", textAlign: "center" }}>
    //                 {selfCreated ? (
    //                     <Icon width={30} systemName="ambulance" className="cursor-pointer" />
    //                 ) : (
    //                     <div style={{ width: 30, height: 30 }}></div>
    //                 )}
    //             </div>
    //         );
    //     },
    // },
    {
        header: "Номер заявки",
        key: 'id',
        cell: ({ id }) => {
            return (<div className="text-[#4A66C9] text-[12px] font-bold" > {id}</ div>)
        }
    },
    {
        header: "Адрес",
        key: 'adress',
        cell: ({ adress }) => {
            return (
                <span className="text-[12px]">{adress && formatAddress(adress)}</span>
            )
        },
    },
    {
        header: 'Объём',
        key: 'wasteVolume',
        cell: ({ wasteVolume }) => {
            return (
                <span className="text-[12px]">{wasteVolume} м3</span>
            )
        },

    },
    {
        header: 'Дата и время',
        key: 'arrivalStartDate',
        cell: ({ arrivalStartDate, arrivalEndDate }) => {
            const arrivalStartDateISO = parseISO(arrivalStartDate || "")
            const arrivalEndDateISO = parseISO(arrivalEndDate || "")
            return (
                <span className="text-[12px]">{format(arrivalStartDateISO, 'dd.MM.yyyy')} <br /> {format(arrivalStartDateISO, 'HH:mm')}-{format(arrivalEndDateISO, 'HH:mm')}</span>
            )
        },
    },
    {
        header: 'Дата создания',
        key: 'timeOfPublication',
        cell: ({ timeOfPublication }) => {
            const date = parseISO(timeOfPublication)
            return (
                <div className="text-[12px] text-center">{format(date, 'd MMMM yyyy HH:mm', { locale: ru })}</div>
            )
        },

    },
    {
        header: 'Статус',
        key: 'orderStatusId',
        width: "190px",
        cell: ({ orderStatusId }) => {
            let el = Number(orderStatusId) as OrderStatus

            if (orderStatusId === undefined) {
                el = OrderStatus.Cancelled
            }
            const bgColor = `${useOrderStatus().StatusColor(el)} `
            const style = `text-white rounded-[30px] py-[6px] px-[32px] text-center m-auto w-max whitespace-nowrap`

            return (
                <div className={style} style={{ backgroundColor: bgColor }}>
                    <span>{useOrderStatus().StatusText(el)}</span>
                </div>
            )
        },
    },
    {
        header: 'Код',
        key: 'code',
        cell: ({ code }) => {
            return (
                <span className="text-[12px] w-full text-center font-semibold">{code}</span>
            )
        },
    },
]


export const OrdersView = observer(() => {
    const { user } = useAuth();
    const { initMain, modelMain, init, model, filteredModel, filter, filterId, isInit, toggleInit } = ordersListModel;

    useEffect(() => {
        init(user?.id);
        initMain(user?.id)
        return () => {
            toggleInit()
        }
    }, [])
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const statuses = Object.keys(OrderStatusText).map((key) => Number(key));


    return (
        <>
            <div className="relative">
                <OrderModal isOpen={isOrderModalOpen} setShow={setIsOrderModalOpen} />

                <div className="py-16 flex flex-col gap-8">

                    <div className="overflow-x-auto w-full pb-1">
                        <div className="flex flex-row gap-5 w-fit" ref={scrollContainerRef}>
                            {modelMain.map(x => {
                                const startDate = new Date(x.arrivalStartDate ?? "")
                                const endDate = new Date(x.arrivalEndDate ?? "")
                                const formattedDate = format(startDate, 'd MMMM yyyy', { locale: ru });
                                return (<OrderCard id={x.id} date={formattedDate} time={`${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`} statusId={x.orderStatusId} status={OrderStatusText[x.orderStatusId as OrderStatus]} title="Вывоз ЖБО" code={""} />)
                            })}
                        </div>
                    </div>

                    <Link to={'order/create/map'} className="bg-[#E03131] rounded-lg px-4 py-3 w-fit text-center flex items-center justify-between hover:opacity-50 duration-300">
                        <span className="text-white">Создать заявку</span>
                        {/* <Icon systemName="arrow-left" /> */}
                    </Link>

                    <div>
                        <div className="flex flex-row gap-4 items-center mb-10">
                            <Button onClick={() => { filter(-1) }} children="Все" class={`!text-[#2879E4] text-[16px] ${filterId !== -1 && "!text-[#999999]"}`} />
                            <div className="border-r-[1px] border-[#2879E4] w-[2px] h-[24px]" />
                            <div className="flex flex-row gap-4 items-center">
                                <span className="text-[#999999]">Статус: </span>
                                <div className="flex flex-row gap-4 items-center">
                                    {statuses.map((status) => (
                                        <Button
                                            children={OrderStatusText[status]}
                                            onClick={() => { filter(status) }}
                                            class={`!py-1 !px-3 min-w-fit w-full !rounded-[20px] text-white text-[16px]  ${filterId !== 6 && "bg-opacity-20"}`}
                                            style={{ backgroundColor: StatusColor(status) }} />
                                    ))}

                                </div>
                            </div>
                        </div>
                        <Table
                            columns={columns}
                            data={model.length > 0 ? model : []}
                            onRowClick={(value) => { orderModel.open(model.find(x => x.id === value.id)!); setIsOrderModalOpen(true) }} />
                    </div>
                </div>
            </div>
        </>
    )
})