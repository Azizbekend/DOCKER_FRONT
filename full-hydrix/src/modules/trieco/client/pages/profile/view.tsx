import clientModel from "../../kernel/model/client-model";
import updateUserModel from "./model/update-user";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Icon } from "@/packages/shared-ui/icon";
import { Button } from "@/packages/shared-ui/button";
import { useAuth } from "@/packages/entities/user/context";

export const ProfileView = observer(() => {
  const { model, init, changeEmail, changeFirstName, changeLastName, changeMiddleName, changePhone, update, isValid } = updateUserModel;
  const { setUser, user } = useAuth();

  useEffect(() => {
    if (user) {
      init(user);
    }
  }, [user]);

  // Получение инициалов для аватара
  const getInitials = () => {
    if (!model) return '--';
    const firstInitial = model.firstName?.charAt(0) || '';
    const lastInitial = model.lastName?.charAt(0) || '';
    return (lastInitial + firstInitial).toUpperCase() || '--';
  };

  return (
    <div 
      className="mx-5 mt-10"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Профиль пользователя</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          {/* Аватар и имя */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-5">
              {/* Аватар с инициалами */}
              <div className="w-16 h-16 rounded-full bg-[#4A85F6] flex items-center justify-center text-white font-bold text-lg">
                {getInitials()}
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {model?.lastName} {model?.firstName} {model?.patronymic}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {model?.email}
                </p>
              </div>
            </div>
            
            {/* Кнопка изменения фото */}
            {/* <button className="mt-4 sm:mt-0 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Icon systemName="gallery" className="w-4 h-4 mr-2 inline" />
              Изменить фото
            </button> */}
          </div>

          {/* Персональные данные */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Персональные данные</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
              <InputContainer headerText="Фамилия" isRequired>
                <Input
                  type="text"
                  placeholder="Иванов"
                  value={model?.lastName || ''}
                  onChange={changeLastName}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </InputContainer>
              
              <InputContainer headerText="Имя" isRequired>
                <Input
                  type="text"
                  placeholder="Иван"
                  value={model?.firstName || ''}
                  onChange={changeFirstName}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </InputContainer>
              
              <InputContainer headerText="Отчество">
                <Input
                  type="text"
                  placeholder="Иванович"
                  value={model?.patronymic || ''}
                  onChange={changeMiddleName}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </InputContainer>
              
              <InputContainer headerText="E-mail" isRequired>
                <Input
                  type="email"
                  placeholder="ivanovivan@gmail.com"
                  value={model?.email || ''}
                  onChange={changeEmail}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </InputContainer>
              
              <InputContainer headerText="Мобильный телефон" isRequired>
                <Input
                  type="tel"
                  placeholder="+7 (965) 457-45-66"
                  value={model?.phoneNumber || ''}
                  onChange={changePhone}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                />
              </InputContainer>
            </div>
          </div>
        </div>

        {/* Кнопка сохранения */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <Button
            onClick={() => update(setUser)}
            disabled={!isValid}
            class={`px-6 py-3 font-semibold rounded-lg transition-colors min-w-[180px] ${
              isValid
                ? 'bg-[#4A85F6] hover:bg-[#3a6bc9] text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Обновить профиль
          </Button>
        </div>
      </div>
    </div>
  );
});