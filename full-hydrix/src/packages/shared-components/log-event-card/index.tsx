import { HardwareEventsDataType } from "@/packages/entities/hardware/type";
import { getDate } from "@/packages/functions/get-date";
import { Link } from "react-router-dom";


interface Props {
    event: HardwareEventsDataType
}

export const LogEventCard = ({ event }: Props) => {

    const getColorBorder = (txt: string) => {

        if (txt == "1") {
            return "border-l-4 border-green-500"
        }

        return
    }



    return (
        <div className={`border bg-white p-3 rounded-lg border-l-4 transition-colors duration-200 hover:bg-gray-50`}>
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-gray-500 font-mono">{getDate(event.timeStamp)}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">
                {event.discription}
                {event.indicates == "1" && "Пуск оборудования"}
                {event.indicates == "0" && "Стоп оборудования"}
            </p>
        </div>
    );
}