import { Icon } from '@/packages/shared-ui/icon';
import { useSearch } from '@/packages/shared-ui/Inputs/hooks/hook-search';
import { Search } from '@/packages/shared-ui/Inputs/input-search';
import { observer } from 'mobx-react-lite';
import { Link, NavLink, useParams } from 'react-router-dom';
import { SwitchButton } from '@/packages/shared-ui/switch-button';
import { FilterObjects } from './components/filter-objects';
import { useEffect } from 'react';
import { DespetcherTest } from '@/packages/entities/despetcher-test/type';
import { registryModel } from './model/registry-model';
import { RegistryObjects } from '../registry-list';
import { MapObjects } from '../registry-map';
import { ObjectsForm } from '../objects-form';
import { useAuth } from '@/packages/entities/user/context';
import { isAdmin } from '@/packages/entities/user/utils';

export const RegistryObjectsLayout = observer(() => {

  const { user } = useAuth()

  const { page } = useParams();
  const { model, init } = registryModel;
  const { search, setSearch, results } = useSearch<DespetcherTest>({ data: model, searchFields: ["nameMinin", "company"] });

  useEffect(() => {
    init(user!.id, user.baseRoleId);
  }, []);


  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="flex items-center gap-4 mb-14">
        <Link to="/menu-moduls"
          className="flex items-center justify-center w-11 h-11  transition-colors"
        >
          <Icon systemName="home-active" className="text-white" />
        </Link>

        <div>
          <h1 className="font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl">Единый реестр объектов</h1>
          <div className="w-24 sm:w-28 h-0.5 sm:h-1 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>

      {/* Панель управления */}
      <div className="mb-6 sm:mb-8 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Левая часть: поиск и фильтры */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
            {page === "list" && (
              <div className='flex items-center gap-5'>
                <Search
                  placeholder="Поиск по названию или организации..."
                  value={search}
                  onChange={setSearch}
                  classNames={{
                    container: "border border-gray-300 rounded-lg h-11 !w-[400px]",
                    input: "px-4 text-gray-800 text-sm",
                  }}
                />
                <FilterObjects />

                <div className='flex items-center gap-2'>
                  <SwitchButton
                    label=""
                    onChange={() => { console.log() }}
                    classNames={{
                      container: "gap-3",
                      button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                      circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                    }}
                  />
                  <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Диспетчерская</span>
                </div>

                <div className='flex items-center gap-2'>
                  <SwitchButton
                    label=""
                    onChange={() => { console.log() }}
                    classNames={{
                      container: "gap-3",
                      button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                      circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                    }}
                  />
                  <span className="text-sm text-gray-700 font-medium whitespace-nowrap">Управление ЖБО</span>
                </div>
              </div>
            )}
          </div>
          {/* Правая часть: кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <NavLink
              to={page === "list" ? "/domain/map" : "/domain/list"}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors w-full sm:w-auto"
            >
              {page === "list" ? (
                <>
                  <Icon systemName="map" className="text-gray-600 w-4 h-4" />
                  <span className="text-sm sm:text-base">Объекты на карте</span>
                </>
              ) : (
                <>
                  <Icon systemName="list" className="text-gray-600 w-4 h-4" />
                  <span className="text-sm sm:text-base">Реестр объектов</span>
                </>
              )}
            </NavLink>



            {isAdmin() &&
              <NavLink to={"/domain/form-add"}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#4A85F6] hover:bg-[#3a6bc9] transition-colors shadow-sm w-full sm:w-auto"
              >
                <Icon systemName="plus-white" className="w-4 h-4" />
                <span className="text-sm sm:text-base">Создать объект</span>
              </NavLink>
            }
          </div>
        </div>

        {/* Переключатели на мобильных */}
        {page === "list" && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">

              <SwitchButton
                label=""
                onChange={() => { console.log() }}
                classNames={{
                  container: "gap-1",
                  button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                  circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                }}
              />
              <span className="text-sm text-gray-700 ">Диспетчерская</span>

              <SwitchButton
                label=""
                onChange={() => { console.log() }}
                classNames={{
                  container: "gap-1",
                  button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                  circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                }}
              />
              <span className="text-sm text-gray-700 ">Управление ЖБО</span>
            </div>
          </div>
        )}
      </div>

      {/* Основной контент */}
      <div className="flex-1 min-h-0">
        {page == "list" && <RegistryObjects list={results.length > 0 ? results : []} />}
        {page == "map" && <MapObjects />}
        {page == "form-add" && <ObjectsForm />}
      </div>
    </div>
  );
});