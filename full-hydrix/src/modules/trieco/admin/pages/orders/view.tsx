import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { Input } from "@/app/cores/core-trieco/UIKit/input";
import { ExtendedColumnDef, Table } from "@/app/cores/core-trieco/UIKit/table";
import { format, parseISO } from "date-fns";
import orderListModel from "./model/order-list-model";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AttachSewerModal } from "./components/add-sewer-modal";
import { ru } from "date-fns/locale";
import attachSewerModel from "./model/attach-sewer-model";
import { OrderStatus, StatusColor, OrderStatusText } from "@/app/cores/core-trieco/lib/order";
import { OrderModal } from "./components/order-modal";
import orderModel from "./model/order-model";
import { Button } from "@/app/cores/core-trieco/UIKit";
import { formatAddress } from "@/app/cores/core-trieco/UIKit/format-adress";
import { CreateOrderModal } from "./components/create-order-modal";
import adminModel from "../../kernel/model/admin-model";
import { useAuth } from "@/packages/entities/user/context";

const columns: ExtendedColumnDef<any, any>[] = [
  {
    header: "ФИО Заказчика",
    accessorKey: 'firstName',
    size: 200,
    cell: ({ row }) => {
      return (
        <span className="text-sm font-medium text-gray-800">
          {row.original['userLastName']} {row.original['userFirstName']}
        </span>
      );
    },
  },
  {
    header: "Адрес",
    accessorKey: 'adress',
    size: 180,
    cell: info => {
      return (
        <span className="text-sm text-gray-700">{formatAddress(info.getValue())}</span>
      );
    },
  },
  {
    header: 'Объем',
    accessorKey: 'wasteVolume',
    size: 80,
    cell: info => {
      return (
        <span className="text-sm text-gray-700">{info.getValue()} м³</span>
      );
    },
  },
  {
    header: 'Район',
    accessorKey: 'municipalityName',
    size: 120,
    cell: ({ row }) => {
      if (row.original['adress'] === null) {
        return (
          <div className="text-sm text-gray-500">Не указан</div>
        );
      }
      return (
        <div className="text-sm text-gray-700">{row.original['municipalities']['name']}</div>
      );
    },
  },
  {
    header: 'Дата и время',
    accessorKey: 'carNumber',
    size: 140,
    cell: ({ row }) => {
      const arrivalStartDate = parseISO(row.original["arrivalStartDate"]);
      const arrivalEndDate = parseISO(row.original["arrivalEndDate"]);
      return (
        <span className="text-sm text-gray-700">
          {format(arrivalStartDate, 'dd.MM.yyyy')}<br />
          {format(arrivalStartDate, 'HH:mm')}-{format(arrivalEndDate, 'HH:mm')}
        </span>
      );
    },
  },
  {
    header: 'Дата создания',
    accessorKey: 'timeOfPublication',
    size: 140,
    cell: info => {
      const date = new Date(info.getValue());
      return (
        <div className="text-sm text-gray-700 text-center">
          {format(date, 'd MMMM yyyy HH:mm', { locale: ru })}
        </div>
      );
    },
  },
  {
    header: 'Статус',
    accessorKey: 'orderStatusId',
    filterOptions: [
      { title: "Новый", value: 1 }, 
      { title: "В пути", value: 2 }, 
      { title: "В утилизации", value: 3 }, 
      { title: "Выполнено", value: 4 }, 
      { title: "Отклонено", value: 5 }, 
      { title: "Принято", value: 6 }
    ],
    size: 160,
    cell: info => {
      let el = Number(info.getValue()) as OrderStatus;
      
      if (info.getValue() === undefined) {
        el = OrderStatus.Cancelled;
      }
      
      const bgColor = StatusColor(el);
      const statusText = OrderStatusText[el];
      
      return (
        <div 
          className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
          style={{ backgroundColor: bgColor }}
        >
          {statusText}
        </div>
      );
    },
  },
  {
    header: 'Исполнитель',
    accessorKey: 'executorName',
    size: 140,
    cell: ({ row }) => {
      if (row.original['sewerFirstName'] === null) {
        return (
          <div className="text-sm text-gray-500 text-center">Не назначен</div>
        );
      }
      return (
        <div className="text-sm font-medium text-gray-800 text-center">
          {row.original['sewerFirstName']} {row.original['sewerLastName']}
        </div>
      );
    },
  },
  {
    header: '',
    accessorKey: 'edit',
    size: 60,
    cell: ({ row }) => {
      const orderStatus = Number(row.original['orderStatusId']);
      
      if (orderStatus === 1) {
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              attachSewerModel.setModalShow(true, Number(row.original['id']));
            }}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Назначить исполнителя"
          >
            <Icon systemName="edit" className="w-5 h-5" />
          </button>
        );
      }
      return null;
    },
  },
];

