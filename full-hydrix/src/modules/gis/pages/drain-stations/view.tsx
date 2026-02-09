import { observer } from "mobx-react-lite";
import { plantsListModel } from "./model/drain-stations-model";
import { useEffect } from "react";
import { Button } from "@/packages/shared-ui/button/button";
import { Search } from "@/packages/shared-ui/Inputs/input-search";
import { NoStations } from "./components/no-stations";
import { StationModal } from "./components/station-modal";
import { Station } from "./components/drain-stations";
import { ModalDelete } from "@/packages/shared-ui/modal/modal-delete";
import { useSearch } from "@/packages/shared-ui/Inputs/hooks/hook-search";
import { Plant } from "@/packages/entities/plants/types";
import { Contact } from "./components/contact-information";
import { useAuth } from "@/packages/entities/user/context";

export const StationsListView = observer(() => {
  const { 
    init, 
    list, 
    setTypeModal, 
    setShowPlantDelete, 
    showPlantDelete, 
    deletePlant, 
    showModalInfo, 
    setShowModalInfo 
  } = plantsListModel;
  
  const { search, setSearch, results } = useSearch<Plant>({ 
    data: list, 
    searchFields: ['companyName', 'adress'] 
  });
  
  const { waterCompany } = useAuth();

  useEffect(() => { 
    if (waterCompany) {
      init(waterCompany.id);
    }
  }, [waterCompany]);

  const changeAdd = () => {
    setShowModalInfo(true);
    setTypeModal("add");
  };

  return (
    <div className="mx-auto px-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Сливные станции</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Левая панель: Станции */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Панель управления */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Button
              onClick={changeAdd}
              class="px-4 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors shadow-sm hover:shadow-md"
            >
              Добавить станцию
            </Button>

            <Search 
              placeholder="Поиск по названию или адресу..." 
              value={search} 
              onChange={setSearch} 
              classNames={{
                container: "w-full sm:w-80 rounded-lg h-11 border border-gray-300 focus:border-[#4A85F6]",
                input: "px-4 text-gray-800"
              }} 
            />
          </div>

          {/* Список станций */}
          {results.length === 0 ? (
            <NoStations />
          ) : (
            <div className="space-y-4">
              {results.map((plant, index) => (
                <div key={plant.id}>
                  <Station
                    title={`Сливная станция ${index + 1}`}
                    plant={plant}
                  />
                  {index < results.length - 1 && (
                    <div className="w-full h-px bg-gray-200 my-4"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Правая панель: Контакты */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Контактные данные ответственных лиц
          </h2>
          
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Нет данных для отображения
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((plant, index) => (
                <div key={`contact-${plant.id}`}>
                  <Contact
                    title={plant.name}
                    firstName={plant.firstName}
                    secondName={plant.lastName}
                    email={plant.email}
                    phoneNumber={plant.phone}
                  />
                  {index < results.length - 1 && (
                    <div className="w-full h-px bg-gray-200 my-4"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальные окна */}
      <StationModal />
      <ModalDelete
        show={showPlantDelete}
        setShow={setShowPlantDelete}
        wrapperId="order-delete"
        text="Вы действительно хотите удалить эту запись?"
        onClickDelete={deletePlant}
      />
    </div>
  );
});
