import { TableColumn } from "@/shared/ui/table/setting/types";
import { StatusClass, StatusText } from "./type/type";
import { Table } from "@/shared/ui/table/index";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@/shared/ui/Inputs/input-search";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { Button } from "@/shared/ui/button";
import { ButtonCheckList } from "@/shared/ui/button-check-list";
import { Icon } from "@/shared/ui/icon";
import { hardwareListModel } from "./model/hardware-list-model";
import { HardwareInterface } from "@/entities/hardware/type";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ModalServiceCreate } from "./components/modal-service-create";


const columns: TableColumn<HardwareInterface>[] = [
    {
        header: "Наименование",
        key: 'companyName',
        cell: ({ name }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold  text-center w-full">{name}</span>
            )
        },
    },
    {
        header: "Расположение",
        key: 'companyName',
        cell: ({ position }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold  text-center w-full">{position}</span>
            )
        },
    },
    {
        header: "Марка",
        key: 'companyName',
        cell: ({ opcDescription }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold  text-center w-full">{opcDescription}</span>
            )
        },
    },
    {
        header: "Изготовитель",
        key: 'companyName',
        cell: ({ developerName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold  text-center w-full">{developerName}</span>
            )
        },
    },
    {
        header: "Поставщик",
        key: 'companyName',
        cell: ({ supplierName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold text-center w-full">{supplierName}</span>
            )
        },
    },
    {
        header: "Статус",
        key: 'companyName',
        width: '0.5fr',
        cell: () => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold w-full">
                    <div className="table__column" >
                        <span className={`table-equipmentregistry__column-status ${StatusClass(1)}`} >
                            {StatusText(1)}
                        </span>
                    </div>
                </span>
            )
        },
    },
    {
        header: " ",
        key: '',
        width: '0.5fr',
        cell: ({ id, isActive }) => {
            return isActive == null && (
                <div className="table__column" >
                    <Button class="px-3 py-2 text-white hover:opacity-50 bg-[var(--clr-accent)]" onClick={() => hardwareListModel.active(id)}>Активировать</Button>
                </div>
            )
        },
    },
    {
        header: " ",
        key: '',
        width: '0.2fr',
        cell: ({ id }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold w-full">
                    <div className="table__column" >
                        <Button onClick={() => hardwareListModel.setModalService(true, id)}>
                            <Icon systemName="edit" />
                        </Button>
                    </div>
                </span>
            )
        },
    },
    // {
    //     header: " ",
    //     key: '',
    //     width: '0.2fr',
    //     cell: ({ id }) => {
    //         return (
    //             <span className="text-[14px] text-[#222B45] font-semibold w-full">
    //                 <div className="table__column" >
    //                     <Link to={"id"} >
    //                         <Icon systemName="edit" />
    //                     </Link>
    //                 </div>
    //             </span>
    //         )
    //     },
    // },
]

export const EquipmentRegistry = observer(() => {

    const { list, init, modalService, closeModal } = hardwareListModel

    useEffect(() => {
        init()
    }, [])

    const getStatus = (status: number) => {
        switch (status) {
            case 1:
                return <div className="table__column">
                    <span className="table-equipmentregistry__column-status _green">
                        В работе
                    </span>
                </div>;
            case 2:
                return <div className="table__column">
                    <span className="table-equipmentregistry__column-status _gray">
                        В ожидании
                    </span>
                </div>;
            case 3:
                return <div className="table__column">
                    <span className="table-equipmentregistry__column-status _red">
                        Авария
                    </span>
                </div>;
        }
    }

    const navigate = useNavigate();
    const { search, setSearch, results } = useSearch<HardwareInterface>({ data: list, searchFields: ['name', 'opcDescription'] });

    return (
        <>

            <ModalServiceCreate isOpen={modalService} setShow={closeModal} />

            <div className="table__top flex items-center gap-5 mb-5">
                <Link to="/dispatcher/equipment/create" className="rounded-lg flex items-center gap-1 duration-300 text-white bg-[var(--clr-accent)] pl-3 px-4 py-2 hover:opacity-50">
                    <Icon systemName="plus-white" />
                    <span>Добавить оборудование</span>
                </Link>
                <Search value={search} onChange={setSearch} placeholder="Поиск..."
                    classNames={{
                        container: "max-w-[450px] py-2 rounded-lg"
                    }}
                />

                <ButtonCheckList
                    name="Фильтр по доступу"
                    classNames={{
                        button: "w-max"
                    }}
                    children={
                        ["Все", "Онлайн", "Оффлайн"].map((value, key) => (
                            <label key={key} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="tankValue"
                                    onChange={(e) => console.log("asd")}
                                    // checked={tanks.includes(value)}
                                    value={value}
                                />
                                <span>{value}</span>
                            </label>
                        ))
                    }
                />
                <ButtonCheckList
                    name="Фильтр по работе"
                    classNames={{
                        button: "w-max"
                    }}
                    children={
                        ["Функционирует", "Авария", "Плановое обслуживание"].map((value, key) => (
                            <label key={key} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="tankValue"
                                    onChange={(e) => console.log("asd")}
                                    // checked={tanks.includes(value)}
                                    value={value}
                                />
                                <span>{value}</span>
                            </label>
                        ))
                    }
                />

                <Button class="table__export export-button ml-auto">Экспортировать</Button>
            </div>


            <Table
                columns={columns}
                data={results.length > 0 ? results : []}
                onRowClick={(row) => navigate(`/dispatcher/equipment-about/passport/${row.id}`)}
            />
        </>
    )
})