import { Modal } from "@/packages/shared-ui/modal/modal";
import { serviceStagesModel } from "../../../../modules/dispatcher/features/service-stage/models/model";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";
import { useEffect, useState } from "react";
import { serviceStagesFormModel } from "../../../../modules/dispatcher/features/service-stage/models/form-model";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Textarea } from "@/packages/shared-ui/textarea";
import { Button } from "@/packages/shared-ui/button";
import { StageCard } from "@/packages/shared-components/stage-card";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { useAuth } from "@/packages/entities/user/context";
import { CompleteCancelType } from "@/packages/entities/service-requests/type";

interface ServiceStagesPanelProps {
  show: boolean;
  onClose: () => void;
  isService: { id: number, status: 'New' | 'Completed' | 'Canceled' | null }
  completeService: (data: CompleteCancelType) => void
  cancelService: (data: CompleteCancelType) => void
}

export const ServiceStagesPanel = observer(({ show, onClose, isService, completeService, cancelService }: ServiceStagesPanelProps) => {

  const { model, isLoaded, init, create, completeEngineer, cancelEngineer } = serviceStagesModel
  const { model: formModel, setServiceId, setCreatorId, setImplementerId, setDiscription, setStageType, clear } = serviceStagesFormModel

  const [panelSwitch, setPanelSwitch] = useState<"list" | "form">("list");
  const btnHeader: { value: "list" | "form"; name: string }[] = [{ value: "list", name: "Этапы" }, { value: "form", name: "Форма" }]
  const { user } = useAuth()

  useEffect(() => {
    clear()
    init(isService.id)
    setStageType('Общий')

  }, [isService.id])

  return (
    <Modal
      wrapperId="register"
      type="right"
      show={show}
      setShow={onClose}

      title={
        <div className="flex gap-4">
          {btnHeader.map((btn) => {
            return (
              <button onClick={() => { setPanelSwitch(btn.value) }} className={`px-3 py-1 text-lg rounded-lg  ${panelSwitch == btn.value ? "bg-[var(--clr-accent)] text-white" : "bg-gray-300"} text-black`}>{btn.name}</button>
            )
          })}
        </div>
      }

      classNames={{
        panel: "max-w-2xl w-full rounded-l-2xl",
        header: "border-b border-gray-200",
        footer: "bg-gray-50 p-6 border-t border-gray-200"
      }}

      children={isLoaded ? <Loader /> :
        <div className="flex flex-col gap-2  overflow-y-auto p-6">

          {panelSwitch == "list" ? (model.length > 0 ? (model.map((stage, key) =>
            <StageCard
              key={stage.id}
              number={key + 1}
              stage={stage}
              footerBlock={user?.id == stage.implementerId}
              completeEngineer={completeEngineer}
              cancelEngineer={cancelEngineer}
            />
          ))
            :
            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p>Нет этапов для отображения</p>
            </div>
          ) : <>
            <InputContainer headerText="Назначить исполнителя">
              <Selector placeholder="Выберите исполнителя"
                classWripper="w-full"
                onSelect={(item) => { setImplementerId(Number(item.value)) }}
                items={[{ value: user!.id, title: "user" }]}
              />
            </InputContainer>

            <InputContainer headerText="Описание нового этапа">
              <Textarea
                placeholder="Введите описание этапа..."
                value={formModel.discription}
                onChange={setDiscription}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
              />
            </InputContainer>

          </>}

        </div>
      }

      footerSlot={isService.status == "New" && (
        panelSwitch == "form" ?
          <Button onClick={() => create(formModel)} styleColor="blue" class="w-full py-2">
            Создать этап
          </Button>
          :
          <div className="flex gap-5">
            <Button onClick={() => completeService({ requestId: isService.id, implementerId: user!.id, })} styleColor="blue" class="w-full py-2">
              Завершить заявку
            </Button>
            <Button onClick={() => cancelService({ requestId: isService.id, implementerId: user!.id })} styleColor="red" class="w-full py-2">
              Отменить заявку
            </Button>
          </div>
      )}
    />
  );
})