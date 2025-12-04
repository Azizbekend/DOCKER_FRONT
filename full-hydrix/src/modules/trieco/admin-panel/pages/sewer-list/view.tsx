import { Button } from "@/app/cores/core-trieco/UIKit/button";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { Input } from "@/app/cores/core-trieco/UIKit/input";
import { useEffect, useRef, useState } from "react";
import { CreateSewerModal } from "./component/create-sewer-modal";
import { AccidentReportModal } from "./component/accident-report-modal";
import { ExtendedColumnDef, Table } from "@/app/cores/core-trieco/UIKit/table";
import sewerListModel from "./models/sewer-list-model";
import { observer } from "mobx-react-lite";
import { SewerMapModal } from "./component/sewer-map-modal";
import { SewerInfoModal } from "./component/sewer-info-modal";
import { getTank } from "./utils/getTank";
import { DeleteModal } from "./component/delete-modal";
import createSewerModel from "./models/create-sewer-model";
import { ChangeSewerCompany } from "./component/change-sewerCompany-modal";

export const SewerListView = observer(() => {
    const { init, model, isSearch, searchValue, search, searchedModel, pushTank, tanks } = sewerListModel;
    const { deleteSewer } = createSewerModel;

    useEffect(() => {
        init();
    }, []);

    const [show, setShow] = useState(false);
    const [accidentShow, setAccidentShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteRow, setSelectedDeleteRow] = useState<any | null>(null);

    const [showChangeModal, setShowChangeModal] = useState(false);

    const [switchTankFilter, setSwitchTankFilter] = useState(false);
    const addsidebarRef = useRef(null);
    const [showAddSidebar, setAddShowSidebar] = useState(false);

    const toggleAddSidebar = () => {
        setAddShowSidebar(!showAddSidebar);
    };

    const handleDeleteClick = (row: any, event: React.MouseEvent) => {
        const mouseEvent = event as React.MouseEvent<HTMLDivElement, MouseEvent>;
        mouseEvent.stopPropagation();
        setSelectedDeleteRow(row.id);
        setShowDeleteModal(true);
    };

    const handleChangeClick = (row: any, event: React.MouseEvent) => {
        const mouseEvent = event as React.MouseEvent<HTMLDivElement, MouseEvent>;
        mouseEvent.stopPropagation();
        setSelectedRow(row);
        setShowChangeModal(true);
    };

    const handleRowClick = (row: any, event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedRow(row);
        setShowInfo(true);
    };

    const handleDeleteConfirm = (row: any) => {

        deleteSewer(row);
        init();
        setShowDeleteModal(false);
        setSelectedDeleteRow(null);
    };

    const handleChangeConfirm = (row: any) => {
        init();
        setShowDeleteModal(false);
        setSelectedDeleteRow(null);
    };

    const columns: ExtendedColumnDef<any, any>[] = [
        {
            header: "ФИО Водителя",
            accessorKey: "name",
            cell: ({ row }) => (
                <span className="text-[12px] text-[#222B45] font-semibold">
                    {row.original["lastName"]} {row.original["firstName"]} {row.original["patronymic"]}
                </span>
            ),
        },
        {
            header: "Наименование организации",
            accessorKey: "companyName",
            cell: (info) => <span className="text-[12px] ml-5">{info.getValue()}</span>,
        },
        {
            header: "Марка",
            accessorKey: "sewerCarModel",
            size: 80,
            cell: (info) => <span className="text-[12px]">{info.getValue()}</span>,
        },
        {
            header: "Объём",
            accessorKey: "tankVolume",
            size: 70,
            cell: (info) => (
                <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">
                    {info.getValue()} м³
                </div>
            ),
        },
        {
            header: "",
            accessorKey: "action",
            cell: ({ row }) => (
                <div className="flex items-center gap-[10px]">
                    <Button class="bg-[#ECF3FF] py-2 px-[15px] !text-[12px] !text-[#4080FB] !w-max" onClick={(event) => handleChangeClick(row.original, event)}>
                        Изменить организацию
                    </Button>
                    <Icon
                        width={32}
                        height={32}
                        systemName="delete-grey"
                        className="cursor-pointer"
                        onClick={(event) => handleDeleteClick(row.original, event)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            {showInfo && (
                <SewerInfoModal onClose={() => setShowInfo(false)} setShow={setShowInfo} show={showInfo} sewer={selectedRow} />
            )}
            <SewerMapModal />
            {showAddSidebar && (
                <div ref={addsidebarRef} className="z-50">
                    <CreateSewerModal setShow={setShow} show={show} onClose={toggleAddSidebar} />
                </div>
            )}
            <AccidentReportModal setShow={setAccidentShow} show={accidentShow} />
            {showDeleteModal && (
                <DeleteModal
                    sewer={selectedDeleteRow}
                    onClose={() => setShowDeleteModal(false)}
                    onClickDelete={handleDeleteConfirm}
                />
            )}
            {showChangeModal && (
                <ChangeSewerCompany
                    sewer={selectedRow}
                    onClose={() => setShowChangeModal(false)}
                    onClickChange={handleChangeConfirm}
                />
            )}
            <div className="mt-12 ">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col w-[70%] gap-6">
                        <span className="text-[34px] font-semibold">Список ассенизаторов</span>
                        <div className="flex flex-row gap-8 items-center">
                            <Button children="Создать" class="bg-[#4A85F6] p-5" onClick={toggleAddSidebar} />
                            <div className="flex flex-row gap-8 items-center">
                                <Input
                                    placeholder="Поиск..."
                                    id={"sewerNumberPlate"}
                                    value={searchValue}
                                    onChange={search}
                                    class="border-[#EFF4FA]"
                                    icon="search"
                                />
                                <div className="relative">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setSwitchTankFilter(!switchTankFilter)}
                                    >
                                        Фильтр по объёму{" "}
                                        <Icon
                                            systemName="arrow-down"
                                            className={`ml-1 ${switchTankFilter && "rotate-180"}`}
                                        />
                                    </div>
                                    <div
                                        className={`flex flex-col absolute botton-0 right-0 px-[14px] py-[12px] bg-stone-50 rounded-lg shadow-md z-10 ${!switchTankFilter && "hidden"
                                            }`}
                                    >
                                        <div className="flex flex-col gap-1 cursot-pointer">
                                            {getTank.map((tank) => (
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="tankValue"
                                                        onChange={(e) =>
                                                            pushTank(Number(e.target.value), e.target.checked)
                                                        }
                                                        checked={tanks.includes(tank)}
                                                        value={tank}
                                                    />
                                                    <span>{tank} м³</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Table
                    onRowClick={handleRowClick}
                    pageSize={10}
                    columns={columns}
                    data={isSearch ? searchedModel : model}
                />
            </div>
        </>
    );
});
