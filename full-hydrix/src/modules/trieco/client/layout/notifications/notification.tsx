import { Icon } from "@/shared/ui/icon";
import notificationModel from "./model/notification-model"
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

export const NotificationList = observer(() => {
    const { isShow, notifications, setShow } = notificationModel;
    return (

        isShow &&
        <div className="absolute top-full z-20 shadow-[0px_0px_15.5px_0px_rgba(0,0,0,0.25)] bg-white p-6 min-w-[350px]">
            <div className="flex flex-row justify-between items-center">
                <span className="font-semibold text-[16px]">Уведомления</span>
                <Icon systemName="close" className="cursor-pointer" onClick={() => setShow(false)} />
            </div>
            <div className="mt-6 flex flex-col gap-3">
                {
                    notifications.map(x =>
                        <div className="border-[#00000036] border-[1px] rounded-md py-1 px-2 flex flex-col">
                            <span className="text-[10px] text-[#BABABA] font-semibold">{format(x.date, 'dd.MM.yyyy kk:mm')}</span>
                            <span className="text-[12px] text-[#262626] font-semibold">{x.message}</span>
                        </div>
                    )
                }
                {/* <div className="border-[#00000036] border-[1px] rounded-md py-1 px-2 flex flex-col">
                    <span className="text-[10px] text-[#BABABA] font-semibold">27.04.2024, 10:00 </span>
                    <span className="text-[12px] text-[#262626] font-semibold">Оцените качество</span>
                </div>
                <div className="border-[#00000036] border-[1px] rounded-md py-1 px-2 flex flex-col">
                    <span className="text-[10px] text-[#BABABA] font-semibold">27.04.2024, 10:00 </span>
                    <span className="text-[12px] text-[#262626] font-semibold">Ваша заявка по вывозу ЖБО принят! Следите за статусом заявки на главной странице.</span>
                </div> */}
            </div>
        </div>

    )
})