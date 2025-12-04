import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { Input } from "@/app/cores/core-trieco/UIKit/input"
import { ExtendedColumnDef, Table } from "@/app/cores/core-trieco/UIKit/table"
import { format, parseISO } from "date-fns"
import orderListModel from "./model/order-list-model"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { AttachSewerModal } from "./components/add-sewer-modal"
import { ru } from "date-fns/locale"
import attachSewerModel from "./model/attach-sewer-model"
import { OrderStatus, StatusColor, OrderStatusText } from "@/app/cores/core-trieco/lib/order"
import { OrderModal } from "./components/order-modal"
import orderModel from "./model/order-model"
import { Button } from "@/app/cores/core-trieco/UIKit"
import { formatAddress } from "@/app/cores/core-trieco/UIKit/format-adress"
import { CreateOrderModal } from "./components/create-order-modal"
import adminModel from "../../kernel/model/admin-model"

const columns: ExtendedColumnDef<any, any>[] = [
    {
        header: "",
        accessorKey: "selfCreated",
        size: 10,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center items-center" style={{ minWidth: 50 }}>
                    {row.original["selfCreated"] ? (
                        <Icon width={30} systemName="ambulance" className="cursor-pointer" />
                    ) : (
                        <div style={{ width: 30, height: 30 }}></div>
                    )}
                </div>
            );
        },
    },
    {
        header: "ФИО Заказчика",
        accessorKey: 'firstName',
        size: 300,
        cell: ({ row }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{row.original['userLastName']} {row.original['userFirstName']}</span>
            )
        },
    },
    {
        header: "Адрес",
        accessorKey: 'adress',
        size: 280,
        cell: info => {
            return (
                <span className="text-[12px] text-[#222B45]">{formatAddress(info.getValue())}</span>
            )
        },
    },
    {
        header: 'Объем',
        accessorKey: 'wasteVolume',
        size: 100,
        cell: info => {
            return (
                <span className="text-[12px]">{info.getValue()} м3</span>
            )
        },

    },
    {
        header: 'Район',
        accessorKey: 'municipalityName',
        size: 180,
        cell: ({ row }) => {
            if (row.original['adress'] === null) {
                return (
                    <div className="text-[12px]">Район отсутствует</div>
                )
            }
            return (
                <div className="text-[12px]">{row.original['municipalities']['name']}</div>
            )
        },
    },
    {
        header: 'Дата и время',
        accessorKey: 'carNumber',
        cell: ({ row }) => {
            const arrivalStartDate = parseISO(row.original["arrivalStartDate"])
            const arrivalEndDate = parseISO(row.original["arrivalEndDate"])
            return (
                <span className="text-[12px]">{format(arrivalStartDate, 'dd.MM.yyyy')} {format(arrivalStartDate, 'HH:mm')}-{format(arrivalEndDate, 'HH:mm')}</span>
            )
        },
    },
    {
        header: 'Дата создания',
        accessorKey: 'timeOfPublication',
        cell: info => {
            const date = new Date(info.getValue())
            return (
                <div className="text-[12px] text-center">{format(date, 'd MMMM yyyy HH:mm', { locale: ru })}</div>
            )
        },

    },
    {
        header: 'Статус',
        accessorKey: 'orderStatusId',
        filterOptions: [{ title: "Новый", value: 1 }, { title: "В пути", value: 2 }, { title: "В утилизации", value: 3 }, { title: "Выполнено", value: 4 }, { title: "Отклонено", value: 5 }, { title: "Принято", value: 6 }],
        size: 250,
        cell: info => {
            let el = Number(info.getValue()) as OrderStatus

            if (info.getValue() === undefined) {
                el = OrderStatus.Cancelled
            }
            const bgColor = `${StatusColor(el)} `
            const style = `text-white rounded-[30px] py-[6px] px-[32px] text-center m-auto w-max whitespace-nowrap`

            return (
                <div className={style} style={{ backgroundColor: bgColor }}>
                    <span>{OrderStatusText[el]}</span>
                </div>
            )
        },
    },
    {
        header: 'Исполнитель',
        accessorKey: 'executorName',
        size: 180,
        cell: ({ row }) => {
            if (row.original['sewerFirstName'] === null) {
                return (
                    <div className="text-center text-[#222B45] font-semibold">Не назначен</div>
                )
            }
            return (
                <div className="text-center text-[#222B45] font-semibold">{row.original['sewerFirstName']} {row.original['sewerLastName']}</div>
            )
        },
    },
    {
        header: '',
        accessorKey: 'edit',
        size: 80,
        cell: ({ row }) => {
            const orderStatus = Number(row.original['orderStatusId']);

            if (orderStatus === 1) {
                return (
                    <Icon
                        width={32}
                        onClick={(e) => {
                            e.stopPropagation();
                            attachSewerModel.setModalShow(true, Number(row.original['id']));
                        }}
                        height={32}
                        systemName="edit"
                        className="cursor-pointer"
                    />
                );
            }
            return null;
        },
    },
    // {
    //     header: '',
    //     accessorKey: 'delete',
    //     size: 80,
    //     cell: () => {
    //         return (
    //             <Icon width={32} height={32} systemName="delete" className="cursor-pointer" onClick={() => {console.log(123)}}/>
    //         )
    //     },
    // }
]

