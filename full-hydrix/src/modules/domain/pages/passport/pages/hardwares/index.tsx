import { Table } from "@/packages/shared-ui/table/index";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@/packages/shared-ui/Inputs/input-search";
import { useSearch } from "@/packages/shared-ui/Inputs/hooks/hook-search";
import { ButtonCheckList } from "@/packages/shared-ui/button-check-list";
import { Icon } from "@/packages/shared-ui/icon";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PassportHeaderPanel } from "../../components/header-panel";
import { hardwareListModel } from "@/modules/dispatcher/pages/hardware-list/model/hardware-list-model";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { domainHardwariesColumns } from "@/packages/shared/libs/hardware/columns/columns";

export const HardwareRegistry = observer(() => {

  const { list, init } = hardwareListModel;
  const navigate = useNavigate();

  const { search, setSearch, results } = useSearch<HardwareInterface>({ data: list, searchFields: ['name', 'position', 'opcDescription'] });

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <PassportHeaderPanel title="Оборудования" />

      <div className="flex items-center gap-4 mb-8 px-2 py-3 bg-white rounded-xl shadow-sm border border-gray-200">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Поиск..."
          classNames={{
            container: "!w-[420px] rounded-lg h-11 border-[1.5px]",
            input: "text-gray-800",
          }}
        />

        <ButtonCheckList
          name="Состояние"
          classNames={{ button: "text-sm border-[1.5px]" }}
          children={["Работает", "В ожидании", "Авария"].map((value, key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input type="checkbox" className="rounded text-[#4A85F6]" />
              <span className="text-sm">{value}</span>
            </label>
          ))}
        />

        {/* <ExportButton className="ml-auto" /> */}

        <Link to="/dispatcher/equipment/form"
          className="flex items-center gap-2 px-4 py-2.5 ml-auto rounded-lg bg-[#4A85F6] text-white font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
        >
          <Icon systemName="plus-white" className="w-4 h-4" />
          Добавить оборудование
        </Link>
      </div>

      <Table
        id="hardware"
        countActive
        columns={domainHardwariesColumns}
        data={results.length > 0 ? results : []}
        onRowClick={(row) => navigate(`/domain/passport/hardwares/${row.id}`)}
      />
    </>
  );
});