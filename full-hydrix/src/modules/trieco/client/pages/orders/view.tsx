import { format, parseISO } from 'date-fns';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import clientModel from "../../kernel/model/client-model";
import ordersListModel from "./model/order-list-model";
import { observer } from "mobx-react-lite";
import { ru } from "date-fns/locale";
import orderModel from "./model/order-model";
import { Icon } from "@/shared/ui/icon";
import { Order } from "./service/order";
import { formatAddress } from "@/shared/ui/format-adress";
import { OrderStatus } from "@/entities/order/order-status";
import useOrderStatus from "@/entities/order/useOrderStatus";
import { OrderStatusText, StatusColor } from "@/app/cores/core-trieco/lib/order";
import { OrderCard } from "../../layout/oder-card";
import { Table } from "@/shared/ui/table/index";
import { Button } from "@/shared/ui/button";
import { TableColumn } from "@/shared/ui/table/types";
import { useAuth } from '@/entities/user/context';
import { OrderModal } from './components/order-modal';

const columns: TableColumn<Order>[] = [
  {
    header: "Номер заявки",
    key: 'id',
    cell: ({ id }) => {
      return <div className="text-[#4A85F6] text-sm font-semibold">{id}</div>;
    }
  },
  {
    header: "Адрес",
    key: 'adress',
    cell: ({ adress }) => {
      return <span className="text-sm">{adress && formatAddress(adress)}</span>;
    },
  },
  {
    header: 'Объём',
    key: 'wasteVolume',
    cell: ({ wasteVolume }) => {
      return <span className="text-sm">{wasteVolume} м³</span>;
    },
  },
  {
    header: 'Дата и время',
    key: 'arrivalStartDate',
    cell: ({ arrivalStartDate, arrivalEndDate }) => {
      const arrivalStartDateISO = parseISO(arrivalStartDate || "");
      const arrivalEndDateISO = parseISO(arrivalEndDate || "");
      return (
        <span className="text-sm">
          {format(arrivalStartDateISO, 'dd.MM.yyyy')}<br />
          {format(arrivalStartDateISO, 'HH:mm')}–{format(arrivalEndDateISO, 'HH:mm')}
        </span>
      );
    },
  },
  {
    header: 'Дата создания',
    key: 'timeOfPublication',
    cell: ({ timeOfPublication }) => {
      const date = parseISO(timeOfPublication);
      return <div className="text-sm text-center">{format(date, 'd MMMM yyyy HH:mm', { locale: ru })}</div>;
    },
  },
  {
    header: 'Статус',
    key: 'orderStatusId',
    width: "190px",
    cell: ({ orderStatusId }) => {
      const status = (orderStatusId ?? OrderStatus.Cancelled) as OrderStatus;
      const bgColor = StatusColor(status);
      const statusText = OrderStatusText[status];
      
      return (
        <span 
          className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
          style={{ backgroundColor: bgColor }}
        >
          {statusText}
        </span>
      );
    },
  },
  {
    header: 'Код',
    key: 'code',
    cell: ({ code }) => {
      return <span className="text-sm w-full text-center font-semibold">{code}</span>;
    },
  },
];

export const OrdersView = observer(() => {
  const { user } = useAuth();
  const { initMain, modelMain, init, model, filteredModel, filter, filterId, isInit, toggleInit } = ordersListModel;

  useEffect(() => {
    if (user) {
      init(user.id);
      initMain(user.id);
    }
    return () => {
      toggleInit();
    };
  }, [user]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const statuses = Object.keys(OrderStatusText).map((key) => Number(key));

  return (
    <div 
      className=" mx-5 mt-10"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <OrderModal isOpen={isOrderModalOpen} setShow={setIsOrderModalOpen} />

      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Мои заявки</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Карточки заявок */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex flex-row gap-5 min-w-max" ref={scrollContainerRef}>
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
                  status={OrderStatusText[x.orderStatusId as OrderStatus]} 
                  title="Вывоз ЖБО" 
                  code={""} 
                />
              );
            })}
          </div>
        </div>

        {/* Кнопка создания заявки */}
        <div className="flex ">
          <Link 
            to={'/trieco/client/order/create/map'} 
            className="bg-[#4A85F6] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#3a6bc9] transition-colors shadow-md hover:shadow-lg"
          >
            Создать заявку
          </Link>
        </div>

        {/* Фильтры и таблица */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          {/* Панель фильтров */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <Button
              onClick={() => filter(-1)}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterId === -1
                  ? 'bg-[#4A85F6] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Все
            </Button>
            
            <div className="h-5 w-px bg-gray-300" />
            
            <span className="text-gray-700 font-medium">Статус:</span>
            
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  onClick={() => filter(status)}
                  class="px-3 py-1.5 rounded-full text-white text-sm font-medium transition-opacity"
                  style={{ 
                    backgroundColor: StatusColor(status as OrderStatus),
                    opacity: filterId === status ? 1 : 0.7
                  }}
                >
                  {OrderStatusText[status]}
                </Button>
              ))}
            </div>
          </div>

          {/* Таблица */}
          <Table
            columns={columns}
            data={model.length > 0 ? model : []}
            onRowClick={(value) => {
              const order = model.find(x => x.id === value.id);
              if (order) {
                orderModel.open(order);
                setIsOrderModalOpen(true);
              }
            }}
            classNames={{
              body: "max-h-[60vh]",
              thead: "bg-gray-50",
            }}
          />
        </div>
      </div>
    </div>
  );
});
