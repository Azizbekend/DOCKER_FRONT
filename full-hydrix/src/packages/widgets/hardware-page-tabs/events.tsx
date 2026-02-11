import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { PassportBlockContainer } from "../../shared-components/hardware/passport-block-container";
import { getDate } from "@/packages/functions/get-data/get-date";
import { dateFilterBtns } from "@/packages/entities/hardware/data";
import { getTimeRanges } from "@/packages/functions/get-data/get-time-ranges";
import { toast } from "react-toastify";
import { logsModel } from "@/modules/domain/features/hardware/logs-model";
import { LogEventCard } from "@/packages/shared-components/log-event-card";

export const HardwareEvents = observer(({ hardwareId }: { hardwareId: number }) => {


  const { evengLog, loader, init, getEvents } = logsModel

  const [filterPeriod, setFilterPeriod] = useState<string>("day");
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const { todayRange, yesterdayRange, weekRange, monthRange } = getTimeRanges()


  useEffect(() => {
    init(hardwareId, todayRange)
  }, [])


  const onFilterSubmit = (type: string) => {
    setFilterPeriod(type)

    switch (type) {
      case 'day':
        getEvents(todayRange)
        break;
      case 'yesterday':
        getEvents(yesterdayRange)
        break;
      case 'week':
        getEvents(weekRange)
        break;
      case 'month':
        getEvents(monthRange)
        break;
      case 'custom':

        if (startDate.length === 0 || endDate.length === 0) {
          toast.error('Выберите даты')
        } else {
          getEvents({
            start: startDate,
            end: endDate
          })
        }

        break;
    }
  }

  return (
    <div>
      <PassportBlockContainer
        className="p-6"
        children={
          <>
            {/* Фильтры */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex gap-2">
                {dateFilterBtns.map((btn) => btn.value !== "custom" && (
                  <button
                    onClick={() => onFilterSubmit(btn.value)}
                    className={`px-3 py-1 rounded-md text-sm ${filterPeriod === btn.value ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {btn.label}
                  </button>
                ))}

              </div>

              <div className="flex items-center ml-3 gap-2">
                <span>с:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
                <span>до:</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
                <button
                  onClick={() => onFilterSubmit('custom')}
                  className={`px-3 py-1 rounded-md text-sm ${filterPeriod === 'custom' ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Применить
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-2">
              {evengLog && evengLog.length > 0 ?
                evengLog.map((event, key) => (<LogEventCard event={event} key={key} />)) :
                <p className="text-center text-gray-500 mt-10">Нет данных</p>
              }
            </div>
          </>
        }
      />
    </div>
  );
})