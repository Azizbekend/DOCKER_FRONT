import { useEffect, useState } from "react";
import Loader from "@/packages/shared-ui/loader/loader";
import { observer } from "mobx-react-lite";
import { Statistics } from "./components/statistics";
import { ServiceStagesPanel } from "../../../../packages/shared-components/stage/stages-panel";
import { listRequestModel } from "../../features/service-list/request-list-model";
import { FilterButtons } from "./components/filter-buttons";
import { RequestCard } from "@/packages/shared-components/request/request-card";
import { isStageAnswerTypes, isStageIncidentTypes, isStageSupplyTypes } from "@/packages/functions/is-value/is-stage-types";

export const RequestRegistryList = observer(() => {
  const [activeFilter, setActiveFilter] = useState<string>('all'); // 'all', 'general', 'supply', 'emergency'

  const { model, isLoader, init, isStagesPanel, setIsStagesPanel, isService, completeService, cancelService } = listRequestModel;

  useEffect(() => {
    const objectId = JSON.parse(localStorage.getItem('objectData') || "").id
    init(objectId);
  }, []);

  // Фильтрация заявок
  const filteredRequests = model.filter(request => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'general' && isStageAnswerTypes(request.type)) return true;
    if (activeFilter === 'supply' && isStageSupplyTypes(request.type)) return true;
    if (activeFilter === 'emergency' && isStageIncidentTypes(request.type)) return true;
    return false;
  });

  // Статистика
  const all = model.length;
  const newCound = model.filter(r => r.status === 'New').length;
  const completed = model.filter(r => r.status === 'Completed').length;
  const cancel = model.filter(r => r.status === 'Canceled').length;

  // Фильтрация
  const allRes = model.length;
  const commonRes = model.filter(r => isStageAnswerTypes(r.type)).length;
  const supplyRes = model.filter(r => isStageSupplyTypes(r.type)).length;
  const incidentsRes = model.filter(r => isStageIncidentTypes(r.type)).length;

  return isLoader ? <Loader /> : (
    <>
      <ServiceStagesPanel
        completeService={completeService}
        cancelService={cancelService}
        show={isStagesPanel}
        onClose={() => setIsStagesPanel(false, 0, null)}
        isService={isService}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Реестр заявок</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Statistics
          all={all}
          newCound={newCound}
          completed={completed}
          cancel={cancel}
        />
      </div>

      {/* Фильтры */}
      <FilterButtons
        allRes={allRes}
        commonRes={commonRes}
        supplyRes={supplyRes}
        incidentsRes={incidentsRes}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      />

      {/* Список заявок */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        {activeFilter === 'all' ? 'Все заявки' :
          activeFilter === 'general' ? 'Общие заявки' :
            activeFilter === 'supply' ? 'Поставочные заявки' : 'Аварийные заявки'}
      </h2>

      <div className="space-y-5">
        {filteredRequests.length > 0 ? (filteredRequests.map((item) => (
          <RequestCard key={item.id}
            request={item}
            onClick={() => setIsStagesPanel(true, item.id, item.status, item.hardwareId)}
          />
        ))) : (
          <div className="text-center py-12">

            <h3 className="text-lg font-medium text-gray-800 mb-1">Заявки не найдены</h3>
            <p className="text-gray-600">Нет заявок</p>
          </div>
        )}
      </div >
    </>
  );
});

