import { observer } from "mobx-react-lite";
import { format, subDays } from "date-fns";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";

export const NotificationList = observer(() => {
    const today = new Date();
    const yesterday = subDays(today, 1);

    return (
        <div className="w-full px-7 mt-10">
            <div className="flex flex-col gap-6 w-full">
                {/* Сегодня */}
                <div>
                    <div className="text-lg font-semibold mb-4">Сегодня</div>
                    <div className="flex flex-col gap-4">
                        <NotificationItem
                            time="12:00"
                            date="14 августа 2024"
                            title="Оцените качество обслуживания"
                            isNew
                        />
                        <NotificationItem
                            time="10:00"
                            date="14 августа 2024"
                            title="Ассенизатор в пути"
                            isNew
                        />
                    </div>
                </div>

                {/* Вчера */}
                <div>
                    <div className="text-lg font-semibold mb-4">{format(yesterday, "dd.MM.yyyy")}</div>
                    <div className="flex flex-col gap-4">
                        <NotificationItem
                            time="10:00"
                            date="13 августа 2024"
                            title="Заявка принята"
                        />
                        <NotificationItem
                            time="08:00"
                            date="13 августа 2024"
                            title="Заявка в обработке"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

// Компонент NotificationItem
const NotificationItem = ({
    time,
    date,
    title,
    isNew = false,
}: {
    time: string;
    date: string;
    title: string;
    isNew?: boolean;
}) => {
    return (
        <div className="relative flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <Icon systemName="notification-item" className="w-12 h-12" />
            <div className="flex flex-col gap-1">
                <p className="font-semibold text-base text-[#262626]">{title}</p>
                <p className="text-xs font-medium text-[#BABABA]">
                    {time} {date}
                </p>
            </div>
            {/* Индикатор нового уведомления */}
            {isNew && (
                <span className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full shadow-md"></span>
            )}
        </div>
    );
};