import { statistics } from "../../features/orders/data";
import { Icon } from "@/packages/shared-ui/icon";
import { listRequestModel } from "../../features/orders/list/request-list-model";
import { useEffect } from "react";
import Loader from "@/packages/shared-ui/loader/loader";
import { observer } from "mobx-react-lite";
import { getDate } from "@/packages/hook/get-date";
import { Statistics } from "./components/statistics";
import { Link } from "react-router-dom";
import { getStatusColor } from "../../widgets/service-request/functions";

export const RequestRegistryList = observer(() => {


  const { model, isLoader, init } = listRequestModel

  useEffect(() => {
    init(14)
  }, [])


  return isLoader ? <Loader /> :
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Реестр заявок</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" >
        <Statistics all={model.length} />
      </div >

      {/* Список заявок */}
      <div >
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Список заявок</h2>

        <div className="space-y-5">
          {model.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 bg-white hover:bg-blue-50 transition-colors duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-lg truncate">{item.title}</h3>
                      <div className="text-sm text-gray-600 mt-1 font-mono truncate">{item.id}</div>
                    </div>
                    <Link
                      to={""}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#4A85F6] transition-colors"
                      aria-label="Редактировать заявку"
                    >
                      <Icon systemName="edit" />
                    </Link>
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
      </div >
    </>
})
