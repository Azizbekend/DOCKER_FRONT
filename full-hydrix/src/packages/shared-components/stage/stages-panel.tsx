import { Modal } from "@/packages/shared-ui/modal/modal";
import { serviceStagesModel } from "../../../modules/dispatcher/features/service-stage/models/model";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";
import { useEffect, useState } from "react";
import { Button } from "@/packages/shared-ui/button/button";
import { StageCard } from "@/packages/shared-components/stage/stage-card";
import { useAuth } from "@/packages/entities/user/context";
import { CompleteCancelType, ServiceForStageCardInterface } from "@/packages/entities/service-requests/type";
import { getDostup, isJobRole } from "@/packages/entities/user/utils";
import { StageSupplyCard } from "./stage-supply-card";
import { isStageSupplyTypes } from "@/packages/functions/is-value/is-stage-types";
import { CompletePlanedCommonServicesInterface } from "@/packages/entities/planed-services/type";
import { StageFormCreate } from "./stage-form-create";
import { FileViewer } from "@/packages/shared-ui/file-viewer";

interface ServiceStagesPanelProps {
  show: boolean;
  onClose: () => void;
  isService: ServiceForStageCardInterface,
  completeService: (data: CompleteCancelType) => void
  completePlanedService: (data: CompletePlanedCommonServicesInterface) => void
  cancelService: (data: CompleteCancelType) => void,
}

export const ServiceStagesPanel = observer(({ show, onClose, isService, completeService, cancelService, completePlanedService }: ServiceStagesPanelProps) => {

  const { user } = useAuth()
  const userDD = getDostup()
  const isPlanedService = (isService.type == "Тех. Обслуживание")

  useEffect(() => {
    if (isService) {
      init(isService.id, userDD)
      setIsActiveRequest(isService.status == "New" && userDD.isCommandsEnabled)
    }
  }, [isService])

  const {
    model,
    isLoaded,
    init,
    completeEngineer,
    cancelEngineer,
    pushStage,
    completeCommon,
    completePlanetServiceEnginner,
    isActiveRequest,
    setIsActiveRequest,
    setTypeAction,
    typeAction,
    supplyRequestAction,
    cancelPlanetServiceEngineer
  } = serviceStagesModel

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false)

  const onComplete = () => {
    if (isPlanedService) {
      completePlanedService({ requestId: isService.id, implementerId: user!.id, implementerCompanyId: user!.companyId, })
    } else {
      completeService({ requestId: isService.id, implementerId: user!.id, })
    }
  }

  const [showFilePanel, setShowFilePanel] = useState<boolean>(false);
  const [showFileId, setShowFileId] = useState<number>(0);

  const switchShowFile = (id: number, value: boolean) => {
    setShowFileId(id);
    setShowFilePanel(value);
  }

  return showFilePanel ? <FileViewer fileId={showFileId} isOpen={showFilePanel} onClose={() => switchShowFile(0, false)} /> :
    <Modal wrapperId="stages" type="right" show={show} setShow={onClose} title="Этапы"
      classNames={{
        panel: "max-w-2xl w-full rounded-l-2xl h-full",
        header: "border-b border-gray-200",
        footer: "bg-gray-50 p-6 border-t border-gray-200"
      }}

      children={isLoaded ? <Loader /> :
        <div className="flex flex-col-reverse gap-2 p-6">
          {model.length > 0 && model.map((stage, key) => (
            isStageSupplyTypes(stage.stageType) ?
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
                completePlanetServiceEnginner={completePlanetServiceEnginner}
                cancelPlanetServiceEngineer={cancelPlanetServiceEngineer}
                serviceData={isService}
                switchShowFile={switchShowFile}
              />
          ))}

          {model.length == 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p>Нет этапов для отображения</p>
            </div>
          )}

          {isActiveRequest && isJobRole() && (
            isOpenForm ?
              <StageFormCreate
                setIsOpenForm={setIsOpenForm}
                pushStage={pushStage}
                serviceData={isService}
              />
              :
              <Button styleColor="blue" class="mb-4 py-2" onClick={() => setIsOpenForm(true)}>
                Добавить этап
              </Button>
          )}
        </div>
      }

      footerSlot={
        <div className="flex gap-5" >
          {isActiveRequest && isJobRole() &&
            <>
              <Button onClick={onComplete}
                styleColor="blue" class="w-full py-2">
                Завершить заявку
              </Button>

              {!isPlanedService &&
                <Button onClick={() => cancelService({ requestId: isService.id, implementerId: user!.id })} styleColor="red" class="w-full py-2">
                  Отменить заявку
                </Button>
              }
            </>
          }
        </div>
      }
    />
})