import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Modal } from "@/shared/ui/modal/modal";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { createCompanyModel } from "../../../model/participants-model copy";
import { Input } from "@/shared/ui/Inputs/input-text";
import { SwitchButton } from "@/shared/ui/switch-button";

export const CreateCompanyModal = observer(({ show, setShow }: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const { innInput, roleInput, companyList, setInnInput, setRoleInput, createCompany } = createCompanyModel;
  const [activeCompanies, setActiveCompanies] = useState<number[]>([]);
  const [stageModal, setStageModal] = useState<number>(0);
  const [lookCompanies, setLookCompanies] = useState<boolean>(false);

  const onSearchCompany = () => {
    if (innInput.trim()) {
      setLookCompanies(true);
      // Здесь должна быть логика поиска, сейчас мок
    }
  };

  const onActiveCompanies = (id: number) => {
    if (activeCompanies.includes(id)) {
      setActiveCompanies(activeCompanies.filter(item => item !== id));
    } else {
      setActiveCompanies([id]); // Только одна организация может быть выбрана
    }
  };

  return (
    <Modal
      wrapperId="sewerInfoModal"
      type="center"
      show={show}
      setShow={setShow}
      title="Добавление организации"
      classNames={{
        panel: "max-w-2xl w-full rounded-2xl",
        header: "border-b border-gray-200",
        footer: "bg-gray-50 p-5 rounded-b-2xl"
      }}
      children={
        <div className="p-6 max-h-[70vh] overflow-y-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          {stageModal === 0 ? (
            /* Шаг 1: Поиск */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Наименование организации или ИНН
                </label>
                <Input
                  type="text"
                  placeholder="Введите наименование или ИНН"
                  value={innInput}
                  onChange={setInnInput}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </div>

              <Button
                onClick={onSearchCompany}
                class="px-5 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors shadow-sm"
              >
                Найти организацию
              </Button>
            </div>
          ) : (
            /* Шаг 2: Роль */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Роль</label>
                <Input
                  type="text"
                  placeholder="Укажите роль организации"
                  value={roleInput}
                  onChange={setRoleInput}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Заказчик</span>
                <SwitchButton
                  onChange={() => {}}
                  classNames={{
                    container: "gap-3",
                    button: "w-12 h-6 rounded-full bg-gray-300 relative",
                    circle: "rounded-full bg-white h-4 w-4 absolute top-1 left-1 transition-transform",
                    activeButton: "bg-[#4A85F6]",
                    activeCircle: "left-7"
                  }}
                />
              </div>
            </div>
          )}

          {/* Результаты поиска */}
          {lookCompanies && innInput.trim() && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              {companyList.length > 0 ? (
                companyList.map((company) => (
                  <div
                    key={company.id}
                    className={`border rounded-xl p-5 cursor-pointer transition-all ${
                      activeCompanies.includes(company.id)
                        ? 'border-[#4A85F6] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => onActiveCompanies(company.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-gray-800">{company.name}</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        Действующая
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1.5">
                      <div className="flex justify-between">
                        <span>ИНН:</span>
                        <span className="font-medium">{company.inn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Адрес:</span>
                        <span className="font-medium max-w-[200px] text-right truncate">{company.address}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-[#4A85F6] text-sm font-medium flex items-center gap-1">
                      Все реквизиты
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">Организации не найдены</div>
              )}
            </div>
          )}
        </div>
      }
      footerSlot={
        <div className="flex items-center justify-between">
          {stageModal > 0 && (
            <button
              onClick={() => setStageModal(0)}
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
              onClick={() => setShow(false)}
              class="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отменить
            </Button>
            {stageModal === 0 ? (
              <Button
                onClick={() => setStageModal(1)}
                disabled={activeCompanies.length === 0}
                class="px-5 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Дальше
              </Button>
            ) : (
              <Button
                onClick={() => { createCompany(); setShow(false); }}
                class="px-5 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors"
              >
                Добавить
              </Button>
            )}
          </div>
        </div>
      }
    />
  );
});
