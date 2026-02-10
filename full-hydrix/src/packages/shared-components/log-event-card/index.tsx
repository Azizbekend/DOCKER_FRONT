import { HardwareEventsDataType } from "@/packages/entities/hardware/type";
import { getColorBorder } from "@/packages/functions/get-data/get-color-border";
import { getDate } from "@/packages/functions/get-data/get-date";
import { Link } from "react-router-dom";


interface Props {
    event: HardwareEventsDataType
}

export const LogEventCard = ({ event }: Props) => {
    return (
        <div className={`border bg-white p-3 rounded-lg border-l-4 transition-colors duration-200 hover:bg-gray-50`}>
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-gray-500 font-mono">{getDate(event.timeStamp)}</span>
            </div>
            <p className={`text-sm mt-1 ${getColorBorder(event.indicates)} ${getColorBorder(event.discription)}`}>
                {event.discription}
                {event.indicates == "1" && "Запуск оборудования"}
                {event.indicates == "0" && "Остановка оборудования"}
            </p>
        </div >
    );
}