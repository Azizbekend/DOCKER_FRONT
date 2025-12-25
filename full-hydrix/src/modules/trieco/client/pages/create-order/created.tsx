import { useNavigate } from "react-router-dom";
import { createOrderModel } from "./entities/create-order-model";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";

export const Created = ({ getPage }: { getPage: () => void }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    createOrderModel.clearCounter();
    getPage();
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b  to-white"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <div className="max-w-md w-full  animate-fadeIn text-center">
        {/* Иконка успеха с анимацией */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
         <Icon systemName="checkmate" className="w-20 h-20  rounded-full flex items-center justify-center w-12 h-12 text-green-600" />
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight">
          Спасибо!
        </h1>

        {/* Основной текст */}
        <p className="text-gray-600 text-xl leading-relaxed mb-10 max-w-prose">
          Ваша заявка успешно оформлена. Следите за её статусом на главной странице или в списке заявок!
        </p>

        {/* Кнопка */}
        <Button onClick={getPage} children={"На главную"} class="text-white bg-[#4A85F6] mx-auto  justify-center  py-3 px-10" />
      </div>
    </div>
  );
};