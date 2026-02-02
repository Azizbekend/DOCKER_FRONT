import { useEffect } from "react";
import { ServiceStageType } from "../../entities/service-requests/type";
import { getDate } from "../../functions/get-data/get-date";
import { Button } from "../../shared-ui/button/button";
import { InputContainer } from "../../shared-ui/Inputs/input-container";
import { Textarea } from "../../shared-ui/textarea";
import { useAuth } from "../../entities/user/context";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { stageSupplyFormModel } from "@/packages/features/stage-supply/stage-supply-form-model";
import { statusColorStage, statusStage } from "@/packages/functions/get-data/get-stage-status";
import { StageAction, stageActions } from "./stage-actions";
import { getDiscriptionTitle, isDiscription, isSupplierName, getSupplierNameTitle, isCount, isExpenseNumber, isExpense, isCompanyUsers, } from "@/packages/functions/is-value/is-stage-supply-switch-form-input";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { observer } from "mobx-react-lite";



interface StageCardProps {
  stage: ServiceStageType,
  typeAction?: StageAction | null
  setTypeAction?: (value: StageAction) => void,
  supplyRequestAction: (data: any) => void,
  hardwareId: number,
}


export const StageTaskSupplyCard = observer(({ setTypeAction, stage, supplyRequestAction, typeAction, hardwareId }: StageCardProps) => {

  const { user } = useAuth()
  const { init, setImplementerId, getUserList, data, companyList, userList, setDiscription, setSupplierName, setCount, setExpenseNumber, setExpenses, } = stageSupplyFormModel

  useEffect(() => {
    if (stage) {
      init({
        creatorId: user?.id,
        creatiorCompanyId: user?.companyId,
        hardwareId: hardwareId,
        objectId: getObjectId(),
        serviceId: stage.serviceId,
        stageId: stage.id,
      })
    }
  }, [stage])

  const onSubmit = () => {
    supplyRequestAction(data)
  }

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-4 border-b rounded-xl border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <p className="text-gray-800 font-medium">{getDate(stage.createdAt)}</p>

          <div className={`px-2 py-1 rounded-lg text-white ${statusColorStage[stage.currentStatus]}`}>
            {statusStage[stage.currentStatus]}
          </div>
        </div>
      </div>

      <div>
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

          {/* ===    ОСОБЕННОСТИ ПОСТАВОЧНОЙ ЗАЯВКИ     === */}

          <div className="mt-5 pt-4 border-black-500 border-t-[1.5px]">
            <p className="mb-1 text-gray-600">{"Требования к поставке"}</p>
            {stage.discription}
          </div>

          {(stage.cancelDiscription?.length > 0 && stage.cancelDiscription !== "None") && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="text-xs text-red-700 uppercase tracking-wide mb-1">Причина отмены</div>
              <p className="text-red-800 text-sm">{stage.cancelDiscription}</p>
            </div>
          )}

          {typeAction &&
            <div className="flex flex-col gap-4 mt-5 mb-5">
              {isDiscription(typeAction) &&
                <InputContainer headerText={getDiscriptionTitle(typeAction)}>
                  <Textarea
                    placeholder="Описание..."
                    value={data.discription}
                    onChange={setDiscription}
                    className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
                  />
                </InputContainer>
              }

              {isSupplierName(typeAction) &&
                <InputContainer headerText={getSupplierNameTitle(typeAction)}>
                  <Input
                    placeholder="Имя поставщика"
                    className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                    value={data.supplierName || ""}
                    onChange={(e) => setSupplierName(e)}
                    type="string"
                  />
                </InputContainer>
              }

              {isCount(typeAction) &&
                <InputContainer headerText={"Количество"}>
                  <Input
                    placeholder="Количество"
                    className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                    value={data.count || ""}
                    onChange={(e) => setCount(Number(e))}
                    type="number"
                  />
                </InputContainer>
              }

              {isExpenseNumber(typeAction) &&
                <InputContainer headerText={"Номер счёта"}>
                  <Input
                    placeholder="Номер счёта"
                    className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                    value={data.expenseNumber || ""}
                    onChange={(e) => setExpenseNumber(e)}
                    type="number"
                  />
                </InputContainer>
              }
              {isExpense(typeAction) &&
                <InputContainer headerText={"Цена"}>
                  <Input
                    placeholder="Цена"
                    className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                    value={data.expenses || ""}
                    onChange={(e) => setExpenses(e)}
                    type="number"
                  />
                </InputContainer>
              }


              {isCompanyUsers(typeAction) &&
                <div className="border-t border-gray-400 mt-6 pt-8 space-y-4 ">



                  <InputContainer headerText="Выберете компанию">
                    <Selector
                      placeholder="Выберете компанию"
                      classWripper="w-full"
                      items={companyList}
                      onSelect={(item) => { getUserList(Number(item.value)) }}
                      icon="arrow-down"
                    />
                  </InputContainer>

                  {data.implementersCompanyId != 0 && (userList.length > 0 ?
                    <InputContainer headerText="Выберете ответственное лицо">
                      <Selector
                        placeholder="Выберете ответственное лицо"
                        classWripper="w-full"
                        items={userList}
                        onSelect={(item) => { setImplementerId(Number(item.value)) }}
                        icon="arrow-down"
                      />
                    </InputContainer>
                    : <div>У компании отсутвствуют ответственные лица </div>)}
                </div>
              }

            </div>
          }
        </div>



        {stage.currentStatus === "New" && (
          <div className="p-4 border-t border-gray-300">
            <div className="flex gap-2">
              <Selector
                placeholder="Выберите действие"
                classWripper="w-full"
                titleClass="!border-gray-300"
                items={stageActions}
                onSelect={(item) => { setTypeAction(item.value) }}
                icon="arrow-down"
              />

              <Button class="px-4" styleColor="blueOutline" onClick={onSubmit}>
                Подтвердить
              </Button>
            </div >
          </div>
        )}
      </div>
    </div>
  );
})