import { listRequestModel } from "../../features/service-request/list/request-list-model";
import { useEffect, useState } from "react";
import Loader from "@/packages/shared-ui/loader/loader";
import { observer } from "mobx-react-lite";
import { getDate } from "@/packages/hook/get-date";
import { Statistics } from "./components/statistics";
import { getStatusColor } from "../../widgets/service-request/functions";
import { ServiceStagesPanel } from "../../features/service-stage/ui/stages-panel";

export const RequestRegistryList = observer(() => {
  const [isLook, setIsLook] = useState<boolean>(false)

  const { model, isLoader, init, isStagesPanel, setIsStagesPanel, isServiceId } = listRequestModel

  useEffect(() => { init(14) }, [])

  return isLoader ? <Loader /> :
    <>

      <ServiceStagesPanel show={isStagesPanel} onClose={() => setIsStagesPanel(false, 0)} serviceId={isServiceId} />

      <div className="mb-8" onClick={() => setIsLook(!isLook)}>
        <h1 className="text-3xl font-bold text-gray-800">Реестр заявок</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>


      {/* НУЖНО ПРОДУМАТЬ ДИЗАЙН ПО ДАННОЙ МОДЕЛЕ */}
      {isLook &&
        <div className="w-[250px] mb-8">
          <p><b>id:</b> {model[0].id}</p>
          <p><b>title:</b> {model[0].title}</p>
          <p><b>type:</b> {model[0].type}</p>
          <p><b>status:</b> {model[0].status}</p>
          <p><b>createdAt:</b> {getDate(model[0].createdAt)}</p>
          <p><b>closedAt:</b> {getDate(model[0].closedAt)}</p>
          <p><b>cancelDiscription:</b> {model[0].cancelDiscription}</p>
          <p><b>creatorId:</b> {model[0].creatorId}</p>
          <p><b>implementerId:</b> {model[0].implementerId}</p>
          <p><b>hardwareId:</b> {model[0].hardwareId}</p>
          <p><b>objectId:</b> {model[0].objectId}</p>
        </div>
      }

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" >
        <Statistics
          all={model.length}
          inWork={0}
          awaiting={0}
          completed={0}
          critical={0}
          totalCost={0}
        />

      </div >


      <h2 className="text-xl font-semibold text-gray-800 mb-5">Список заявок</h2>

      <div className="space-y-5">
        {model.map((item, index) => (
          <div key={index} onClick={() => setIsStagesPanel(true, item.id)}
            className="cursor-pointer border border-gray-200 rounded-xl p-4 bg-white hover:bg-blue-50 transition-colors duration-200 hover:shadow-md">

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-800 text-lg truncate">{item.title}</h3>
                  <div className="text-sm text-gray-600 mt-1 font-mono truncate">{item.id}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              {getStatusColor(item.status)}

              <div className="text-right">
                <div className="text-xs text-gray-500 whitespace-nowrap">{getDate(item.createdAt)}</div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
})
