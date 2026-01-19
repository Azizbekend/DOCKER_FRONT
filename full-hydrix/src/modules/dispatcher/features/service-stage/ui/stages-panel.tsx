import { Modal } from "@/packages/shared-ui/modal/modal";
import { serviceStagesModel } from "../models/model";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";
import { useEffect } from "react";
import { serviceStagesFormModel } from "../models/form-model";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Textarea } from "@/packages/shared-ui/textarea";
import { Button } from "@/packages/shared-ui/button";
import { getDate } from "@/packages/hook/get-date";
import { StageCard } from "@/packages/shared-components/stage-card";

interface ServiceStagesPanelProps {
    show: boolean;
    onClose: () => void;
    serviceId: number;
}

export const ServiceStagesPanel = observer(({ show, onClose, serviceId }: ServiceStagesPanelProps) => {

    const { model, isLoaded, init, create, completeEngineer, cancelEngineer } = serviceStagesModel
    const { model: formModel, setServiceId, setCreatorId, setImplementerId, setDiscription, setStageType, } = serviceStagesFormModel

    useEffect(() => {
        init(serviceId)

        setServiceId(serviceId)
        setCreatorId(400)
        setImplementerId(400)
        setStageType('Общий')
    }, [serviceId])


    return (
        <Modal
            wrapperId="register"
      type="right"
      show={show}
      setShow={onClose}
      title="Этапы заявки"
      classNames={{
        panel: "max-w-2xl w-full rounded-l-2xl",
        header: "border-b border-gray-200",
        footer: "bg-gray-50 p-6 border-t border-gray-200"
      }}
            children={isLoaded ? <Loader /> :
                <div className="flex flex-col gap-2  overflow-y-auto p-6">
            {model.length > 0 ? (
              model.map((stage) => (
                <StageCard 
                  key={stage.id}
                  stage={stage}
                  footerBlock={
                    <div className="flex gap-2">
                      <Button
                        // onClick={() => completeEngineer(stage.id)}
                        class="flex-2 py-2.5 px-4 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors"
                      >
                        Завершить этап
                      </Button>
                      <Button
                        // onClick={() => cancelEngineer(stage.id)}
                        class="flex-2 py-2.5 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Отменить этап
                      </Button>
                    </div>
                  }
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p>Нет этапов для отображения</p>
              </div>
            )}
          </div>
            }

            footerSlot={
        <div className="space-y-4">
          <InputContainer headerText="Описание нового этапа">
            <Textarea
              placeholder="Введите описание этапа..."
              value={formModel.discription}
              onChange={setDiscription}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
            />
          </InputContainer>
          
          {/* Нужно добавить исполнителя */}
          <InputContainer headerText="Назначить исполнителя">
            {/* <Textarea
              placeholder="Введите описание этапа..."
              value={formModel.implementerId}
              onChange={}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
            /> */}
          </InputContainer>
          <Button
            onClick={() => create(formModel)}
            disabled={!formModel.discription?.trim()}
            class="w-full py-3 px-6 bg-[#4A85F6] text-white font-semibold rounded-lg hover:bg-[#3a6bc9] transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Создать этап
          </Button>
        </div>
      }
        />
    );
})