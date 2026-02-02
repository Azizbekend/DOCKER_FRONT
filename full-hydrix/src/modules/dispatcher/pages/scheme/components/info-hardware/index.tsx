import { Icon } from "@/packages/shared-ui/icon";
import { useEffect, useState } from 'react';
import accident from "@/app/static/img/accident.svg";
import { hardwareModel } from "@/modules/domain/features/hardware/model";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/packages/shared-ui/button/button";
import { InfoCompType } from "../../types/type";
import { HardwareControlle, HardwareReview, HardwareServes } from "@/packages/shared/libs/hardware/tabs/panel-tabs";
import { getHardwareStatus } from "@/packages/shared/libs/hardware/components/hardware-status";
import { LogEventCard } from "@/packages/shared-components/log-event-card";
import { getTimeRanges } from "@/packages/functions/get-data/get-time-ranges";
import { panelTabs } from "@/packages/shared-ui/button/config";

export const HardwareCard = observer(({ className, id, onClick, focusHardwareStatus }: InfoCompType) => {
  const [mode, setMode] = useState<number>(0);
  const { todayRange } = getTimeRanges()
  const { init, model, evengLog, isLoading, incidentList, сharacteristic, getInfoNodeInfoAll, commands, commandsInfo, documents, changeCommands, isActiveCommand, isLoaderCommand, switchIsCommand, getCommands, servicesWeek, missedService, checkedService } = hardwareModel;
  const navigate = useNavigate();

  useEffect(() => {
    init(id, todayRange);
  }, [id]);

  return (
    <div className={window.innerWidth < 1024 ? "fixed w-full h-full top-0 left-0" : "overflow-auto"}>
      <div className={`info-comp w-full lg:pb-0 pb-10 lg:w-auto min-w-[470px] max-w-[470px] w-[470px] h-full ${className}`} style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {isLoading ? (

          <div className="h-full flex items-center justify-center">
            <Loader />
          </div>

        ) : (

          <div>
            <div className="flex items-center justify-between mb-5">
              <button
                className="flex items-center gap-2 text-gray-700 hover:text-[#4A85F6] font-medium transition-colors"
                onClick={() => onClick(0, false)}
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
            <Link to={`/dispatcher/hardware-about/${model.id}/passport/`} className="font-bold text-xl text-gray-800 mb-4">{model.name || '—'}</Link>

            <div className="info-comp__image">
              <img src={'https://triapi.ru/research/api/FileStorage/images/download?id=  ' + model.fileId} alt="Info" />
            </div>

            {getHardwareStatus({
              status: focusHardwareStatus,
              incidentCount: incidentList.length,
              className: { container: "mb-5 p-3 bg-gray-50 border border-gray-200" }
            })}

            {incidentList.length > 0 && incidentList.map((incident, _) => {
              return (
                <div key={incident.nodeId}>
                  <div className="border border-red-300 bg-red-50 rounded-lg mb-5 p-4 flex items-start gap-3">
                    <img src={accident} alt="Авария" width={24} height={24} />
                    <div className="text-red-800 font-medium">
                      {incident.nodeName}
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="w-full py-2 text-center rounded-lg bg-green-500 text-white hover:opacity-50 duration-300 cursor-pointer">Устранено</div>
                    <Link to={'/dispatcher/orders/create/form'} className="w-full py-2 text-center rounded-lg bg-gray-500 text-white hover:opacity-50 duration-300 cursor-pointer">Создать заявку</Link>
                  </div>
                </div>
              )
            })}

            <div className="flex gap-3 mb-6 bg-gray-100 p-1 rounded-lg">
              {panelTabs.map((tab, index) => (
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

            <div className="mb-6">

              {mode === 0 &&
                <HardwareReview
                  сharacteristic={сharacteristic}
                  getInfoNodeInfoAll={getInfoNodeInfoAll}
                  commandsInfo={commandsInfo}
                  documents={documents}
                  data={{
                    model: model.model || "—",
                    position: model.position,
                    supplierName: model.supplierName,
                    developerName: model.developerName,
                  }} />

              }

              {mode === 1 &&
                <HardwareControlle
                  commands={commands}
                  changeCommands={changeCommands}
                  isActiveCommand={isActiveCommand}
                  isLoaderCommand={isLoaderCommand}
                  switchIsCommand={switchIsCommand}
                />
              }
              {mode === 2 &&
                <HardwareServes
                  idHardware={id}
                  missedService={missedService}
                  getCommands={getCommands}
                  servicesWeek={servicesWeek}
                  checkedService={checkedService}
                />}
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Icon systemName="history" className="text-gray-600" />
                  Журнал событий (сегодня)
                </h3>
                <Link to={`/dispatcher/hardware-about/${id}/events`} className="text-[#4A85F6] text-sm font-medium hover:underline">
                  Показать все →
                </Link>
              </div>

              <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                {evengLog && (evengLog.length > 0 ? evengLog.map((event, key) => (<LogEventCard event={event} key={key} />)) : <p className="text-center text-gray-500">Нет данных</p>)}

                {/* {evengLog.map((event, idx) => {
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
                })} */}


              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});