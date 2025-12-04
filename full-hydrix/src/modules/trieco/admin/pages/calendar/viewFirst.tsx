import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { calendarModel } from "./models/calendar-model"
import { getMonthName } from "./utils/monthNames"
import { OrdersLinsPanel } from "./components/orders-lins-panel"
import adminModel from "../../kernel/model/admin-model"

export const CalendarView = observer(() => {


    const { init, getNowDate, getcalendar, nextMonth, prevMonth } = calendarModel
    const [showInfo, setShowInfo] = useState(false)
    const [ordersListDay, setOrdersListDay] = useState<any | null>(null);
    const companyId = adminModel.companyId;

    useEffect(() => {
        if (companyId) {
            init(companyId);
        }
    }, [init])


    const handleRowClick = (orders: any, event: React.MouseEvent) => {
        event.stopPropagation();
        setOrdersListDay(orders);
        setShowInfo(true)
    };

    return <>

        {
            showInfo &&
            <OrdersLinsPanel setShow={setShowInfo} orders={ordersListDay} nowDate={getNowDate} />
        }
        <div className="mt-12 pb-4">
            <span className="text-[34px] font-semibold">График</span>

            <div className="flex flex-col w-[100%] max-w-[1600px] bg-white rounded-lg border-[1px] border-[#EFF4FA] mt-[30px] xl:mt-[68px]">
                <div className="flex items-center justify-center py-[12px] xl:py-[18px]">
                    <Button onClick={() => prevMonth()}>
                        <Icon systemName="arrow-black" className="rotate-180 w-[7px] xl:w-[9px]" />
                    </Button>
                    <p className="font-semibold text-[13px] xl:text-[17px] text-black mx-7 w-[100px] xl:w-[150px] text-center">{getMonthName[getNowDate.month]} {getNowDate.year}</p>
                    <Button onClick={() => nextMonth()}>
                        <Icon systemName="arrow-black" className="w-[7px] xl:w-[9px]" />
                    </Button>
                </div>

                <div className="w-full">
                    <div className="grid grid-cols-[repeat(7,_minmax(0,_1fr))] gap-px bg-[#EFF4FA] ">

                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Понедельник</div>
                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Вторник</div>
                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Среда</div>
                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Четверг</div>
                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Пятница</div>
                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Суббота</div>
                        <div className="text-center bg-[#EFF4FA] py-[12px] xl:py-[20px] text-[#8F9BB3] text-[12px] xl:text-[15px]">Воскресенье</div>

                        {getcalendar[getNowDate.month] &&
                            getcalendar[getNowDate.month].month.days.map((day, index) => (
                                <div className="font-semibold text-[#222B45] flex flex-col items-end gap-1 h-[140px] xl:h-[160px] 2xl:h-[172px] bg-white p-[10px] xl:p-[15px] mb-[1px]" key={index}>
                                    <p className={`flex-1 text-[15px] ${day?.class}`}>{day?.num}</p>

                                    {day?.orders ?
                                        <div className="bg-[#0095FF]  rounded text-white font-semibold py-[10px] pl-[3px] pr-[7px] cursor-pointer gap-[20px]" onClick={(e) => handleRowClick(day?.orders, e)}>
                                            <div className="flex items-center justify-center xl:gap-3 gap-2">
                                                <p className="text-right text-[10px] 2xl:text-[12px] xl:text-[10px]">Общее кол-во заявок</p>
                                                <span className="text-white text-[25px] 2xl:text-[40px] xl:text-[30px]  leading-[27px] 2xl:leading-auto">{day.orders?.length}</span>
                                            </div>
                                            <div className="flex items-center justify-center xl:gap-3 gap-2 mt-2">
                                                <p className="text-right text-[10px] 2xl:text-[12px] xl:text-[10px]">Выполненных заявок</p>
                                                <span className="text-white text-[25px] 2xl:text-[40px] xl:text-[30px]  leading-[27px] 2xl:leading-auto">{day.countDounOrders}</span>
                                            </div>
                                        </div> : null
                                    }
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>
    </>
})