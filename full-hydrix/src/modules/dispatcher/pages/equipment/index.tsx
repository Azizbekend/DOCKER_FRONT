import { TableColumn } from "@/shared/ui/table/setting/types";
import { Table } from "@/shared/ui/table/index";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@/shared/ui/Inputs/input-search";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { Button } from "@/shared/ui/button";
import { ButtonCheckList } from "@/shared/ui/button-check-list";
import { Icon } from "@/shared/ui/icon";
import { hardwareListModel } from "./model/hardware-list-model";
import { HardwareInterface } from "@/entities/hardware/type";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

// Статусы с цветами и иконками
const getStatusBadge = (activatedAt: string) => {
  if (activatedAt === "0001-01-01T00:00:00") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        Не активировано
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
      Активировано
    </span>
  );
};

// Кнопка активации
const ActivateButton = ({ id }: { id: number }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      hardwareListModel.active(id);
    }}
    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4A85F6] text-white hover:bg-[#3a6bc9] transition-colors"
  >
    Активировать
  </button>
);

// Кнопка редактирования
const EditButton = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/dispatcher/equipment/form/${id}`);
      }}
      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
      title="Редактировать"
    >
      <Icon systemName="edit" className="w-4 h-4" />
    </button>
  );
};

// Кнопка экспорта
const ExportButton = () => (
  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
    <Icon systemName="download" className="" />
    Экспортировать
  </button>
);

const columns: TableColumn<HardwareInterface>[] = [
  {
    header: "Наименование",
    key: 'name',
    cell: ({ name }) => (
      <span className="text-sm text-gray-800 font-medium line-clamp-2 h-10 overflow-hidden">{name}</span>
    ),
  },
  {
    header: "Расположение",
    key: 'position',
    cell: ({ position }) => (
      <span className="text-sm text-gray-800">{position}</span>
    ),
  },
  {
    header: "Модель",
    key: 'model',
    cell: ({ model }) => (
      <span className="text-sm text-gray-800">{model}</span>
    ),
  },
  {
    header: "Изготовитель",
    key: 'developerName',
    cell: ({ developerName }) => (
      <span className="text-sm text-gray-800">{developerName}</span>
    ),
  },
  {
    header: "Поставщик",
    key: 'supplierName',
    cell: ({ supplierName }) => (
      <span className="text-sm text-gray-800">{supplierName}</span>
    ),
  },
  {
    header: "Статус",
    key: 'activatedAt',
    width: '180px',
    cell: ({ id, activatedAt }) => (
      <div className="flex items-center justify-center">
        {activatedAt === "0001-01-01T00:00:00"
          ? <ActivateButton id={id} />
          : getStatusBadge(activatedAt)}
      </div>
    ),
  },
  {
    header: "",
    key: 'actions',
    width: '80px',
    cell: ({ id }) => <EditButton id={id} />,
  },
];

export const EquipmentRegistry = observer(() => {
  const { list, init } = hardwareListModel;
  const navigate = useNavigate();
  const { search, setSearch, results } = useSearch<HardwareInterface>({
    data: list,
    searchFields: ['name', 'opcDescription']
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {/* Панель управления */}
      <div className="flex items-center gap-4 mb-8 p-2 bg-white rounded-xl shadow-sm border border-gray-200">
        <Link
          to="/dispatcher/equipment/form"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A85F6] text-white font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
        >
          <Icon systemName="plus-white" className="w-4 h-4" />
          Добавить оборудование
        </Link>

        <Search
          value={search}
          onChange={setSearch}
          placeholder="Поиск по названию или описанию..."
          classNames={{
            container: "!w-[420px] bg-gray-50 rounded-lg h-11",
            input: "bg-gray-50 px-4 text-gray-800",
          }}
        />

        <ButtonCheckList
          name="Доступ"
          classNames={{ button: "text-sm" }}
          children={["Все", "Онлайн", "Оффлайн"].map((value, key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input type="checkbox" className="rounded text-[#4A85F6]" />
              <span className="text-sm">{value}</span>
            </label>
          ))}
        />

        <ButtonCheckList
          name="Состояние"
          classNames={{ button: "text-sm" }}
          children={["Функционирует", "Авария", "Плановое обслуживание"].map((value, key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input type="checkbox" className="rounded text-[#4A85F6]" />
              <span className="text-sm">{value}</span>
            </label>
          ))}
        />

        <ExportButton />
      </div>

      {/* Таблица */}
      <Table
        countActive
        columns={columns}
        data={results.length > 0 ? results : []}
        onRowClick={(row) => navigate(`/dispatcher/equipment-about/passport/${row.id}`)}
      />
    </>
  );
});