import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ru } from 'date-fns/locale/ru';
import { registerLocale, setDefaultLocale } from "react-datepicker";

import '../styles/remove-icon-calendar.css'
import '../styles/date-filter.css'
import statsModel from "../models/stats-model";
import { Icon } from "@/shared/ui/icon";
import { Input } from "@/shared/ui/Inputs/input-text";

type DateFilterProps = {
    // onApply: (startDate: Date | null; endDate: Date | null) => void;
    // onCancel: () => void;
};
registerLocale('ru', ru) // Регистрируем локаль

export const DateFilter: React.FC<DateFilterProps> = () => {

    useEffect(() => {
        setDefaultLocale('ru');
    }, []);

    const { changeDateForGet, defultDateForGet } = statsModel
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const onChange = (dates: any) => {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);
    };

    //! const formatDate = (dateString: Date | null) => {
    //     if (!dateString) {
    //         return ''; // Или какое-то другое значение по умолчанию, если startDate равен null/undefined
    //     }

    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    //     const year = date.getFullYear();

    //     return `${day}.${month}.${year}`;
    //! };

    // Вывод данных в поля input date

    const getIsoDateString = (date: Date | string | null | undefined) => {
        if (!date) {
            return '';
        }

        let parsedDate: Date;

        if (typeof date === 'string') {
            try {
                parsedDate = new Date(date);
                if (isNaN(parsedDate.getTime())) {
                    console.error("Invalid date string:", date);
                    return '';
                }
            } catch (error) {
                console.error("Error parsing date string:", date, error);
                return '';
            }
        } else if (date instanceof Date) {
            parsedDate = date;
        } else {
            console.error("Invalid date type:", date);
            return '';
        }

        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const day = String(parsedDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };



    // Применение фильтра по дате
    const handleApply = () => {
        changeDateForGet(startDate, endDate)
        setIsOpen(false);
    };

    // Отмена фильтра по дате
    const handleCanceled = () => {
        setStartDate(null);
        setEndDate(null);
        defultDateForGet()
        setIsOpen(false);
    }


    return (
        <div className="relative">
            <div className="flex gap-3 items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                Фильтр по дате
                <Icon systemName='arrow_drop_down' className={`${isOpen ? "rotate-180" : ""}`} width={8} />
            </div>
            {isOpen && (
                <div className="absolute mt-4 -ml-[60%] p-4 bg-white shadow-lg rounded-lg z-10">

                    <DatePicker
                        calendarClassName="text-red"
                        popperClassName="!text-red"
                        className="text-[30px]"
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        locale="ru"
                    />

                    <div>
                        <span>Период:</span>

                        <div className="flex gap-5">
                            <Input type="date" value={getIsoDateString(startDate)} className="removeIconCalendar" onChange={(e) => { setStartDate(e) }} />
                            <Input type="date" value={getIsoDateString(endDate)} className="removeIconCalendar" onChange={(e) => { setEndDate(e) }} />
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleCanceled}
                            className="px-4 py-2 rounded-lg text-[14px] border-solid border-[2px] border-[#E7E8EA]"
                        >
                            Отменить
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Применить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};