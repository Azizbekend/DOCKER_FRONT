
import { Link } from "react-router-dom"
import { observer } from "mobx-react-lite"
import orderListModel from "../orders/model/order-list-model"
import { useEffect, useRef } from "react"
import { format } from "date-fns"
import moment from "moment"
import { ru } from "date-fns/locale"
import { useAuth } from "@/entities/user/context"
import { OrderCard } from "../../layout/oder-card"
import { Button } from "@/shared/ui/button"
import { Icon } from "@/shared/ui/icon"
import useOrderStatus from "@/entities/order/useOrderStatus"
import { Points } from "../../layout/points/points"

moment.locale('ru');

export const MainView = observer(() => {
    const { user } = useAuth();
    const { initMain, modelMain } = orderListModel;


    useEffect(() => {
        user && initMain(user?.id)

        const handleWheel = (event: any) => {
            event.preventDefault();

            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft += event.deltaY;
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleWheel);
            }
        };
    }, [])

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div className="py-16 flex flex-col gap-8">
                <div className="overflow-x-auto w-full pb-1">
                    <div className="flex flex-row gap-5 w-fit" ref={scrollContainerRef}>
                        {modelMain.map(x => {
                            const startDate = new Date(x.arrivalStartDate ?? "")
                            const endDate = new Date(x.arrivalEndDate ?? "")
                            const formattedDate = format(startDate, 'd MMMM yyyy', { locale: ru });
                            return (
                                <OrderCard id={x.id} date={formattedDate} time={`${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`} statusId={x.orderStatusId} status={useOrderStatus().StatusText(x.orderStatusId)} title="Вывоз ЖБО" code={""} />
                            )
                        })}
                    </div>
                </div>

                <Link to={'order/create'} className="bg-[#E03131] rounded-lg px-4 py-3 w-fit text-center flex items-center justify-between hover:opacity-50 duration-300">
                    <span className="text-white">Создать заявку</span>
                    {/* <Icon systemName="arrow-left" /> */}
                </Link>

                <div className="flex flex-col gap-8">
                    <span className="text-[28px] font-semibold">Услуги</span>
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col gap-5 max-w-[420px]">
                            <div className="flex flex-col rounded-xl p-4 gap-2 shadow-[0_12px_40px_-4px_rgba(188,196,207,0.25)] cursor-pointer">
                                <span className="font-semibold text-[20px]">Вывоз ЖБО</span>
                                <span className="text-[#575757] text-[16px]">Удаление жидких бытовых отходов</span>
                                <hr className="border-[#F0F0F0] mb-2" />
                            </div>
                            <div className="flex flex-col rounded-xl p-4 gap-2 shadow-[0_12px_40px_-4px_rgba(188,196,207,0.25)] cursor-pointer">
                                <span className="font-semibold text-[20px]">Услуги</span>
                                <span className="text-[#575757] text-[16px]">Удобные услуги для всех</span>
                                <hr className="border-[#F0F0F0] mb-2" />
                            </div>
                            <div className="flex flex-col rounded-xl p-4 gap-2 shadow-[0_12px_40px_-4px_rgba(188,196,207,0.25)] cursor-pointer">
                                <span className="font-semibold text-[20px]">Технические условия</span>
                                <span className="text-[#575757] text-[16px]">Предоставление технического условия для подключения к водоснабжению</span>
                                <hr className="border-[#F0F0F0] mb-2" />
                            </div>
                        </div>
                        <Points />
                    </div>
                </div>
            </div>
        </div>
    )
})