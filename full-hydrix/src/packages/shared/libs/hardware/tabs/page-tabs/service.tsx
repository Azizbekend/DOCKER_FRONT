import { Icon } from "@/packages/shared-ui/icon";
import { InfoObject } from "../../components/info-object";
import InputCheckbox from "@/packages/shared-ui/Inputs/input-checkbox";
import { Modal } from "@/packages/shared-ui/modal/modal";
import { Button } from "@/packages/shared-ui/button/button";
import { useEffect, useState } from "react";
import { Table } from "@/packages/shared-ui/table/index";
import { observer } from "mobx-react-lite";
import { BlockContainer, BlockListContainer, BlockTitle } from "../../components/tab-service-components";
import { ServiceFilterBtn } from "../../components/service-filter-btn";
import { ServiceStatisticItem } from "../../components/service-statistic-item";
import { columns } from "../../columns/columns";
import { HardwareServiceProps } from "@/packages/entities/hardware/type";
import { getDate } from "@/packages/functions/get-data/get-date";

export const HardwareService = observer(({ getCommands, servicesWeek, checkedService, servicesHistory, serviceStatistic }: HardwareServiceProps) => {

  const [show, setShow] = useState<boolean>(false);

  const [btnCount, setBtnCount] = useState<string>("");
  const [filterPeriod, setFilterPeriod] = useState<"day" | "week" | "month" | "year">("day");

  const handleServiceOpen = (id: number) => {
    setBtnCount(id.toString())
    setShow(true)
  }


  const handleService = () => {
    checkedService(btnCount)
    setShow(false)
  }


  useEffect(() => {
    console.log()
  }, [])

  return (
    <div>
      <Modal title="Подтвердить значение"
        wrapperId="wardhare"
        type="center"
        show={show}
        setShow={setShow}
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
            <Button class="px-5 py-2.5 rounded-lg font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors" onClick={() => setShow(false)}>
              Отмена
            </Button>
            <Button
              class="px-5 py-2.5 rounded-lg font-medium text-white bg-[#4A85F6] hover:bg-[#3a6bc9] transition-colors shadow-sm"
              onClick={handleService}
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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    <div className='flex items-center gap-4 justify-between mb-2' onClick={() => handleServiceOpen(item.id)}>
                      <InputCheckbox
                        disabled
                        label={item.title}
                      />
                      <Icon systemName='info-blue' className='min-w-[30px] min-h-[30px] w-[30px] h-[30px]' />
                    </div>
                  }
                />
              )
            })}

          </BlockListContainer>
        </BlockContainer>

        <BlockContainer>
          <BlockTitle title="Обслуживание на ближайшую неделю" />

          <BlockListContainer>
            {servicesWeek.length == 0 && <div className='border-y border-gray-300 py-4'>В ближайщие дни задач нету</div>}

            {servicesWeek.length > 0 && servicesWeek.map((item, key) => {
              return (
                <InfoObject key={key}
                  className='w-full'
                  info={item.discription}
                  children={
                    <div className='flex items-end gap-4 justify-between border-b border-gray-300 pb-2 mb-2'>
                      <div className='flex flex-col flex-1'>
                        <span className='font-bold text-[var(--clr-accent)] mt-1 text-[12px]'>
                          {new Date(item.nextMaintenanceDate).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).replace(/\//g, '.')}
                        </span>
                        <span>{item.title}</span>
                      </div>
                    </div>
                  }
                />
              )
            })}

          </BlockListContainer>
        </BlockContainer>

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


            {/* <Table
              columns={columns}
              data={servicesHistory}
              classNames={{
                table: "!min-w-[100px]",
                body: "!text-lg"
              }}
            /> */}
          </div>
        </BlockContainer>

        <BlockContainer>
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
        </BlockContainer>

      </div>
    </div>
  );
})