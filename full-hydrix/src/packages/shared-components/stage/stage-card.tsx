import { useState } from "react";
import { CancelStageType, CompleteCommonStageType, CompleteEngineerStageType, ServiceStageType } from "../../entities/service-requests/type";
import { getDate } from "../../functions/get-data/get-date";
import { Button } from "../../shared-ui/button/button";
import { InputContainer } from "../../shared-ui/Inputs/input-container";
import { Textarea } from "../../shared-ui/textarea";
import { useAuth } from "../../entities/user/context";
import { getDostup } from "../../entities/user/utils";


interface StageCardProps {
  stage: ServiceStageType,
  footerBlock?: boolean,
  number?: number,
  completeEngineer?: (data: CompleteEngineerStageType) => void
  cancelEngineer?: (data: CancelStageType) => void,
  completeCommon: (data: CompleteCommonStageType) => void
}

export const StageCard = ({ stage, footerBlock, number, completeEngineer, cancelEngineer, completeCommon }: StageCardProps) => {

  const [descr, setDescr] = useState<string>("")
  const [isCanc, setIsCanc] = useState<boolean>(false)
  const [isCancComplete, setIsCancComplete] = useState<boolean>(false)

  const statusStage = { New: "Новый", Completed: "Завершен", Canceled: "Отменен" }
  const statusColorStage = { New: "bg-blue-500", Completed: "bg-green-500", Canceled: "bg-red-500" }
  const userDD = getDostup()

  const { user } = useAuth()

  const onComplete = () => {
    userDD.isCommandsEnabled ? setIsCancComplete(true) : completeCommon({ stageId: Number(stage.id), discription: descr })
  }

  const NeedComplete = () => {
    completeEngineer({ stageId: Number(stage.id), engineerId: user.id, discription: descr })
  }

  const needCancel = () => {
    cancelEngineer({ stageId: stage.id, cancelDiscriprion: descr })
  }

  const defultBack = () => {
    setDescr("")
    setIsCanc(false)
    setIsCancComplete(false)
  }

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4 border-b rounded-xl border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-gray-800">Этап {number}</h3>
          <div className={`px-2 py-1 rounded-lg text-white ${statusColorStage[[stage!.currentStatus]]}`}>
            {statusStage[stage!.currentStatus]}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Создано</div>
            <p className="text-gray-800 font-medium">{getDate(stage.createdAt)}</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Завершено</div>
            <p className="text-gray-800 font-medium"> {getDate(stage.closedAt) !== "01.01.1, 00:00" ? getDate(stage.closedAt) : '—'}</p>
          </div>
        </div>


        <div className="space-y-4">
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-3 min-w-0 text-xs">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Создатель</div>
                <div className="font-medium text-gray-800 truncate">{stage.creator ? stage.creator : "—"}</div>
              </div>
            </div>

            {stage.creatorsCompany &&
              <div className="flex items-center gap-3 min-w-0 text-xs">
                <div className="min-w-0">
                  <div className="text-gray-500 uppercase tracking-wide">Компания</div>
                  <div className="font-medium text-gray-800 truncate">{stage.creatorsCompany.companyName}</div>
                </div>
              </div>
            }
          </div>

          <div className="grid grid-cols-2">
            {/* Исполнитель */}
            <div className="flex items-center gap-3 min-w-0 text-xs">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Исполнитель</div>
                <div className="font-medium text-gray-800 truncate">{stage.implementer ? stage.implementer : "—"}</div>
              </div>
            </div>

            {stage.implementersCompany &&
              <div className="flex items-center gap-3 min-w-0 text-xs">
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Компания</div>
                  <div className="font-medium text-gray-800 truncate">{stage.implementersCompany.companyName}</div>
                </div>
              </div>
            }
          </div>

          <div className="mt-5 pt-4 border-black-500 border-t-[1.5px]">
            <p className="mb-1 text-gray-600">{stage.stageType == "Общий" ? "Описание:" : "Требования к поставке"}</p>
            {stage.discription}
          </div>


          {(stage.cancelDiscription?.length > 0 && stage.cancelDiscription !== "None") && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="text-xs text-red-700 uppercase tracking-wide mb-1">Причина отмены</div>
              <p className="text-red-800 text-sm">{stage.cancelDiscription}</p>
            </div>
          )}
        </div>

        {stage.currentStatus === "New" && isCanc &&
          <InputContainer headerText="Описание" classNames={{ wrapper: "mt-5" }}>
            <Textarea
              placeholder="Описание..."
              value={descr}
              onChange={setDescr}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
            />
          </InputContainer>
        }

        {stage.currentStatus === "New" && isCancComplete &&
          <InputContainer headerText="Описание" classNames={{ wrapper: "mt-5" }}>
            <Textarea
              placeholder="Описание..."
              value={descr}
              onChange={setDescr}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
            />
          </InputContainer>
        }
      </div>

      {footerBlock && stage.currentStatus === "New" && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            {(isCanc || isCancComplete) ?
              <>
                {isCancComplete &&
                  <>
                    <Button onClick={NeedComplete} class="py-2.5 px-4" styleColor="green">
                      Подтвердить
                    </Button>
                    <Button onClick={defultBack} styleColor="greenOutline" class="py-2.5 px-4">
                      Отмена
                    </Button>
                  </>}

                {isCanc &&
                  <>
                    <Button onClick={needCancel} class="py-2.5 px-4" styleColor="red">
                      Подтвердить
                    </Button>
                    <Button onClick={defultBack} styleColor="redOutline" class="py-2.5 px-4">
                      Отмена
                    </Button>
                  </>}
              </>
              :
              <>
                <Button onClick={onComplete} class="flex-2 py-2.5 px-4 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors">
                  Завершить этап
                </Button>

                <Button onClick={() => setIsCanc(true)} class="flex-2 py-2.5 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors">
                  Отменить этап
                </Button>
              </>
            }

          </div >
        </div>
      )}
    </div >
  );
};