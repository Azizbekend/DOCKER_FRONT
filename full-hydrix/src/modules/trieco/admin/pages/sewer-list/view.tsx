import { useEffect, useRef, useState } from "react"
import { CreateSewerModal } from "./component/create-sewer-modal"
import { AccidentReportModal } from "./component/accident-report-modal"
import sewerListModel from "./models/sewer-list-model"
import adminModel from "../../kernel/model/admin-model"
import { observer } from "mobx-react-lite"
import sewerMapModel from "./models/sewer-map-model"
import { SewerMapModal } from "./component/sewer-map-modal"
import { SewerInfoModal } from "./component/sewer-info-modal"
import { getTank } from "./utils/getTank"
import { Link, useLocation, useParams } from "react-router-dom"
import { ExtendedColumnDef, Table } from "@/app/cores/core-trieco/UIKit/table"
import { Button } from "@/shared/ui/button"
import { Icon } from "@/shared/ui/icon"
import { Input } from "@/shared/ui/GIS"

const columns: ExtendedColumnDef<any, any>[] = [
    {
        header: "ФИО Водителя",
        accessorKey: 'name',
        cell: ({ row }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{row.original['lastName']} {row.original['firstName']} {row.original['patronymic']}</span>)
        },
    },
    {
        header: "Наименование организации",
        accessorKey: 'companyName',
        size: 280,
        cell: info => {
            return (
                <span className="text-[14px] ml-10">{info.getValue()}</span>
            )
        },
    },
    {
        header: 'Марка',
        accessorKey: 'sewerCarModel',
        size: 100,
        cell: info => {
            return (
                <span className="text-[12px]">{info.getValue()}</span>
            )
        },
    },
    {
        header: 'Объём',
        accessorKey: 'tankVolume',
        cell: info => {
            return (
                <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">{info.getValue()} м³</div>
            )
        }
    },
    {
        header: 'Номер автомобиля',
        accessorKey: 'sewerNumberPlate',
        cell: info => {
            return (
                <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">{info.getValue()}</div>
            )
        }
    },
    {
        header: 'Рейтинг',
        accessorKey: 'rating',
        cell: info => {
            return (
                <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">{info.getValue()}</div>
            )
        }
    },
    // {
    //     header: 'Статус',
    //     accessorKey: 'status',
    //     size: 250,
    //     cell: () => {

    //         return (
    //             <div className="w-full py-2 font-semibold text-[13px] text-white text-center bg-[#22BA31] rounded-lg">
    //                 <span>Онлайн</span>
    //             </div>
    //         )
    //     },
    // },
    {
        header: '',
        accessorKey: 'edit',
        size: 80,
        cell: ({ row }) => {
            return (
                <Icon width={32} onClick={(e) => { e.stopPropagation(); sewerMapModel.openModal(adminModel.user?.id || 0, Number(row.original["id"])); }} height={32} systemName="location" className="cursor-pointer" />
            )
        },
    },
    {
        header: '',
        accessorKey: 'id',
        size: 50,
        cell: info => {
            return (info.getValue() === 45 ?
                <>
                    <Button class="text-[16px] !text-[#4A85F6] font-semibold w-full text-center" onClick={() => { e.stopPropagation(); window.location.href = "https://cloud.digicity.io/" }} >Сайт</Button>
                </>
                :
                <></>
            )
        }
    },
]


export const SewerListView = observer(() => {

    const { init, model, isSearch, searchValue, search, searchedModel, pushTank, tanks } = sewerListModel;

    const location = useLocation();

    useEffect(() => {


        // =================
        // Вернуть инициализацию и убрать url-ки
        // =================

        const searchParams = new URLSearchParams(location.search);
        const userId = searchParams.get('userId');
        console.log(userId)

        // init(adminModel.companyId || 0)
    }, [])

    const [show, setShow] = useState(false)
    const [accidentShow, setAccidentShow] = useState(false)
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [showInfo, setShowInfo] = useState(false)

    // Переключатель для филтра объёма
    const [switchTankFilter, setSwitchTankFilter] = useState(false)
    const addsidebarRef = useRef(null);
    const [showAddSidebar, setAddShowSidebar] = useState(false);
    const toggleAddSidebar = () => {
        setAddShowSidebar(!showAddSidebar);
    };

    const handleRowClick = (row: any, event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedRow(row);
        setShowInfo(true)
    };

    return (
        <>
            ?userId=5
            {showInfo &&
                <SewerInfoModal onClose={() => { }} setShow={setShowInfo} show={showInfo} sewer={selectedRow} />
            }
            <SewerMapModal />
            {showAddSidebar && (
                <div ref={addsidebarRef} className="z-50">
                    <CreateSewerModal setShow={setShow} show={show} onClose={toggleAddSidebar} />
                </div>
            )}
            <AccidentReportModal setShow={setAccidentShow} show={accidentShow} />

            <div className="mt-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col w-[70%] gap-6">
                        <span className="text-[34px] font-semibold">Список ассенизаторов</span>
                        <div className="flex flex-row gap-8 items-center">
                            <Button children="Создать" class="text-white bg-[#4A85F6] p-5" onClick={toggleAddSidebar} />
                            <div className="flex flex-row gap-8 items-center">
                                <Input placeholder="Поиск..." id={'sewerNumberPlate'} value={searchValue} onChange={search} class="border-[#EFF4FA]" icon="search" />

                                <div className="relative">
                                    <div className="flex items-center cursor-pointer" onClick={() => setSwitchTankFilter(!switchTankFilter)}>Фильтр по объёму <Icon systemName="arrow-down" className={`ml-1 ${switchTankFilter && "rotate-180"}`} /></div>
                                    <div className={`flex flex-col absolute botton-0 right-0 px-[14px] py-[12px] bg-stone-50 rounded-lg shadow-md z-10 ${!switchTankFilter && "hidden"}`}>
                                        <div className="flex flex-col gap-1 cursot-pointer">
                                            {getTank.map((tank) => (
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input type="checkbox" name="tankValue" onChange={(e) => pushTank(Number(e.target.value), e.target.checked)} checked={tanks.includes(tank)} value={tank} />
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
                <Table onRowClick={handleRowClick} pageSize={10} columns={columns} data={isSearch ? searchedModel : model} />
            </div>

        </>
    )
})