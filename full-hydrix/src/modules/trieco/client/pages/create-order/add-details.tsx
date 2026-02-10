import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { SelectionComponent } from "../../layout/selection";
import { Button } from "@/packages/shared-ui/button/button";
import InputCheckbox from "@/packages/shared-ui/Inputs/input-checkbox";
import { useAuth } from "@/packages/entities/user/context";
import dayjs from 'dayjs';
import { createOrderModel } from "./entities/create-order-model";

export const AddDetails = observer(({ getPage }: { getPage: () => void }) => {
  const { user } = useAuth();
  const { 
    model,
    changeDate,
    changeStartTime,
    canSave,
    changeFirstName,
    changeLastName,
    changeMiddleName,
    changePhone,
    changeWaste,
    selectedPoint,
    switchSelfCreated,
    isSelfCreated 
  } = createOrderModel;
  
  const [cost, setCost] = useState(0);

  // Расчёт стоимости
  useEffect(() => {
    const basePrice = selectedPoint ? selectedPoint.wasteVolume * 500 : model.wasteVolume * 600;
    setCost(basePrice);
  }, [model.wasteVolume, selectedPoint]);

  // Обработчик выбора объёма
  const handleWasteSelect = (value: number) => {
    changeWaste(value);
  };

  // Обработчик времени
  const handleTimeChange = (value: string | null) => {
    if (!value) return;
    
    const selectedTime = dayjs(value, 'HH:mm');
    const now = dayjs();
    const minTime = model.date === now.format('YYYY-MM-DD') 
      ? now.startOf('minute') 
      : dayjs().hour(7).minute(0);
    const maxTime = dayjs().hour(22).minute(0);

    if (selectedTime.isBetween(minTime, maxTime, null, '[]')) {
      changeStartTime(value);
    }
  };

  // Автозаполнение данных пользователя
  useEffect(() => {
    if (isSelfCreated && user) {
      changeLastName(user.lastName || '');
      changeFirstName(user.firstName || '');
      changeMiddleName(user.patronymic || '');
      changePhone(user.phoneNumber || '');
    }
  }, [isSelfCreated, user]);

  return (
    <div 
      className="mx-5 mt-10"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800 xl:text-3xl">Уточните детали вывоза сточных вод</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      <div className="space-y-8">
        {/* Блок 1: Время вывоза */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Когда подать машину?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputContainer
              headerText="Дата вывоза"
              isRequired
            >
              <Input
                type="date"
                value={model.date}
                onChange={changeDate}
                min={dayjs().format('YYYY-MM-DD')}
                className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
              />
            </InputContainer>
            
            <InputContainer
              headerText="Время начала"
              isRequired
            >
              <input
                type="time"
                value={model.startTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                min={model.date === dayjs().format('YYYY-MM-DD') ? dayjs().format('HH:mm') : '07:00'}
                max="22:00"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
              />
            </InputContainer>
          </div>

          {model.endTime && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-700">
                Примерное время приезда с <span className="font-semibold">{model.startTime}</span> до <span className="font-semibold">{model.endTime}</span>
              </span>
            </div>
          )}
        </div>

        {/* Блок 2: Объём и оплата */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!selectedPoint && (
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Объём септика/колодца <span className="text-red-600">*</span>
                  </label>
                </div>
                <SelectionComponent 
                  items={WasteList} 
                  selected={model.wasteVolume} 
                  onSelect={(item) => handleWasteSelect(item.value)} 
                />
              </div>
            )}

            <div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Способ оплаты <span className="text-red-600">*</span>
                </label>
              </div>
              <SelectionComponent 
                items={PaymentTypeList} 
                selected={model.paymentType || 0} 
                onSelect={(item) => {/* handle payment selection */}} 
              />
            </div>
          </div>
        </div>

        {/* Блок 3: Контактные данные */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Данные контактного лица</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <InputContainer headerText="Фамилия" isRequired>
              <Input
                type="text"
                placeholder="Фамилия"
                value={model.surname}
                onChange={changeLastName}
                disabled={isSelfCreated}
                className={`w-full h-12 border rounded-lg px-4 py-2.5 focus:outline-none ${
                  isSelfCreated 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent'
                }`}
              />
            </InputContainer>
            
            <InputContainer headerText="Имя" isRequired>
              <Input
                type="text"
                placeholder="Имя"
                value={model.name}
                onChange={changeFirstName}
                disabled={isSelfCreated}
                className={`w-full h-12 border rounded-lg px-4 py-2.5 focus:outline-none ${
                  isSelfCreated 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent'
                }`}
              />
            </InputContainer>
            
            <InputContainer headerText="Отчество">
              <Input
                type="text"
                placeholder="Отчество"
                value={model.patronymic}
                onChange={changeMiddleName}
                disabled={isSelfCreated}
                className={`w-full h-12 border rounded-lg px-4 py-2.5 focus:outline-none ${
                  isSelfCreated 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent'
                }`}
              />
            </InputContainer>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <InputContainer headerText="Телефон" isRequired>
              <Input
                type="tel"
                placeholder="+7 (843) XXX-XX-XX"
                value={model.phone}
                onChange={changePhone}
                disabled={isSelfCreated}
                className={`w-full h-12 border rounded-lg px-4 py-2.5 focus:outline-none ${
                  isSelfCreated 
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent'
                }`}
              />
            </InputContainer>

            <div className="flex items-center">
              <InputCheckbox
                checked={!isSelfCreated}
                onChange={() => switchSelfCreated()}
                label="Другое контактное лицо"
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Блок 4: Стоимость и кнопка */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm text-gray-600">Стоимость услуги</div>
              <div className="text-2xl font-bold text-gray-800">{cost.toLocaleString()} ₽</div>
            </div>
            
            <Button
              disabled={!canSave()}
              onClick={getPage}
              class={`px-8 py-3 rounded-lg font-bold text-white transition-colors min-w-[200px] ${
                canSave() 
                  ? 'bg-[#4A85F6] hover:bg-[#3a6bc9] shadow-md hover:shadow-lg' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});