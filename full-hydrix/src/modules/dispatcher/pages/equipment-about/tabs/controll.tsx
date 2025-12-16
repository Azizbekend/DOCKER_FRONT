import { hardwareModel } from "@/entities/hardware/model";
import { Icon } from "@/shared/ui/icon";
import { Input } from "@/shared/ui/Inputs/input-text";
import { SwitchButton } from "@/shared/ui/switch-button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { eventLog } from "../data/data";

export const EquipmentControll = () => {
  const { commands } = hardwareModel;
  const [value, setValue] = useState("");



  const getStatusClass = (status) => {
    switch (status) {
      case 'warning': return 'text-red-700 bg-red-100';
      case 'success': return 'text-green-700 bg-green-100';
      case 'info': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Команды управления */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
          Команды управления
        </h3>

        <div className="space-y-4">
          {commands.map((item, key) => (
            <div
              key={key}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 group"
            >
              <span className="font-medium text-gray-800 group-hover:text-[#4A85F6] transition-colors">
                {item.name}
              </span>

              {item.isValue ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={value}
                    onChange={setValue}
                    className="border border-gray-300 rounded-lg w-24 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                    placeholder="0"
                  />
                  <span className="text-gray-600 text-sm">м³</span>
                </div>
              ) : (
                <SwitchButton
                  onChange={() => { console.log() }}
                  classNames={{
                    container: "ml-7 gap-3",
                    button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                    circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Расширенный журнал событий */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
          Журнал событий
        </h3>

        <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto pr-2">
          {eventLog.length > 0 ? (
            eventLog.map((event, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border-l-4 border-white shadow-md transition-shadow"
                style={{
                  borderLeftColor: event.status === 'warning' ? '#f87171' :
                    event.status === 'success' ? '#4ade80' :
                      event.status === 'info' ? '#60a5fa' : '#9ca3af'
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-500 font-mono">{event.timestamp}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.status === 'warning' ? 'bg-red-100 text-red-800' :
                    event.status === 'success' ? 'bg-green-100 text-green-800' :
                      event.status === 'info' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {event.action}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
                <p className="text-xs text-gray-500 mt-2">Инициатор: {event.initiator}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Нет записей в журнале
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
