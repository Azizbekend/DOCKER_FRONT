import { observer } from "mobx-react-lite"
import moment from "moment"
import { OrderCard } from "../../components/oder-card";
import orderListModel from "../orders/model/order-list-model";
import { useEffect } from "react";
import mobileModel from "../../kernel/model/mobile-model";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { OrderStatusText, OrderStatus } from "@/app/cores/core-trieco/lib/order";
import advertisement_1 from "../../kernel/static/img/advertisement_1.jpg";
import { Link } from "react-router-dom";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";


export const MainView = observer(() => {
    const { user } = mobileModel;
    const { initMain, model } = orderListModel;

    useEffect(() => {
        initMain(user?.id ?? 0)
    }, [])

    //! УДАЛИТЬ 
    const data = [1, 2]

    return (
        <>

            <div className="absolute w-[112px] h-[112px] left-[-25px] top-[-10%] bg-blue-200 blur-2xl"></div>

            <div className="overflow-hidden relative w-full">
                <div className="absolute w-[112px] h-[112px] left-[-60px] z-[-1] top-[60%] bg-blue-200 blur-2xl"></div>
                <div className="px-5 mt-[5px] flex flex-col">
                    <div className="overflow-x-scroll">
                        <div className="flex flex-row gap-3 justify-between w-fit scroll-h">
                            {data.map((dat, index) => (
                                <div className="w-[272px] h-[195px] overflow-hidden relative rounded-xl">
                                    <div className="absolute flex items-end w-full h-full px-2 py-3 top-0 left-0">
                                        <div className="text-white">
                                            <p className="font-bold text-[12px] mb-1">Гидрикс - чистая вода</p>
                                            <p className="font-regular text-[10px] mb-1">«СМК «Гидрикс» помогает решать важную задачу по созданию эффективных очистных сооружений</p>
                                            <Link to={"https://smkhydrig.ru/"} className="font-regular text-[10px] rounded-full py-[3px] px-[7px] bg-[rgba(255,_255,_255,_0.32)]">Подробнее</Link>
                                        </div>
                                    </div>
                                    <img className="object-cover w-full" src={advertisement_1} alt="advertisement_1" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-x-scroll mt-[26px] mb-3">
                        <div className="flex flex-row gap-3 justify-between w-fit scroll-">
                            {
                                model.map(x => {
                                    const startDate = new Date(x.arrivalStartDate ?? "")
                                    const endDate = new Date(x.arrivalEndDate ?? "")
                                    const formattedDate = format(startDate, 'd MMMM yyyy', { locale: ru });
                                    if (startDate.getDay() === new Date().getDay()) {
                                        return (<OrderCard id={x.id} date={formattedDate} time={`${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`} statusId={x.orderStatusId} status={OrderStatusText[x.orderStatusId as OrderStatus]} title="Вывоз ЖБО" />)
                                    }
                                })
                            }
                        </div>
                    </div>

                    <div className="mb-[21px]">
                        <Link to={"/order/create"} className="bg-[#E03131] rounded-lg font-bold text-white text-[13px] flex items-center w-fit px-4 py-[10px]">Создать заявку <Icon systemName="arrow-left" /> </Link>
                    </div>

                    <div className="flex flex-col gap-5 z-10">
                        <div className="fontPoppins text-[#262626]">Услгуи</div>

                        {/* <div className="flex flex-col rounded-xl p-4 gap-2 shadow-[0_12px_40px_-4px_rgba(188,196,207,0.25)] cursor-pointer bg-white">
                            <span className="font-semibold text-[14px]">Вывоз ЖБО</span>
                            <span className="text-[#575757] text-[12px]">Удаление жидких бытовых отходов</span>
                            <hr className="border-[#F0F0F0] mb-2" />
                        </div> */}

                        <div className="flex flex-col rounded-xl p-4 gap-2 shadow-[0_12px_40px_-4px_rgba(188,196,207,0.25)] cursor-pointer bg-white">
                            <span className="font-semibold text-[14px]">Услуги <span className="text-[#E03131]">(раздел в разработке)</span> </span>
                            <span className="text-[#575757] text-[12px]">Удобные услуги для всех</span>
                            <hr className="border-[#F0F0F0] mb-2" />
                        </div>

                        {/* <div className="flex flex-col rounded-xl p-4 gap-2 shadow-[0_12px_40px_-4px_rgba(188,196,207,0.25)] cursor-pointer bg-white">
                            <span className="font-semibold text-[14px]">Технические условия</span>
                            <span className="text-[#575757] text-[12px]">Предоставление технического условия для подключения к водоснабжению</span>
                            <hr className="border-[#F0F0F0] mb-2" />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
})