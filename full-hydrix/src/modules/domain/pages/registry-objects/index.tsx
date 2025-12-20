import { Icon } from '@/shared/ui/icon';
import { useSearch } from '@/shared/ui/Inputs/hooks/hook-search';
import { Search } from '@/shared/ui/Inputs/input-search';
import { observer } from 'mobx-react-lite';
import { Link, NavLink, useParams } from 'react-router-dom';
import { SwitchButton } from '@/shared/ui/switch-button';
import { FilterObjects } from './components/filter-objects';
import { useEffect } from 'react';
import { DespetcherTest } from '@/entities/despetcher-test/type';
import { registryModel } from './model/registry-model';
import { RegistryObjects } from '../registry-list';
import { MapObjects } from '../registry-map';

export const RegistryObjectsLayout = observer(() => {
  const { page } = useParams();
  const { list, init } = registryModel;

  const { search, setSearch, results } = useSearch<DespetcherTest>({
    data: list,
    searchFields: ["nameMinin", "company"]
  });


  useEffect(() => {
    init();
  }, []);


  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="flex items-center gap-4 mb-14">
        <Link

          to="/menu-moduls"
          className="flex items-center justify-center w-11 h-11  transition-colors"
        >
          <Icon systemName="home-active" className="text-white" />
        </Link>

        <div>
          <h1 className="font-bold text-gray-800 text-4xl">Единый реестр объектов</h1>
          <div className="w-28 h-1 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Панель управления */}
      <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Левая часть: поиск и фильтры */}
          <div className="flex flex-cols items-center gap-4">
            <Search
              placeholder="Поиск по названию или организации..."
              value={search}
              onChange={setSearch}
              classNames={{
                container: "!w-[420px] bg-gray-50 rounded-lg h-11",
                input: "bg-gray-50 px-4 text-gray-800",
              }}
            />

            <FilterObjects />

            {/* Переключатели с метками */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">

                <SwitchButton
                  label=""
                  onChange={() => { console.log() }}
                  classNames={{
                    container: "ml-7 gap-3",
                    button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                    circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                  }}
                />
                <span className="text-sm text-gray-700 font-medium">Диспетчерская</span>
                <SwitchButton
                  label=""
                  onChange={() => { console.log() }}
                  classNames={{
                    container: "ml-7 gap-3",
                    button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                    circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                  }}
                />
                <span className="text-sm text-gray-700 font-medium">Управление ЖБО</span>
              </div>
            </div>
          </div>

          {/* Правая часть: переключение вида */}
          <NavLink to={page == "list" ? "/domain/map" : "/domain/list"}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
          >
            {page == "list" ? (
              <>
                <Icon systemName="map" className="text-gray-600" />
                <span>Объекты на карте</span>
              </>

            ) : (
              <>
                <Icon systemName="list" className="text-gray-600" />
                <span>Объекты в виде списка</span>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 min-h-0">
        {page == "list" ? <RegistryObjects list={results.length > 0 ? results : []} /> : <MapObjects />}
      </div>
    </div>
  );
});