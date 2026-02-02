import { Button } from "@/packages/shared-ui/button/button";
import { Modal } from "@/packages/shared-ui/modal/modal";
import { observer } from "mobx-react-lite";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { addCompanyModel } from "../models/add-company-model";
import Loader from "@/packages/shared-ui/loader/loader";
import { Icon } from "@/packages/shared-ui/icon";
import { useEffect } from "react";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Selector } from "@/packages/shared-ui/Selector/selector";

export const AddCompanyModal = observer(({ show, setShow, objectId, pushParticipants }: { show: boolean; setShow: (show: boolean) => void, objectId: number; pushParticipants: (value: any) => void }) => {
  const { innValue, setInnValue, stageModal, onSearchCompany, loaderSearch, model, openFullData, setOpenFullData, setStageModal, roleCompany, setRoleCompany, reset, addCompany } = addCompanyModel;

  useEffect(() => {
    reset()
  }, [])

  return (
    <Modal
      wrapperId="sewerInfoModal"
      type="center"
      show={show}
      setShow={setShow}
      title="Добавление организации"
      classNames={{
        panel: "max-w-2xl w-full rounded-2xl h-full min-h-[500px]",
        header: "border-b border-gray-200",
        footer: "bg-gray-50 p-5 rounded-b-2xl"
      }}
      children={
        <div className="p-6 max-h-[70vh] overflow-y-auto">

          {stageModal === 'form' && <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Поиск по ИНН
              </label>
              <Input
                type="number"
                placeholder="Введите ИНН организации"
                value={innValue}
                onChange={setInnValue}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                lengthOptions={{
                  maxLength: 12,
                }}
              />
            </div>

            <Button
              onClick={onSearchCompany}
              class="px-5 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors shadow-sm"
            >
              Найти организацию
            </Button>
          </div>
          }

          {stageModal === 'xz' &&
            <InputContainer headerText="Укажите роль организации">
              <Selector
                placeholder="Укажите роль организации"
                classWripper="w-full"
                items={[
                  { value: "Заказчик", title: "Заказчик" },
                  { value: "Генеральный подрядчик", title: "Генеральный подрядчик" },
                  { value: "Эксплуатирующая организация", title: "Эксплуатирующая организация" },
                  { value: "Подрядчик", title: "Подрядчик" },
                ]}
                onSelect={(item) => { setRoleCompany(item.value) }}
                icon="arrow-down"
              />
            </InputContainer>
          }

          {loaderSearch ? <Loader /> : innValue.trim() && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              {model.id != 0 && (model.id == null ?
                <p className="text-md text-gray-600">
                  Компания не найдена
                </p>
                :
                <div key={model.id}
                  // onClick={() => onActiveCompanies(company.id)}
                  className={`border rounded-xl p-5 cursor-pointer transition-all border-[#4A85F6] border-gray-200 hover:border-gray-300 hover:bg-gray-50`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-gray-800">{model.shortName}</div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      Действующая
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1.5">
                    <div className="flex justify-between">
                      <span>ИНН:</span>
                      <span className="font-medium">{model.inn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Адрес:</span>
                      <span className="font-medium max-w-[200px] text-right truncate">{model.factAdress}</span>
                    </div>

                    {openFullData && <>
                      <div className="flex justify-between">
                        <span>КПП:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{model.kpp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ОГРН:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{model.ogrn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Юр. адрес:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{model.juridicalAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Фактический адрес:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{model.factAdress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Директор:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{model.directorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Номер тел.:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{model.phoneNumber}</span>
                      </div>
                    </>
                    }
                  </div>

                  <div className="mt-3 text-[#4A85F6] text-sm font-medium flex items-center gap-1" onClick={() => setOpenFullData(!openFullData)}>
                    Все реквизиты

                    <div className="duration-300 ml-3 mt-1" style={{ rotate: openFullData ? "90deg" : "-90deg" }}>
                      <Icon systemName="arrow-left-blue" width={8} />
                    </div>

                  </div>
                </div>)
              }
            </div>
          )}
        </div >
      }
      footerSlot={
        <div className="flex items-center justify-between" >
          {stageModal === 'xz' && (
            <button
              onClick={() => setStageModal('form')}
              className="flex items-center gap-1.5 text-[#4A85F6] font-medium hover:opacity-80 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад
            </button>
          )}

          <div className="flex gap-3 ml-auto">
            <Button
              onClick={() => { reset(); setShow(false) }}
              class="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отменить
            </Button>
            {stageModal === 'form' ? (
              <Button
                onClick={() => setStageModal("xz")}
                disabled={model.id == 0 || model.id == null}
                class="px-5 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Дальше
              </Button>
            ) : (
              <Button
                onClick={() => { addCompany(objectId, pushParticipants); setShow(false); }}
                class="px-5 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors"
              >
                Добавить
              </Button>
            )}
          </div>

        </div >
      }
    />
  );
});
