import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import orderListModel from "../orders/model/order-list-model";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useAuth } from "@/packages/entities/user/context";
import { OrderCard } from "../../layout/oder-card";
import { Points } from "../../layout/points/points";
import useOrderStatus from "@/packages/entities/order/useOrderStatus";

export const MainView = observer(() => {
  const { user } = useAuth();
  const { initMain, modelMain } = orderListModel;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      initMain(user.id);
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [user]);

  const services = [
    {
      title: "Вывоз ЖБО",
      description: "Удаление жидких бытовых отходов"
    },
    {
      title: "Услуги",
      description: "Удобные услуги для всех"
    },
    {
      title: "Технические условия",
      description: "Предоставление технического условия для подключения к водоснабжению"
    }
  ];

  return (
    <div 
      className="mx-5 mt-10"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Мои заявки</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Карточки заявок */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div 
          className="flex flex-row gap-5 min-w-max" 
          ref={scrollContainerRef}
        >
          {modelMain.map(x => {
            const startDate = new Date(x.arrivalStartDate ?? "");
            const endDate = new Date(x.arrivalEndDate ?? "");
            const formattedDate = format(startDate, 'd MMMM yyyy', { locale: ru });

            return (
              <OrderCard 
                key={x.id}
                id={x.id} 
                date={formattedDate} 
                time={`${format(startDate, 'HH:mm')}-${format(endDate, 'HH:mm')}`} 
                statusId={x.orderStatusId} 
                status={useOrderStatus().StatusText(x.orderStatusId)} 
                title="Вывоз ЖБО" 
                code={""} 
              />
            );
          })}
        </div>
      </div>

      {/* Кнопка создания заявки */}
      <div className="mt-8 flex justify">
        <Link 
          to="/trieco/client/order/create/map" 
          className="bg-[#4A85F6] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#3a6bc9] transition-colors shadow-md hover:shadow-lg"
        >
          Создать заявку
        </Link>
      </div>

      {/* Услуги */}
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-gray-800">Услуги</h1>
        <div className="mb-8 w-10 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            {services.map((service, index) => (
              <Link 
                key={index}
                to="/services"
                className="block p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow hover:border-[#4A85F6]"
              >
                <h3 className="font-bold text-lg text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
          
          <div className="flex items-start">
            <div className="w-full">
              <Points />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});