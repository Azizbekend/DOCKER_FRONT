import { useState } from "react";
import { CompleteCommonStageType, ServiceStageType } from "../../entities/service-requests/type";
import { getDate } from "../../functions/get-data/get-date";
import { Button } from "../../shared-ui/button/button";
import { InputContainer } from "../../shared-ui/Inputs/input-container";
import { Textarea } from "../../shared-ui/textarea";
import { useAuth } from "../../entities/user/context";
import { Role } from "../../entities/user/enums";



interface StageCardProps {
  stage: ServiceStageType,
  completeCommon: (data: CompleteCommonStageType) => void
}


export const StageTaskCard = ({ stage, completeCommon }: StageCardProps) => {

  const { user } = useAuth()
  const [isСonfirm, setConfirm] = useState<boolean>(false)

  const [descr, setDescr] = useState<string>("")
  const statusStage = { New: "Новый", Completed: "Завершен", Canceled: "Отменен" }
  const statusColorStage = { New: "bg-blue-500", Completed: "bg-green-500", Canceled: "bg-red-500" }

  const onComplete = () => {
    completeCommon({ stageId: Number(stage.id), discription: descr })
  }

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4 border-b rounded-xl border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <p className="text-gray-800 font-medium">{getDate(stage.createdAt)}</p>

          <div className={`px-2 py-1 rounded-lg text-white ${statusColorStage[[stage!.currentStatus]]}`}>
            {statusStage[stage!.currentStatus]}
          </div>
        </div>
      </div>



      <div className="p-4">

        {stage.discription &&
          <div className="mb-6 border-b-[1.5px] pb-4 border-gray-300">
            {stage.discription}
          </div>
        }

        <div className="space-y-4 mb-5">
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

        {stage.currentStatus == "New" && (isСonfirm ?
          <div className="flex gap-4">
            <Button onClick={onComplete} class="py-2.5 px-4" styleColor="green">
              Подтвердить
            </Button>
            <Button onClick={() => setConfirm(false)} class="py-2.5 px-4" styleColor="gray">
              Отмена
            </Button>
          </div>
          :
          <Button onClick={() => setConfirm(true)} class="py-2.5 px-4" styleColor="blue">
            Выполнить
          </Button>)
        }
      </div>
    </div>
  );
};