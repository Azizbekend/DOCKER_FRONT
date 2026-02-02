import { useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/modules/domain/features/hardware/model";
import Loader from "@/packages/shared-ui/loader/loader";
import { Icon } from "@/packages/shared-ui/icon";
import { Button } from "@/packages/shared-ui/button/button";
import { hardwareListModel } from "../hardware-list/model/hardware-list-model";
import { ModalServiceCreate } from "../../../../packages/shared/libs/hardware/components/modal-service-create";
import { tabsList } from "@/modules/domain/features/hardware/data";
import { HardwareControll, HardwarePassport, HardwareService } from "@/packages/shared/libs/hardware/tabs/page-tabs";
import { getTimeRanges } from "@/packages/functions/get-data/get-time-ranges";
import { HardwareEvents } from "@/packages/shared/libs/hardware/tabs/page-tabs/events";
// import { HardwareLogs } from "@/packages/shared/libs/hardware/tabs/page-tabs/logs";
import { isAdmin } from "@/packages/entities/user/utils";

export const HardwareAbout = observer(() => {
    const { id, tab } = useParams();
    const { setModalService, modalService, closeModal } = hardwareListModel;

    const { status, model, init, isLoading, commands, switchIsCommand, changeCommands,
        incidentList, isLoaderCommand, isActiveCommand, getInfoNodeInfoAll, documents,
        сharacteristic, commandsInfo, getCommands, servicesWeek, checkedService, servicesHistory,
        serviceStatistic } = hardwareModel
    const navigate = useNavigate();

    useEffect(() => {
        const { weekRange } = getTimeRanges()
        init(Number(id), weekRange)
    }, [])

    return isLoading ?
        <Loader />
        :
        <div className="informations-dispatch__requestregistry relative mt-10" >
            <ModalServiceCreate isOpen={modalService} setShow={closeModal} />

            <div className="absolute  top-[-36px] left-[30px] flex gap-3">
                {tabsList.map((tab, key) => {
                    return <NavLink to={`/dispatcher/hardware-about/${id}/${tab.to}`} key={key}
                        className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
                    >
                        {tab.name}
                    </NavLink>
                })}
            </div>

            <div className="space-y-6 min-h-[60vh] mb-10">
                {/* Шапка */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between h-[100px] gap-4 z-2 rounded-2xl bg-white shadow-sm p-6">
                    <div className="flex items-center gap-4">
                        <Link to="/dispatcher/hardware"
                            className="flex items-center justify-center w-10 h-10 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
                        >
                            <Icon systemName="arrow-left" className="text-white" />
                        </Link>
                        <div className="relative">
                            <h1 className="text-xl md:text-2xl font-bold">
                                {window.location.pathname.includes("passport") && "Паспорт"}
                                {window.location.pathname.includes("controll") && "Управление"}
                                {window.location.pathname.includes("service") && "Сервис"}
                                {window.location.pathname.includes("events") && "Журнал событий"}
                                {window.location.pathname.includes("logs") && "Журнал логов"}
                            </h1>
                            <p className="w-max text-sm">{model.name || '—'}</p>
                        </div>
                    </div>
                    {/* Top Action Buttons */}
                    <div className="flex gap-3 z-10">
                        {/* <Link to="/dispatcher/orders/create/form"
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#4A85F6] text-white rounded-lg font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
                        >
                            <Icon systemName="file-plus" />
                            Создать заявку
                        </Link> */}


                        {isAdmin() &&
                            <Button
                                styleColor={"blue"}
                                class="px-4 gap-3 py-2"
                                onClick={() => setModalService(true, model.id)}
                            >
                                <Icon systemName="file-plus" />

                                сервис
                            </Button>
                        }

                        {isAdmin() &&
                            <Button
                                class="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                onClick={() => navigate(`/dispatcher/hardware/form/${model.id}`)}
                            >
                                <Icon systemName="edit-white" width={20} height={20} />
                            </Button>
                        }
                    </div>
                </div>

                {tab == "passport" && <HardwarePassport
                    model={model}
                    getInfoNodeInfoAll={getInfoNodeInfoAll}
                    documents={documents}
                    сharacteristic={сharacteristic}
                    commandsInfo={commandsInfo}
                    incidentList={incidentList}
                    status={status}
                />}

                {/* {tab == "controll" && <HardwareControll
                    commands={commands}
                    switchIsCommand={switchIsCommand}
                    changeCommands={changeCommands}
                    isLoaderCommand={isLoaderCommand}
                    isActiveCommand={isActiveCommand}
                    evengLog={evengLog}
                />} */}

                {tab == "service" && <HardwareService
                    getCommands={getCommands}
                    servicesWeek={servicesWeek}
                    checkedService={checkedService}
                    servicesHistory={servicesHistory}
                    serviceStatistic={serviceStatistic}
                />}

                {tab == "events" && <HardwareEvents hardwareId={model.id} />}

                {/* {tab == "logs" && <HardwareLogs />} */}

            </div>
        </div>

})