import { hardwareModel } from "@/entities/hardware/model";
import { Icon } from "@/shared/ui/icon";
import { Input } from "@/shared/ui/Inputs/input-text";
import { SwitchButton } from "@/shared/ui/switch-button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlockSelect } from "../../scheme/components/info-hardware/components/block-select";
import { InfoObject } from "../../scheme/components/info-hardware/components/info-object";
import InputCheckbox from "@/shared/ui/Inputs/input-checkbox";
import { Modal } from "@/shared/ui/modal/modal";
import { Button } from "@/shared/ui/button";

export const EquipmentService = () => {
  const { getCommands, servicesHistory, checkedService } = hardwareModel;
  const [show, setShow] = useState<boolean>(false);

  const [btnCount, setBtnCount] = useState<string>("");

  const handleServiceOpen = (id: number) => {
    setBtnCount(id.toString())
    setShow(true)
  }


  const handleService = () => {
    checkedService(btnCount)
    setShow(false)
  }

  return (
    <div>
      <Modal
  title="Подтвердить значение"
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
      <Button
        class="px-5 py-2.5 rounded-lg font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors"
        onClick={() => setShow(false)}
      >
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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Команды управления */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
            Ежедневное обслуживание
          </h3>

          <div className="flex flex-col gap-5">
            {getCommands.length == 0 && <div className='border-y border-gray-300 py-4'>На сегодня задач нет</div>}

            {getCommands.length > 0 && getCommands.map((item, key) => {
              return (

                <InfoObject key={key}
                  className='w-full'
                  info={item.discription}

                  children={
                    <div className='flex items-center gap-4 justify-between' onClick={() => handleServiceOpen(item.id)}>
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
          </div>
        </div>

        {/* Расширенный журнал событий */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
            Обслуживание на ближайшую неделю
          </h3>
          <div className="flex flex-col gap-5">
            {servicesHistory.length == 0 && <div className='border-y border-gray-300 py-4'>В ближайщие дни задач нету</div>}

            {servicesHistory.length > 0 && servicesHistory.map((item, key) => {
              return (
                <InfoObject key={key}
                  className='w-full'
                  info={item.discription}
                  children={
                    <div className='flex items-end gap-4 justify-between border-b border-gray-300 pb-2'>
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
          </div>
        </div>
      </div>
    </div>
  );
};
