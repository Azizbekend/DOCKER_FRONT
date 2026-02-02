import { Icon } from "@/packages/shared-ui/icon";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { SwitchButton } from "@/packages/shared-ui/switch-button";
import { useState } from "react";
import Loader from "@/packages/shared-ui/loader/loader";
import { Button } from "@/packages/shared-ui/button/button";
import { ConfirmModal } from '@/packages/shared-components/hardware-modal-confirms/modal-confirm';
import { ModalCommanActive } from '@/packages/shared-components/hardware-modal-confirms/modal-comman-active';
import { observer } from "mobx-react-lite";
import { HardwareControlleProps } from "@/packages/entities/hardware/type";
import { logsModel } from "@/modules/domain/features/hardware/logs-model";
import { getTimeRanges } from "@/packages/functions/get-data/get-time-ranges";
import { getDate } from "@/packages/functions/get-data/get-date";
import { LogEventCard } from "@/packages/shared-components/log-event-card";

export const HardwareControll = observer(({ commands, switchIsCommand, changeCommands, isLoaderCommand, isActiveCommand, evengLog }: HardwareControlleProps) => {

  const [btnCount, setBtnCount] = useState<number>(3);
  const [show, setShow] = useState<boolean>(false);
  const [showAvtive, setShowAvtive] = useState<boolean>(false);

  const confirm = () => { setShowAvtive(false); switchIsCommand() }
  const cancle = () => { setShowAvtive(false) }


  return (
    <>
      {isActiveCommand && <ConfirmModal show={show} setShow={setShow} />}
      <ModalCommanActive show={showAvtive} setShow={setShowAvtive} confirm={confirm} cancle={cancle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
            Команды управления
          </h3>
          {isLoaderCommand ? <Loader /> :
            <div className={` duration-200 ${!isActiveCommand ? "opacity-50" : "opacity-100"}`}>

              <div className='border-b border-black pb-5 mb-5 '>
                <Button onClick={() => setShowAvtive(true)} class={`border-2 w-full justify-center text-white bg-[var(--clr-gray-dark)]`}>Активировать удалённое управление</Button>
              </div>


              <div className="flex justify-between mb-5 border-b pb-5 gap-3">
                <Button onClick={() => { isActiveCommand && setBtnCount(0) }} class={`border-2 w-full justify-center ${btnCount == 0 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Пуск</Button>
                <Button onClick={() => { isActiveCommand && setBtnCount(1) }} class={`border-2 w-full justify-center ${btnCount == 1 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Стоп</Button>
                <Button onClick={() => { isActiveCommand && setBtnCount(2) }} class={`border-2 w-full justify-center ${btnCount == 2 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Cброс аварии</Button>
              </div>

              <div className="space-y-4">
                {commands.map((item, key) => {
                  return item.name !== "Стоп" && item.name !== "Пуск" && item.name !== "Cброс аварии" && (

                    <div
                      key={key}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 group"
                    >
                      <span className={"font-medium text-gray-800 transition-colors flex-1 " + (isActiveCommand && "group-hover:text-[#4A85F6]")}>
                        {item.name}
                      </span>

                      {item.isValue ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={item.value || ""}
                            disabled={!isActiveCommand}
                            onChange={(e) => { changeCommands(e.target.value, item.id) }}
                            className="border border-gray-300 rounded-lg w-24 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                            placeholder=""
                          />
                        </div>
                      ) : (
                        <SwitchButton
                          disabled={isActiveCommand}
                          onChange={() => { console.log() }}
                          classNames={{
                            container: "ml-7 gap-3",
                            button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                            circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                          }}
                        />
                      )}

                      <div className='px-2 min-w-[40px] py-2 bg-[var(--clr-accent)] rounded-lg hover:opacity-50 cursor-pointer duration-300 ml-4' onClick={() => isActiveCommand && setShow(true)}>
                        <Icon systemName='save-white' />
                      </div>

                      {item.mesurement && <span className="text-gray-600 text-sm ml-4">{item.mesurement}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          }

        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
            Журнал событий
          </h3>

          <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto pr-2">
            {evengLog && evengLog.map((event, key) => (<LogEventCard event={event} key={key} />))}
          </div>
        </div>
      </div>
    </>
  );
})
