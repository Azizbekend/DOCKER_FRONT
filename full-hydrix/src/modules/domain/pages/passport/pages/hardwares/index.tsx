import { Table } from "@/packages/shared-ui/table/index";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@/packages/shared-ui/Inputs/input-search";
import { useSearch } from "@/packages/shared-ui/Inputs/hooks/hook-search";
import { ButtonCheckList } from "@/packages/shared-ui/button-check-list";
import { Icon } from "@/packages/shared-ui/icon";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { PassportHeaderPanel } from "../../components/header-panel";
import { hardwareListModel } from "@/modules/dispatcher/pages/hardware-list/model/hardware-list-model";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { domainHardwariesColumns } from "@/packages/shared/libs/hardware/columns/columns";
import { getObjectId } from "@/packages/functions/get-data/get-object-data";
import { isAdmin } from "@/packages/entities/user/utils";

export const HardwareRegistry = observer(() => {
  const { list, init } = hardwareListModel;
  const navigate = useNavigate();
  const objectId = getObjectId()

  const { search, setSearch, results } = useSearch<HardwareInterface>({
    data: list,
    searchFields: ['name', 'position', 'opcDescription']
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <PassportHeaderPanel title="Оборудование" />

      {/* Адаптивная панель управления */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Поиск */}
        <div className="w-full sm:w-[420px]">
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Поиск..."
            classNames={{
              container: "w-full rounded-lg h-11 border-[1.5px]",
              input: "text-gray-800 px-3",
            }}
          />
        </div>

        {/* Фильтры состояния */}
        <div className="w-full sm:w-auto">
          <ButtonCheckList
            name="Состояние"
            classNames={{ button: "text-sm border-[1.5px] w-full sm:w-auto" }}
            children={["Работает", "В ожидании", "Авария"].map((value, key) => (
              <label key={key} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input type="checkbox" className="rounded text-[#4A85F6]" />
                <span className="text-sm">{value}</span>
              </label>
            ))}
          />
        </div>
        {isAdmin() &&
          <Link
            to={`/domain/passport/${objectId}/hardwares/form`}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 w-full sm:w-auto rounded-lg bg-[#4A85F6] text-white font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm whitespace-nowrap"
          >
            <Icon systemName="plus-white" className="w-4 h-4" />
            Добавить оборудование
          </Link>
        }
      </div>

      {/* Таблица */}
      <Table
        id="hardware"
        countActive
        columns={domainHardwariesColumns}
        data={results.length > 0 ? results : []}
        onRowClick={(row) => navigate(`/domain/passport/${objectId}/hardwares/${row.id}`)}
      />
    </>
  );
});