export const OrderListView = observer(() => {
  const { 
    init, 
    model, 
    isSearch, 
    search, 
    searchValue, 
    searchedModel, 
    pushMunicipality, 
    filterByMunicipalityIds, 
    municipalitiesAll 
  } = orderListModel;
  
  const { isModalShow, setModalShow } = attachSewerModel;
  const [isOrderOpen, setOpen] = useState(false);
  const [switchMunicipalityFilter, setSwitchMunicipalityFilter] = useState(false);
  const [showAddSidebar, setAddShowSidebar] = useState(false);
  
  const { triecoCompanyId } = useAuth();

  useEffect(() => {
    if (triecoCompanyId) {
      init(triecoCompanyId);
    }
  }, [init, triecoCompanyId]);

  return (
    <div className="max-w-7xl mx-auto px-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Управление заявками</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Панель управления */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button
              onClick={() => setAddShowSidebar(!showAddSidebar)}
              class="px-4 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors shadow-sm hover:shadow-md"
            >
              Создать заявку
            </Button>

            <Input 
              placeholder="Поиск по ФИО или адресу..." 
              id="ordersSearch" 
              value={searchValue} 
              onChange={search} 
              class="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
              icon="search"
            />
          </div>

          {/* Фильтр по району */}
          <div className="relative">
            <button
              onClick={() => setSwitchMunicipalityFilter(!switchMunicipalityFilter)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Фильтр по району
              <Icon 
                systemName="arrow-down" 
                className={`w-4 h-4 transition-transform ${switchMunicipalityFilter ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {switchMunicipalityFilter && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                <div className="p-3">
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                    {municipalitiesAll.map((municipality) => (
                      <label key={municipality.id} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="municipalityFilter" 
                          onChange={(e) => pushMunicipality(Number(e.target.value), e.target.checked)} 
                          checked={filterByMunicipalityIds.includes(municipality.id)} 
                          value={municipality.id} 
                          className="w-4 h-4 text-[#4A85F6] rounded border-gray-300 focus:ring-[#4A85F6]"
                        />
                        <span className="text-sm text-gray-700">{municipality.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Таблица */}
      <Table 
        pageSize={10} 
        onRowClick={(val) => { 
          orderModel.open(val); 
          setOpen(true); 
        }} 
        columns={columns} 
        data={isSearch ? searchedModel : model} 
        classNames={{
          table: "min-w-full divide-y divide-gray-200",
          thead: "bg-gray-50",
          tbody: "bg-white divide-y divide-gray-200"
        }}
      />

       {/* Модальные окна */}
      {showAddSidebar && (
        <CreateOrderModal onClose={() => setAddShowSidebar(!showAddSidebar)} />
      )}
      
      <AttachSewerModal 
        setShow={setModalShow} 
        show={isModalShow} 
        id={triecoCompanyId} 
      />
      
      <OrderModal 
        isOpen={isOrderOpen} 
        setShow={setOpen} 
      />
    </div>
  );

}
)