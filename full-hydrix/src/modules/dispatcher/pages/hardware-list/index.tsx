import { Table } from "@/shared/ui/table/index";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@/shared/ui/Inputs/input-search";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { ButtonCheckList } from "@/shared/ui/button-check-list";
import { Icon } from "@/shared/ui/icon";
import { hardwareListModel } from "./model/hardware-list-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExportButton } from "../../../../shared/libs/hardware/components/hardware-buttons";
import { columns } from "../../../../shared/libs/hardware/columns/columns";
import { HardwareInterface } from "@/entities/hardware/type";


export const HardwareRegistry = observer(() => {
  const { list, init } = hardwareListModel;
  const navigate = useNavigate();
  const { search, setSearch, results } = useSearch<HardwareInterface>({ data: list, searchFields: ['name', 'position', 'opcDescription'] });

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 mb-8 rounded-xl ">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Поиск по названию или описанию..."
          classNames={{
            container: "!w-[420px] rounded-lg h-11",
            input: "px-4 text-gray-800",
          }}
        />

        <ButtonCheckList
          name="Состояние"
          classNames={{ button: "text-sm" }}
          children={["Функционирует", "Авария", "Плановое обслуживание"].map((value, key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:rounded cursor-pointer">
              <input type="checkbox" className="rounded text-[#4A85F6]" />
              <span className="text-sm">{value}</span>
            </label>
          ))}
        />

        {/* <ExportButton className="ml-auto" /> */}

        <Link
          to="/dispatcher/hardware/form"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A85F6] text-white font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm ml-auto"
        >
          <Icon systemName="plus-white" className="w-4 h-4" />
          Добавить оборудование
        </Link>
        <Link
          to="/dispatcher/sensor/form"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A85F6] text-white font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
        >
          <Icon systemName="plus-white" className="w-4 h-4" />
          Добавить датчик
        </Link>
      </div>

      <Table
        id="hardware"
        countActive
        classNames={{
          body: "!h-[60vh]"
        }}
        columns={columns}
        data={results.length > 0 ? results : []}
        onRowClick={(row) => navigate(`/dispatcher/hardware-about/${row.id}/passport/`)}
      />
    </>
  );
});