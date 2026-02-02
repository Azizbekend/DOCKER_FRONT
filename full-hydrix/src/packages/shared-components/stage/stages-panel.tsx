import { Modal } from "@/packages/shared-ui/modal/modal";
import { serviceStagesModel } from "../../../modules/dispatcher/features/service-stage/models/model";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";
import { useEffect, useState } from "react";
import { serviceStagesFormModel } from "../../../modules/dispatcher/features/service-stage/models/form-model";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Textarea } from "@/packages/shared-ui/textarea";
import { Button } from "@/packages/shared-ui/button/button";
import { StageCard } from "@/packages/shared-components/stage/stage-card";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { useAuth } from "@/packages/entities/user/context";
import { CompleteCancelType } from "@/packages/entities/service-requests/type";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { getDostup } from "@/packages/entities/user/utils";
import { StageSupplyCard } from "./stage-supply-card";
import { isStageSupplyTypes } from "@/packages/functions/is-value/is-stage-types";

interface ServiceStagesPanelProps {
  show: boolean;
  onClose: () => void;
  isService: { id: number, status: 'New' | 'Completed' | 'Canceled' | null, hardwareId: number }
  completeService: (data: CompleteCancelType) => void
  cancelService: (data: CompleteCancelType) => void,
}

export const ServiceStagesPanel = observer(({ show, onClose, isService, completeService, cancelService }: ServiceStagesPanelProps) => {


  const { model, isLoaded, init, completeEngineer, cancelEngineer, pushStage, completeCommon, isActiveRequest, setIsActiveRequest, setTypeAction, typeAction, supplyRequestAction } = serviceStagesModel
  const { model: formModel, init: formInit, setServiceId, setCreatorId, setRequiredCount, clear, setImplementerId, setDiscription, setStageType, create, companyList, getUserList, implementersCompaneId, userList } = serviceStagesFormModel

  const { user } = useAuth()

  const userDD = getDostup()

  useEffect(() => {


    if (isService) {
      init(isService.id, userDD)
      formInit()
      setIsActiveRequest(isService.status == "New" && userDD.isCommandsEnabled)
    }



  }, [isService])

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)


  const onSubmit = () => {
    create(formModel, pushStage, isService.id, user!.id, user!.companyId, getObjectId(), isService.hardwareId,)
    setIsOpenForm(false)
  }

  useEffect(() => {
    setIsOpenForm(false)
  }, [])


  return (
    <Modal
      wrapperId="register"
      type="right"
      show={show}
      setShow={onClose}

      title={
        <div className="flex gap-4">
          <p>Этапы</p>
        </div>
      }

      classNames={{
        panel: "max-w-2xl w-full rounded-l-2xl h-full",
        header: "border-b border-gray-200",
        footer: "bg-gray-50 p-6 border-t border-gray-200"
      }}

      children={isLoaded ? <Loader /> :
        <div className="flex flex-col-reverse gap-2 p-6">
          {(model.length > 0 ? (model.map((stage, key) => ((isStageSupplyTypes(stage.stageType) ?
            <StageSupplyCard
              key={stage.id}
              number={key + 1}
              stage={stage}
              footerBlock={isActiveRequest && (user!.id == stage.implementerId || true)}
              setTypeAction={setTypeAction}
              setIsActiveRequest={setIsActiveRequest}
              supplyRequestAction={supplyRequestAction}
              typeAction={typeAction}
              serviceData={isService}
            />
            :

            <StageCard
              key={stage.id}
              number={key + 1}
              stage={stage}
              footerBlock={isActiveRequest && (user!.id == stage.implementerId || true)}
              completeEngineer={completeEngineer}
              cancelEngineer={cancelEngineer}
              completeCommon={completeCommon}
            />

          )))) :

            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p>Нет этапов для отображения</p>
            </div>
          )}

          {isActiveRequest && (isOpenForm ?

            <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">

              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-gray-800">Этап {model.length + 1}</h3>
                  {/* <div className={`px-2 py-1 rounded-lg text-white ${statusColorStage[[stage!.currentStatus]]}`}> */}
                  {/* {statusStage[stage!.currentStatus]} */}
                  {/* </div> */}
                </div>
              </div>

              <div className="px-4 py-6 space-y-4">
                <InputContainer headerText="Тип этапа">
                  <Selector
                    className="px-4 py-3"
                    placeholder="Тип этапа"
                    classWripper="w-full"
                    items={[
                      { value: 'Общий', title: "Общий" },
                      { value: 'Поставочная', title: "Поставочная" },
                    ]}
                    onSelect={(item) => { setStageType(item.value.toString()) }}
                    icon="arrow-down"
                  />
                </InputContainer>

                <InputContainer headerText={(formModel.stageType === "Общий") ? "Описание нового этапа" : "Что требуется для поставки"}>
                  <Textarea
                    placeholder="Введите описание этапа..."
                    value={formModel.discription}
                    onChange={setDiscription}
                    className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
                  />
                </InputContainer>

                {formModel.stageType === "Поставочная" &&
                  <InputContainer headerText={"Введите требующееся кол-во"}>
                    <Input
                      type="number"
                      placeholder="Введите требующееся кол-во"
                      value={formModel.requiredCount === 0 ? "" : formModel.requiredCount}
                      onChange={(e) => { setRequiredCount(Number(e)) }}
                      className="w-full outline-none disabled:bg-zinc-200 flex items-center border p-2 rounded-lg py-3"
                    />
                  </InputContainer>
                }


                <InputContainer headerText="Выберете компанию">
                  <Selector
                    placeholder="Выберете компанию"
                    classWripper="w-full"
                    items={companyList}
                    onSelect={(item) => { getUserList(Number(item.value)) }}
                    icon="arrow-down"
                  />
                </InputContainer>


                {implementersCompaneId != 0 && (userList.length > 0 ?
                  <InputContainer headerText="Выберете ответственное лицо">
                    <Selector
                      placeholder="Выберете ответственное лицо"
                      classWripper="w-full"
                      items={userList}
                      onSelect={(item) => { setImplementerId(Number(item.value)) }}
                      icon="arrow-down"
                    />
                  </InputContainer>
                  :
                  <div>У компании отсутвствуют ответственные лица </div>)
                }
              </div>


              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-2">
                  <Button onClick={onSubmit} styleColor="blue" class="w-full py-2">
                    Создать этап
                  </Button>
                  <Button onClick={() => { setIsOpenForm(false); clear() }} styleColor="gray" class="w-full py-2">
                    Отмена
                  </Button>
                </div >
              </div>
            </div>

            :

            <Button styleColor="blue" class="mb-4 py-2" onClick={() => setIsOpenForm(true)}>
              Добавить этап
            </Button>)
          }
        </div >
      }

      footerSlot={
        <div className="flex gap-5" >
          {isActiveRequest &&
            <>
              <Button onClick={() => completeService({ requestId: isService.id, implementerId: user!.id, })} styleColor="blue" class="w-full py-2">
                Завершить заявку
              </Button>
              <Button onClick={() => cancelService({ requestId: isService.id, implementerId: user!.id })} styleColor="red" class="w-full py-2">
                Отменить заявку
              </Button>
            </>
          }
        </div >
      }
    />
  );
})