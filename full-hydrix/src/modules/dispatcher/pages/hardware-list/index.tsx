import { Table } from "@/packages/shared-ui/table/index";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@/packages/shared-ui/Inputs/input-search";
import { useSearch } from "@/packages/shared-ui/Inputs/hooks/hook-search";
import { ButtonCheckList } from "@/packages/shared-ui/button-check-list";
import { Icon } from "@/packages/shared-ui/icon";
import { hardwareListModel } from "./model/hardware-list-model";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ExportButton } from "../../../../packages/shared/libs/hardware/components/hardware-buttons";
import { columns } from "../../../../packages/shared/libs/hardware/columns/columns";
import { HardwareInterface } from "@/packages/entities/hardware/type";
import { isAdmin } from "@/packages/entities/user/utils";


export const HardwareRegistry = observer(() => {

  const { list, init } = hardwareListModel;
  const navigate = useNavigate();
  const { search, setSearch, results } = useSearch<HardwareInterface>({ data: list, searchFields: ['name', 'position', 'opcDescription'] });

  useEffect(() => {
    init();
  }, []);

  return (

    <div>

      {/* Основной контент */}
      <div className="">

        <div className="flex items-center gap-5 mb-8">

          <Search
            value={search}
            onChange={setSearch}
            placeholder="Поиск по названию или описанию..."
            classNames={{
              container: "!w-[420px] h-11 border",
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

          {isAdmin() &&
            <>
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
            </>
          }
        </div>

        <Table
          id="hardware"
          countActive
          classNames={{
            wrapper: "!shadow-none",
            body: "!h-[60vh]"
          }}
          columns={columns}
          data={results.length > 0 ? results : []}
          onRowClick={(row) => navigate(`/dispatcher/hardware-about/${row.id}/passport/`)}
        />
      </div>

    </div >


  );
});