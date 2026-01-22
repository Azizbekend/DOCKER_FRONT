import { useEffect, useState } from "react";
import Loader from "@/packages/shared-ui/loader/loader";
import { observer } from "mobx-react-lite";
import { getDate } from "@/packages/hook/get-date";
import { Statistics } from "./components/statistics";
import { getStatusColor } from "../../widgets/service-request/functions";
import { ServiceStagesPanel } from "../../../../packages/shared/libs/stage-panel/stages-panel";
import { listRequestModel } from "../../features/service-list/request-list-model";
import { getGoodName } from "@/packages/hook/user/get-good-name";
import { Link } from "react-router-dom";

export const RequestRegistryList = observer(() => {
  const [isLook, setIsLook] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all'); // 'all', 'general', 'supply', 'emergency'

  const { model, isLoader, init, isStagesPanel, setIsStagesPanel, isService, completeService, cancelService } = listRequestModel;

  useEffect(() => {
    const objectId = JSON.parse(localStorage.getItem('objectData') || "").id
    init(objectId);
  }, []);

  // Фильтрация заявок
  const filteredRequests = model.filter(request => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'general' && request.type === 'Общая') return true;
    if (activeFilter === 'supply' && request.type === 'Поставочная') return true;
    if (activeFilter === 'emergency' && request.type === 'Аварийная') return true;
    return false;
  });

  // Статистика
  const totalRequests = filteredRequests.length;
  const inWork = filteredRequests.filter(r => r.status === 'New').length;
  const awaiting = filteredRequests.filter(r => r.status === 'Completed').length;
  const completed = filteredRequests.filter(r => r.status === 'Canceled').length;
  const critical = filteredRequests.filter(r => r.type === 'Аварийная').length;
  const totalCost = filteredRequests.reduce((sum, r) => sum + (r.cost || 0), 0);

  return isLoader ? <Loader /> : (
    <>
      <ServiceStagesPanel
        completeService={completeService}
        cancelService={cancelService}
        show={isStagesPanel}
        onClose={() => setIsStagesPanel(false, 0, null)}
        isService={isService}
        serviceStatus={isService!.status}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Реестр заявок</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {isLook && (
        <div className="bg-gray-50 rounded-xl p-4 mb-8 max-w-md">
          <h3 className="font-semibold text-gray-800 mb-2">Отладочная информация</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><b>ID:</b> {model[0]?.id}</p>
            <p><b>Тип:</b> {model[0]?.type}</p>
            <p><b>Статус:</b> {model[0]?.status}</p>
            <p><b>Создано:</b> {getDate(model[0]?.createdAt)}</p>
          </div>
        </div>
      )}

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Statistics
          all={totalRequests}
          inWork={inWork}
          awaiting={awaiting}
          completed={completed}
          critical={critical}
          totalCost={totalCost}
        />
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'all'
            ? 'bg-[#4A85F6] text-white shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Все ({totalRequests})
        </button>
        <button
          onClick={() => setActiveFilter('general')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'general'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Общая ({filteredRequests.filter(r => r.type === 'Общая').length})
        </button>
        <button
          onClick={() => setActiveFilter('supply')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'supply'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Поставочная ({filteredRequests.filter(r => r.type === 'Поставочная').length})
        </button>
        <button
          onClick={() => setActiveFilter('emergency')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === 'emergency'
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Аварийная ({filteredRequests.filter(r => r.type === 'Аварийная').length})
        </button>
      </div>

      {/* Список заявок */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        {activeFilter === 'all' ? 'Все заявки' :
          activeFilter === 'general' ? 'Общие заявки' :
            activeFilter === 'supply' ? 'Поставочные заявки' : 'Аварийные заявки'}
      </h2>

      <div className="space-y-5">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((item) => (
            <div
              key={item.id}
              onClick={() => setIsStagesPanel(true, item.id, item.status)}
              className="cursor-pointer border border-gray-200 rounded-xl p-5 bg-white hover:bg-blue-50 transition-colors duration-200 hover:shadow-md"
            >
              {/* Заголовок заявки */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-800 text-lg truncate">{item.title}</h3>
                    {item.type === 'Аварийная' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Аварийная
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {getStatusColor(item.status)}
                </div>
              </div>

              {/* Основная информация */}
              <div className="flex items-start justify-between gap-4 mb-4">
                {/* Оборудование и стоимость */}
                <div className="space-y-2">
                  {item.hardware && (
                    <Link to={`/dispatcher/hardware-about/${item.hardware.id}/passport/`} onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="text-xs text-gray-500 font-medium">Оборудование</div>
                      </div>
                      <div>{item.hardware.name}</div>
                    </Link>
                  )}

                </div>

                {/* Дата создания */}
                <div className="flex items-center justify-end md:justify-start text-right ">
                  <div className="text-xs text-gray-500">
                    <div className="font-medium">Создано</div>
                    <div>{getDate(item.createdAt)}</div>
                  </div>
                </div>
              </div>

              {/* Участники заявки */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-4">
                  {/* Создатель */}
                  <div className="flex item-start gap-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Создатель</div>
                        <div className="font-medium text-gray-800 truncate">{item.creator ? getGoodName(item.creator) : "—"}</div>
                      </div>
                    </div>

                    {item.creatorsCompany &&
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Компания</div>
                          <div className="font-medium text-gray-800 truncate">{item.creatorsCompany.companyName}</div>
                        </div>
                      </div>
                    }
                  </div>

                  {/* Исполнитель */}
                  <div className="flex item-start gap-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Исполнитель</div>
                        <div className="font-medium text-gray-800 truncate">{item.creator ? getGoodName(item.creator) : "—"}</div>
                      </div>
                    </div>

                    {item.implementersCompany &&
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Компания</div>
                          <div className="font-medium text-gray-800 truncate">{item.implementersCompany.companyName}</div>
                        </div>
                      </div>
                    }
                  </div>



                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">

            <h3 className="text-lg font-medium text-gray-800 mb-1">Заявки не найдены</h3>
            <p className="text-gray-600">Нет заявок по выбранному фильтру</p>
          </div>
        )}
      </div>
    </>
  );
});

