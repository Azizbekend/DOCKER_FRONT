import { useState } from "react";
import { CompleteCommonStageType, ServiceStageType } from "../entities/service-requests/type";
import { getDate } from "../hook/get-date";
import { Button } from "../shared-ui/button";
import { InputContainer } from "../shared-ui/Inputs/input-container";
import { Textarea } from "../shared-ui/textarea";
import { useAuth } from "../entities/user/context";


interface StageCardProps {
  stage: ServiceStageType
  completeCommon: (data: CompleteCommonStageType) => void
}

export const StageTaskCard = ({ stage, completeCommon }: StageCardProps) => {

  const { user } = useAuth()
  const [descr, setDescr] = useState<string>("")
  const [isСonfirm, setConfirm] = useState<boolean>(false)
  const statusStage = { New: "Новый", Completed: "Завершен", Canceled: "Отменен" }
  const statusColorStage = { New: "bg-blue-500", Completed: "bg-green-500", Canceled: "bg-red-500" }

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <p className="text-gray-800 font-medium">{getDate(stage.createdAt)}</p>

          <div className={`px-2 py-1 rounded-lg text-white ${statusColorStage[[stage!.currentStatus]]}`}>
            {statusStage[stage!.currentStatus]}
          </div>
        </div>
      </div>

      <div className="p-4">

        <div className="grid grid-cols-2 gap-4 mb-4">
          {stage.discription}
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Завершено</div>
            <p className="text-gray-800 font-medium"> {getDate(stage.closedAt) !== "01.01.1, 00:00" ? getDate(stage.closedAt) : '—'}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
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

        {stage.currentStatus === "New" && isСonfirm &&
          <InputContainer headerText="Введите что было выполнено" classNames={{ wrapper: "mt-5" }}>
            <Textarea
              placeholder="Введите что было выполнено..."
              value={descr}
              onChange={setDescr}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none mb-6"
            />
          </InputContainer>
        }

        {isСonfirm ?
          <Button onClick={() => completeCommon({ stageId: Number(stage.id), discription: descr })} class="py-2.5 px-4" styleColor="green">
            Подтвердить
          </Button>
          :
          <Button onClick={() => setConfirm(true)} class="py-2.5 px-4" styleColor="blue">
            Выполнить
          </Button>
        }
      </div>
    </div>
  );
};