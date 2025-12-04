import { observer } from "mobx-react-lite";
import { plantsListModel } from "./model/drain-stations-model";
import { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Search } from "@/shared/ui/Inputs/input-search";
import { NoStations } from "./components/no-stations";
import { StationModal } from "./components/station-modal";
import { Station } from "./components/drain-stations";
import { ModalDelete } from "@/shared/ui/modal/modal-delete";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { Plant } from "@/entities/plants/types";
import { Contact } from "./components/contact-information";
import { useAuth } from "@/entities/user/context";


export const StationsListView = observer(() => {
    const { init, list, setTypeModal, setShowPlantDelete, showPlantDelete, deletePlant, showModalInfo, setShowModalInfo } = plantsListModel;
    const { search, setSearch, results } = useSearch<Plant>({ data: list, searchFields: ['companyName', 'adress'] })
    const { waterCompany } = useAuth();

    useEffect(() => { waterCompany && init(waterCompany?.id) }, []);

    const changeAdd = () => {
        setShowModalInfo(true)
        setTypeModal("add")
    }

    return (
        <>
            <StationModal />

            <ModalDelete
                show={showPlantDelete}
                setShow={setShowPlantDelete}
                wrapperId="order-delete"
                text="Вы действительно хотите удалить эту запись?"
                onClickDelete={deletePlant}
            />


            <div className="mt-8 flex flex-row mx-9 gap-10 h-full mb-5">
                <div className="border-1 bg-white shadow rounded-md py-[36px] px-[29px] mb-[40px] w-[680px]">
                    <h1 className="mb-[18px] text-[34px] font-semibold leading-normal text-[#222b45]">
                        Сливные станции
                    </h1>
                    <div className="flex items-center justify-start gap-[23px] mb-[38px]">
                        <Button
                            onClick={changeAdd}
                            class="px-[20px] py-[9px] bg-[#4a85f6] text-white hover:opacity-50"
                            children="Добавить"
                        />

                        <Search placeholder="Поиск..." value={search} onChange={setSearch} classNames={{
                            container: "max-w-[60%] rounded-lg h-[38px] focus:border-[#D6D6D6]",
                        }} />

                    </div>

                    {results.length === 0 && <NoStations />}
                    {results.map((plant, key) =>
                        <>
                            <Station
                                key={key}
                                title={`Сливная станция ${key + 1}`}
                                plant={plant}
                            />

                            {key < list.length - 1 && (
                                <div className="w-[100%] border-b-[1px] border-solid border-[#D6D6D6] mt-[32px] mb-[18px]"></div>
                            )}
                        </>
                    )}
                </div>

                <div className=" px-[21px] py-[24px] bg-white shadow border-1 rounded-md sticky h-fit top-3 left-1">
                    <h1 className="text-[17px] font-bold leading-normal mb-[14px] mr-60">
                        Контактные данные ответственных лиц
                    </h1>
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
                                <div className="w-[100%] border-b-[1px] border-solid border-[#D6D6D6] mb-[14px]"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});