export const OderListView = observer(() => {
    const { init, model, isSearch, search, searchValue, searchedModel, pushMunicipality, filterByMunicipalityIds, municipalitiesAll } = orderListModel;
    const { isModalShow, setModalShow } = attachSewerModel;
    const [isOrderOpen, setOpen] = useState(false)
    const [switchMunicipalityFilter, setSwitchMunicipalityFilter] = useState(false)
    const [showAddSidebar, setAddShowSidebar] = useState(false);

    const companyId = adminModel.companyId;

    useEffect(() => {
        if (companyId) {
            init(companyId);
        }
    }, [init])

    return (
        <div className="mt-12">
            {showAddSidebar && (
                <CreateOrderModal onClose={() => setAddShowSidebar(!showAddSidebar)} />
            )}

            <AttachSewerModal setShow={setModalShow} show={isModalShow} />
            <OrderModal isOpen={isOrderOpen} setShow={setOpen} />

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col w-[50%] gap-6">
                    <span className="text-[34px] font-semibold">Управление заявками</span>
                    <div className="flex flex-row gap-8 items-center">
                        <Button children="Создать" class="bg-[#4A85F6] p-5" onClick={() => setAddShowSidebar(!showAddSidebar)} />

                        <Input placeholder="Поиск..." id={'ordersNumberPlate'} value={searchValue} onChange={search} class="border-[#EFF4FA]" icon="search" />

                        <div className="relative">
                            <div className="flex items-center cursor-pointer" onClick={() => setSwitchMunicipalityFilter(!switchMunicipalityFilter)}>Фильтр по району <Icon systemName="arrow-down" className={`ml-1 ${switchMunicipalityFilter && "rotate-180"}`} /></div>
                            <div className={`flex flex-col w-max absolute botton-0 left-0 px-[14px] py-[12px] bg-stone-50 rounded-lg shadow-md z-10 ${!switchMunicipalityFilter && "hidden"}`}>
                                <div className="flex flex-col gap-1 cursot-pointer max-h-[250px] overflow-auto">
                                    {municipalitiesAll.map((municipalities) => (
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" name="tankValue" onChange={(e) => pushMunicipality(Number(e.target.value), e.target.checked)} checked={filterByMunicipalityIds.includes(municipalities.id)} value={municipalities.id} />
                                            <span>{municipalities.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Table pageSize={10} onRowClick={(val) => { orderModel.open(val); setOpen(true); }} columns={columns} data={isSearch ? searchedModel : model} />
        </div>

    )
})