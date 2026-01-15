import { Icon } from "@/shared/ui/icon";
import { useEffect, useState } from 'react';
import { HardwareReview } from "./tabs/hardware-review";
import { HardwareControlle } from "./tabs/hardware-controlle";
import { InfoCompType } from "../../pages/scheme/types/type";
import accident from "@/app/static/img/accident.svg";
import { HardwareServes } from "./tabs/hardware-serves";
import { hardwareModel } from "@/features/hardware/model";
import { observer } from "mobx-react-lite";
import Loader from "@/shared/ui/loader/loader";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";

export const HardwareCard = observer(({ className, id, onClick }: InfoCompType) => {
  const [mode, setMode] = useState<number>(0);

  const { init, model, isLoading } = hardwareModel;
  const navigate = useNavigate();

  useEffect(() => {
    init(id, true);
  }, [id]);

  // Статус оборудования
  const getStatusInfo = () => {
    if (model.id === 28) {
      return { color: 'bg-red-500', text: 'Не работает' };
    }
    return { color: 'bg-green-500', text: 'Работает' };
  };

  const status = getStatusInfo();

  // Журнал событий — в едином стиле с "Управление" и "Паспортом"
  const eventLog = [

    {
      timestamp: "08.12.2025 12:34",
      action: "Отключение",

      status: "warning",
      description: "Аварийное отключение из-за превышения давления"
    },
    {
      timestamp: "05.12.2025 12:36",
      action: "Запуск",

      status: "success",
      description: "Ручной запуск после устранения неисправности"
    },
    {
      timestamp: "05.12.2025 12:10",
      action: "ТО1",

      status: "info",
      description: "Плановое техническое обслуживание (уровень 1)"
    },
    {
      timestamp: "01.12.2025 09:22",
      action: "Изменение параметра",

      status: "neutral",
      description: "Установлен расход 150 м³/ч"
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'warning': return { badge: 'text-red-700 bg-red-100', border: '#f87171' };
      case 'success': return { badge: 'text-green-700 bg-green-100', border: '#4ade80' };
      case 'info': return { badge: 'text-blue-700 bg-blue-100', border: '#60a5fa' };
      default: return { badge: 'text-gray-700 bg-gray-100', border: '#9ca3af' };
    }
  };

  return (
    <div className={`info-comp ${className}`} style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <button
              className="flex items-center gap-2 text-gray-700 hover:text-[#4A85F6] font-medium transition-colors"
              onClick={() => onClick(0)}
            >
              <div className="rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <span>назад</span>
            </button>

            <Button
              class="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm"
              onClick={() => navigate(`/dispatcher/equipment/form/${model.id}`)}
            >
              <Icon width={20} height={20} systemName="edit-white" />
            </Button>
          </div>

          {/* Equipment Name */}
          <Link to={`/dispatcher/equipment-about/passport/${model.id}`} className="font-bold text-xl text-gray-800 mb-4">{model.name || '—'}</Link>

          {/* Image */}
          <div className="info-comp__image">
            <img src={'https://triapi.ru/research/api/FileStorage/images/download?id=  ' + model.fileId} alt="Info" />
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 mb-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
            <span className="font-medium text-gray-800">{status.text}</span>
          </div>

          {/* Alert Message */}
          {model.id === 28 && (
            <div className="border border-red-300 bg-red-50 rounded-lg mb-5 p-4 flex items-start gap-3">
              <img src={accident} alt="Авария" width={24} height={24} />
              <div className="text-red-800 font-medium">
                Сработал автомат защиты двигателя!
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-3 mb-6 bg-gray-100 p-1 rounded-lg">
            {['Обзор', 'Управление', 'Сервис'].map((tab, index) => (
              <button
                key={index}
                onClick={() => setMode(index)}
                className={`flex-1 py-2 px-3 text-center rounded-md font-medium transition-colors ${mode === index
                  ? 'bg-[#4A85F6] text-white shadow-sm'
                  : 'text-gray-700 hover:text-[#4A85F6] hover:bg-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {mode === 0 && <HardwareReview />}
            {mode === 1 && <HardwareControlle />}
            {mode === 2 && <HardwareServes />}
          </div>

          {/* Журнал событий — как в других модулях */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon systemName="history" className="text-gray-600" />
              Журнал событий
            </h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
              {eventLog.map((event, idx) => {
                const { badge, border } = getStatusClass(event.status);
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white border border-gray-100"
                    style={{ borderLeft: `3px solid ${border}` }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gray-500">{event.timestamp}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge}`}>
                        {event.action}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});