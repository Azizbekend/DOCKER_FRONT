import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Icon } from "@/packages/shared-ui/icon";
import { getTimeRanges } from "@/packages/functions/get-time-ranges";
import { toast } from "react-toastify";
import { dateFilterBtns } from "@/packages/entities/hardware/data";
import { passportStatisticsModel } from "../../features/passport/passport-statistics-model";
import Loader from "@/packages/shared-ui/loader/loader";
import { Button } from "@/packages/shared-ui/button";


export const PassportStatisticsPanel = observer(() => {
  const { todayRange, yesterdayRange, weekRange, monthRange } = getTimeRanges()

    const containerRef = useRef<HTMLDivElement>(null);

    const [filterPeriod, setFilterPeriod] = useState<string>("day");
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');


    const onFilterSubmit = (type: string) => {
        setFilterPeriod(type)
        switch (type) {
            case 'day':
                getData(todayRange)
                break;
            case 'yesterday':
                getData(yesterdayRange)
                break;
            case 'week':
                getData(weekRange)
                break;
            case 'month':
                getData(monthRange)
                break;
        }
    }

    const onFilterSubmitCustom = () => {
        if (startDate.length === 0 || endDate.length === 0) {
            toast.error('Выберите даты')
        } else {
            getEvents({
                start: startDate,
                end: endDate
            })
        }
    }



    useEffect(() => {

        init(nodePlcId,)

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [])

    const onClose = () => {
        setShow(false)
    }

    return (
        <div className="w-[550px] absolute top-0 right-0 h-full"
            style={{ animation: 'fadeInInOpacity 0.2s ease forwards' }}>
            <div className=" rounded-2xl bg-white shadow-sm p-6 sticky top-10 max-h-[60vh] h-full">
                <h3 className="font-bold text-gray-800 mb-5">Техническая характеристика</h3>

                <div className="relative h-full max-h-full" ref={containerRef}>
                    <button onClick={onClose} className="absolute top-[-54px] right-[-10px]">
                        <Icon systemName="close" />
                    </button>

                    <div className="mb-8 border-b border-400 pb-4">
                        <h3 className="font-semibold text-gray-800 mb-4">Период:</h3>
                        <div className="flex gap-2">
                            {dateFilterBtns.map((btn) => (
                                <button
                                    onClick={() => onFilterSubmit(btn.value)}
                                    className={`px-3 py-1 rounded-md text-sm ${filterPeriod === btn.value ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                        {filterPeriod == "custom" &&
                            <div className="flex items-stretch gap-2 mt-5 ">
                                <div className="flex items-center border border-gray-300 rounded-md text-sm">
                                    <span className="p-2 border-r border-gray-300 mr-2">с:</span>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="px-2 py-1 caret-transparent select-none focus:outline-none"
                                    />
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-md text-sm">
                                    <span className="p-2 border-r border-gray-300 mr-2">до:</span>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="px-2 py-1 caret-transparent select-none focus:outline-none"
                                    />
                                </div>
                                <Button onClick={onFilterSubmitCustom} class="px-3 text-sm" styleColor="blue">
                                    Применить
                                </Button>
                            </div>
                        }
                    </div>



                    {isLoader ? <Loader /> : <p>hi</p>}


                </div>
            </div>
        </div>
    );
})