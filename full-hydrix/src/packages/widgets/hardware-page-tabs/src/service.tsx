import { Icon } from "@/packages/shared-ui/icon";
import { InfoObject } from "../../../shared-components/hardware/info-object";
import InputCheckbox from "@/packages/shared-ui/Inputs/input-checkbox";
import { Modal } from "@/packages/shared-ui/modal/modal";
import { Button } from "@/packages/shared-ui/button/button";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BlockContainer, BlockListContainer, BlockTitle } from "../../../shared-components/hardware/tab-service-components";
import { HardwareServiceProps } from "@/packages/entities/hardware/type";
import { getDate } from "@/packages/functions/get-data/get-date";
import { ModalPlanedCommonServiceForm } from "../components/modal-planed-common-service-form";
import { ModalPlanedServicesList } from "../components/modal-planed-services-list";
import { ServiceStagesPanel } from "@/packages/shared-components/stage/stages-panel";
import { hardwareServiceModalsModel } from "@/modules/domain/features/hardware/hardware-service-modals-model";

export const HardwareService = observer(({ getCommands, servicesWeek, checkedService, servicesHistory, serviceStatistic, planedServicesList }: HardwareServiceProps) => {


  const {
    show,
    showServiceForm,
    showPlanedList,
    showStagePanel,
    focusServiceId,
    focusIdPlaned,
    focusService,
    serviceChecked,
    completeService,
    cancelService,
    completePlanedService,
    handleServiceOpen,
    handleService,
    onSwitchPlanerCommonServiceForm,
    switchPlanedList,
    closeStagePanel,
    openStagePanel,
    modelPlaned,
    isLoadedPlaned
  } = hardwareServiceModalsModel

  const switchHandleService = (id: number, show: boolean) => {
    if (show) {
      handleServiceOpen(id)
    } else {
      if (id > 0) {
        checkedService(id.toString())
      }
      handleService()
    }
  }

  return (
    <div>
      {/* Модальные окна */}
      {showServiceForm && (
        <ModalPlanedCommonServiceForm
          serviceId={focusServiceId}
          show={showServiceForm}
          setShow={(value: boolean) =>
            onSwitchPlanerCommonServiceForm(value, 0)
          }
        />
      )}

      {showPlanedList && (
        <ModalPlanedServicesList
          show={showPlanedList}
          model={modelPlaned}
          isLoaded={isLoadedPlaned}
          onClick={openStagePanel}
          setShow={() => switchPlanedList(false, 0)}
        />
      )}

      {showStagePanel && (
        <ServiceStagesPanel
          completeService={completeService}
          cancelService={cancelService}
          show={showStagePanel}
          onClose={() => closeStagePanel()}
          completePlanedService={completePlanedService}
          isService={focusService}
        />
      )}



      <Modal title="Подтвердить значение"
        wrapperId="wardhare"
        type="center"
        show={show}
        setShow={() => switchHandleService(0, false)}
        children={
          <div
            className="py-6 px-8 text-gray-800 text-lg font-medium text-center leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Вы подтверждаете выполнение задачи?
          </div>
        }
        footerSlot={
          <div className="flex justify-end gap-3 p-6">
            <Button class="px-5 py-2.5 rounded-lg font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors" onClick={() => switchHandleService(0, false)}>
              Отмена
            </Button>
            <Button
              class="px-5 py-2.5 rounded-lg font-medium text-white bg-[#4A85F6] hover:bg-[#3a6bc9] transition-colors shadow-sm"
              onClick={() => switchHandleService(serviceChecked, false)}
            >
              Подтвердить
            </Button>
          </div>
        }
        classNames={{
          panel: "max-w-md w-full rounded-2xl border border-gray-200 shadow-xl",
          header: "border-b border-gray-100",
          title: "text-xl font-bold text-gray-800"
        }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BlockContainer>
          <BlockTitle title="Ежедневное обслуживание" />

          <BlockListContainer>
            {getCommands.length == 0 && <div className='border-y border-gray-300 py-4'>На сегодня задач нет</div>}

            {getCommands.length > 0 && getCommands.map((item, key) => {
              return (

                <InfoObject key={key}
                  className='w-full'
                  info={item.discription}

                  children={
                    <div className='flex items-center gap-4 justify-between mb-2'>
                      <div onClick={() => switchHandleService(item.id, true)}>
                        <InputCheckbox disabled label={item.title} />
                      </div>
                      <div className="flex gap-3">
                        <Icon systemName='info-blue' className='min-w-[30px] min-h-[30px] w-[30px] h-[30px]' />
                      </div>
                    </div>
                  }
                />
              )
            })}

          </BlockListContainer>
        </BlockContainer>

        <BlockContainer>
          <BlockTitle title="Плановое обслуживание" />
          <BlockListContainer>
            {planedServicesList.length == 0 && <div className='border-y border-gray-300 py-4'>Плановое обслуживание пустое</div>}

            {planedServicesList.length > 0 && planedServicesList.map((item, key) => {
              return (
                <InfoObject key={key}
                  className='w-full'
                  children={
                    <div className='flex items-center gap-4 justify-between mb-2 pb-2 border-b border-gray-300'>
                      <span className={`${Number(item.time) <= 0 && "text-red-500"}`}>
                        {item.title} {Number(item.time) <= 0 ? "просрочено на" : "до следующей замены"}  {Math.abs(Number(item.time))} ч.
                      </span>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            switchPlanedList(true, item.id)
                          }}
                          styleColor="blue"
                          class="px-2 py-1 text-sm"
                        >История заявок</Button>
                        <Button
                          onClick={() => onSwitchPlanerCommonServiceForm(true, item.id)}
                          styleColor="green"
                          class="px-2 py-1 text-sm"
                        >Создать заявку</Button>
                      </div>
                    </div>
                  }
                />
              )
            })}

          </BlockListContainer>
        </BlockContainer>



        {/* Обслуживание на ближайшую неделю */}
        <BlockContainer>
          <BlockTitle title="Обслуживание на ближайшую неделю" />

          <BlockListContainer>
            {servicesWeek.length === 0 ? (
              <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                В ближайшие дни задач нет
              </div>
            ) : (
              servicesWeek.map((item, key) => (
                <InfoObject
                  key={key}
                  className="w-full"
                  info={item.discription}
                  children={
                    <div className="flex items-end gap-4 justify-between border-b border-gray-200 pb-2 mb-2">
                      <div className="flex flex-col flex-1">
                        <span className="font-bold text-[#4A85F6] text-sm">
                          {new Date(item.nextMaintenanceDate).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).replace(/\//g, '.')}
                        </span>
                        <span className="text-gray-800">{item.title}</span>
                      </div>
                    </div>
                  }
                />
              ))
            )}
          </BlockListContainer>
        </BlockContainer>

        {/* <BlockContainer>
          <BlockTitle title="Статистика обслуживания" />

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-gray-700 font-medium">Период:</span>
            <ServiceFilterBtn name="За день" onClick={() => setFilterPeriod("day")} isActive={filterPeriod == "day"} />
            <ServiceFilterBtn name="За неделю" onClick={() => setFilterPeriod("week")} isActive={filterPeriod == "week"} />
            <ServiceFilterBtn name="За месяц" onClick={() => setFilterPeriod("month")} isActive={filterPeriod == "month"} />
            <ServiceFilterBtn name="За год" onClick={() => setFilterPeriod("year")} isActive={filterPeriod == "year"} />
          </div>

          <div className="">
            {serviceStatistic.map((item, key) => { return <ServiceStatisticItem key={key} name={item.name} progress={item.progress} /> })}
          </div>
        </BlockContainer> */}

        <BlockContainer>
          <BlockTitle title="История выполнения" />
          <div>
            <div className="grid grid-cols-3 bg-blue-50 rounded-t-lg">
              <div className="text-gray-700 font-medium py-4 px-5">Наименование</div>
              <div className="text-gray-700 font-medium py-4 px-5 text-center">Дата создания</div>
              <div className="text-gray-700 font-medium py-4 px-5 text-center">Дата выполнения</div>
            </div>

            <div className="max-h-[400px] overflow-auto">
              {servicesHistory.map((service, key) => {
                return (
                  <div className="grid grid-cols-3 border-b border-blue-200 items-center" key={key}>
                    <div className="text-gray-700 font-medium py-4 px-5">{service.title}</div>
                    <div className="text-gray-700 font-medium py-4 px-5 text-center">{getDate(service.sheduleMaintenanceDate)}</div>
                    <div className="text-gray-700 font-medium py-4 px-5 text-center">{getDate(service.completedMaintenanceDate)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </BlockContainer>

      </div>
    </div>
  );
})