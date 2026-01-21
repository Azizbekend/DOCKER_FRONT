import { useState } from "react";
import { CancelStageType, CompleteEngineerStageType, ServiceStageType } from "../entities/service-requests/type";
import { getDate } from "../hook/get-date";
import { Button } from "../shared-ui/button";
import { InputContainer } from "../shared-ui/Inputs/input-container";
import { Textarea } from "../shared-ui/textarea";
import { useAuth } from "../entities/user/context";


interface StageCardProps {
  stage: ServiceStageType,
  footerBlock?: boolean,
  number: number,
  completeEngineer: (data: CompleteEngineerStageType) => void
  cancelEngineer: (data: CancelStageType) => void,
}

export const StageCard = ({ stage, footerBlock, number, completeEngineer, cancelEngineer }: StageCardProps) => {

  const [descr, setDescr] = useState<string>("")
  const [isCanc, setIsCanc] = useState<boolean>(false)
  const statusStage = { New: "Новый", Completed: "Завершен", Canceled: "Отменен" }
  const statusColorStage = { New: "bg-blue-500", Completed: "bg-green-500", Canceled: "bg-red-500" }


  const { user } = useAuth()

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
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

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Создатель</div>
              <p className="text-gray-800 font-mono text-sm">{stage.creatorId}</p>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Исполнитель</div>
              <p className="text-gray-800 font-mono text-sm">{stage.implementerId}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-black-500 border-t-[1.5px]">
          <p className="mb-1 text-gray-600">Описание:</p>
          {stage.discription}
        </div>


        {stage.cancelDiscription != null || stage.cancelDiscription != "" && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="text-xs text-red-700 uppercase tracking-wide mb-1">Причина отмены</div>
            <p className="text-red-800 text-sm">{stage.cancelDiscription}</p>
          </div>
        )}

        {stage.currentStatus === "New" && isCanc &&
          <InputContainer headerText="Назначить исполнителя" classNames={{ wrapper: "mt-5" }}>
            <Textarea
              placeholder="Введите описание этапа..."
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
            {isCanc ?
              <>
                <Button onClick={() => cancelEngineer({ stageId: Number(stage.id), cancelDiscriprion: descr })} class="py-2.5 px-4" styleColor="red">
                  Подтвердить
                </Button>
                <Button onClick={() => setIsCanc(false)} styleColor="redOutline" class="py-2.5 px-4">
                  Отмена
                </Button>
              </>
              :
              <>
                <Button onClick={() => completeEngineer({ stageId: Number(stage.id), engineerId: user!.id })} class="flex-2 py-2.5 px-4 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors">
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
    </div>
  );
};