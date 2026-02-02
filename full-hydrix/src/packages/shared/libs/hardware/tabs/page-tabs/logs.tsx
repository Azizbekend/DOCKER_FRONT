import { useState } from "react";
import { observer } from "mobx-react-lite";
import { PassportBlockContainer } from "../../components/passport-block-container";
import { eventLogData } from "@/packages/entities/hardware/data";
import { getColorBorder } from "@/packages/functions/get-data/get-color-border";


export const HardwareLogs = observer(() => {

  const [filterPeriod, setFilterPeriod] = useState<'day' | 'week' | 'month' | 'custom'>('day');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');


  const filteredEventLog = eventLogData.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const now = new Date();

    if (filterPeriod === 'day') {
      return entryDate.toDateString() === now.toDateString();
    }
    if (filterPeriod === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      return entryDate >= startOfWeek && entryDate <= now;
    }
    if (filterPeriod === 'month') {
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }
    if (filterPeriod === 'custom' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return entryDate >= start && entryDate <= end;
    }
    return true;
  });

  return (
    <div>
      <PassportBlockContainer
        className="p-6"
        children={
          <>
            {/* Фильтры */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterPeriod('day')}
                  className={`px-3 py-1 rounded-md text-sm ${filterPeriod === 'day' ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  День
                </button>
                <button
                  onClick={() => setFilterPeriod('week')}
                  className={`px-3 py-1 rounded-md text-sm ${filterPeriod === 'week' ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Неделя
                </button>
                <button
                  onClick={() => setFilterPeriod('month')}
                  className={`px-3 py-1 rounded-md text-sm ${filterPeriod === 'month' ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Месяц
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                />
                <button
                  onClick={() => setFilterPeriod('custom')}
                  className={`px-3 py-1 rounded-md text-sm ${filterPeriod === 'custom' ? 'bg-[#4A85F6] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Применить
                </button>
              </div>
            </div>

            {/* Таблица */}
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-2">
              {filteredEventLog.map((event, idx) => (
                <div
                  key={idx}
                  className="border bg-white p-3 rounded-lg border-l-4 transition-colors duration-200 hover:bg-gray-50"

                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs text-gray-500 font-mono">{event.timestamp}</span>

                  </div>
                  <p className={`text-sm mt-1 ${getColorBorder(event.indicates)} ${getColorBorder(event.discription)}`}>
                    {event.discription}
                    {event.indicates == "1" && "Пуск оборудования"}
                    {event.indicates == "0" && "Стоп оборудования"}
                  </p>
                </div>
              ))}
            </div>
          </>
        }
      />
    </div>
  );
})