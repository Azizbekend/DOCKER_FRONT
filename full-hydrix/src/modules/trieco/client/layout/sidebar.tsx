import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";
import { createOrderModel } from "../pages/create-order/entities/create-order-model";
import logo from "./static/logo-3.png";
import { useAuth } from "@/entities/user/context";

export const Sidebar = observer(() => {
  const { logout } = useAuth();
  const { pageCounter, setPage } = createOrderModel;
  const location = useLocation();

  const steps = [
    { id: 1, label: "Местоположение" },
    { id: 2, label: "Детали заявки" },
    { id: 3, label: "Оформление заявки" }
  ];

  return (
    <div 
      className="h-screen w-[320px] bg-gradient-to-b from-[#4A85F6] to-[#3a6bc9] flex flex-col justify-between p-6"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Верхняя часть */}
      <div className="flex flex-col">
        {/* Логотип и заголовок */}
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="Логотип" className="w-10 h-10" />
          <span className="font-bold text-white text-lg">ИАС «Цифровой Водоканал»</span>
        </div>

        {/* Шаги оформления */}
        {location.pathname === "/order/create" && (
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isCompleted = pageCounter > step.id;
              const isActive = pageCounter === step.id;
              const isClickable = step.id <= 2; // Последний шаг не кликабелен

              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-4 relative pl-12 cursor-pointer group ${
                    isClickable ? '' : 'opacity-70'
                  }`}
                  onClick={() => isClickable && setPage(step.id)}
                >
                  {/* Вертикальная линия */}
                  {index < steps.length - 1 && (
                    <div className={`absolute left-6 top-9 w-0.5 h-full ${
                      pageCounter > step.id ? 'bg-white' : 'bg-white/30'
                    }`} />
                  )}

                  {/* Номер шага */}
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm
                    ${isCompleted 
                      ? 'bg-white text-[#4A85F6] border-white' 
                      : isActive 
                        ? 'bg-[#4A85F6] text-white border-white' 
                        : 'bg-transparent text-white border-white'
                    }
                  `}>
                    {isCompleted ? <Icon systemName="check" className="w-4 h-4" /> : step.id}
                  </div>

                  {/* Название шага */}
                  <span className={`font-medium ${
                    isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Нижняя часть */}
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-white font-bold text-xl leading-tight">
            Повысьте комфорт
          </h3>
          <p className="text-white/90 text-sm mt-1">
            с ИАС «Цифровой Водоканал»
          </p>
        </div>
        
        <Button
  class="flex items-center gap-2.5 px-4 py-2.5 w-40 bg-[#4A85F6] hover:bg-[#3a6bc9] rounded-lg font-medium text-white transition-colors duration-200 shadow-sm hover:shadow-md"
  onClick={logout}
>
  <Icon systemName="exit" className="w-4 h-4" />
  <span>Выйти</span>
</Button>
      </div>
    </div>
  );
});