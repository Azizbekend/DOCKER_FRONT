import { observer } from "mobx-react-lite"
import orderListModel from "./model/list-model";
import { Search } from "@/shared/ui/Inputs/input-search";
import { ButtonCheckList } from "@/shared/ui/button-check-list";
import { volumes } from "@/entities/volume/data";
import { useEffect, useState } from "react";
import { OrderStatus } from "@/entities/order/order-status";
import useOrderStatus from "@/entities/order/useOrderStatus";
import { TableColumn } from "@/shared/ui/table/setting/types";
import { Order } from "@/entities/order/type";
import { Icon } from "@/shared/ui/icon";
// import { format, parseISO } from "date-fns";
// import { ru } from "date-fns/locale";
import { formatAddress } from "@/shared/ui/format-adress";
import { OrderModal } from "./components/order-modal";
import { Table } from "@/shared/ui/table/index";
import { ModalDelete } from "@/shared/ui/modal/modal-delete";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import InputCheckbox from "@/shared/ui/Inputs/input-checkbox";

const columns: TableColumn<Order>[] = [
    {
        header: "",
        key: "selfCreated",
        width: "0.5fr",
        cell: ({ selfCreated }) => {
            return (
                <div className="flex justify-center items-center" style={{ minWidth: 50 }}>
                    {selfCreated ? <Icon width={30} systemName="ambulance" className="cursor-pointer" /> : <div style={{ width: 30, height: 30 }}></div>}
                </div>
            );
        },
    },
    {
        header: "ФИО Заказчика",
        key: 'name',
        cell: ({ userFirstName, userLastName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{userFirstName + " " + userLastName}</span>
            )
        },
    },
    {
        header: "Адрес",
        key: 'adress',
        cell: ({ adress }) => {
            return (
                <span className="text-[12px] text-[#222B45]">{formatAddress(adress || "")}</span>
            )
        },
    },
    {
        header: 'Объем',
        key: 'wasteVolume',
        width: "0.5fr",
        cell: ({ wasteVolume }) => {
            return (
                <span className="text-[12px]">{wasteVolume} м³</span>
            )
        },

    },
    {
        header: 'Дата и время',
        key: 'arrivalStartDate',
        cell: ({ arrivalStartDate, arrivalEndDate }) => {
            // const arrivalStartDateISO = parseISO(arrivalStartDate || "")
            // const arrivalEndDateISO = parseISO(arrivalEndDate || "")
            const arrivalStartDateISO = arrivalStartDate || "";
            const arrivalEndDateISO = arrivalEndDate || "";
            return (
                <span className="text-[12px]">{arrivalStartDateISO.toString()} {arrivalStartDateISO.toString()}-{arrivalEndDateISO.toString()}</span>
                // <span className="text-[12px]">{format(arrivalStartDateISO, 'dd.MM.yyyy')} {format(arrivalStartDateISO, 'HH:mm')}-{format(arrivalEndDateISO, 'HH:mm')}</span>
            )
        },
    },
    {
        header: 'Дата создания',
        key: 'timeOfPublication',
        cell: ({ timeOfPublication }) => {
            const date = new Date(timeOfPublication)
            return (
                <div>{date.toString()}</div>
                // <div className="text-[12px] text-center">{format(date, 'd MMMM yyyy HH:mm', { locale: ru })}</div>
            )
        },

    },
    {
        header: 'Статус',
        key: 'orderStatusId',
        width: "190px",
        cell: ({ orderStatusId }) => {
            let el = Number(orderStatusId) as OrderStatus

            if (orderStatusId === undefined) {
                el = OrderStatus.Cancelled
            }
            const bgColor = `${useOrderStatus().StatusColor(el)} `
            const style = `text-white rounded-[30px] py-[6px] px-[32px] text-center m-auto w-max whitespace-nowrap`

            return (
                <div className={style} style={{ backgroundColor: bgColor }}>
                    <span>{useOrderStatus().StatusText(el)}</span>
                </div>
            )
        },
    },
    {
        header: 'Исполнитель',
        key: 'executorName',
        cell: ({ sewerFirstName, sewerLastName }) => {
            if (sewerFirstName === null) {
                return (
                    <div className="text-center text-[#222B45] font-semibold">Не назначен</div>
                )
            }
            return (
                <div className="text-center text-[#222B45] font-semibold">{sewerLastName} {sewerFirstName}</div>
            )
        },
    },
]

export const OderListView = observer(() => {
    const { init, list, pushVolumes, showInfo, setShowInfo, pushStatus, statusModel, volumesModel } = orderListModel;
    const { search, setSearch, results } = useSearch<Order>({ data: list, searchFields: ["userFirstName", "userLastName", "userPatronymic"] });
    const { StatusText } = useOrderStatus();

    const [selectedRow, setSelectedRow] = useState<Order | null>(null);

    const handleRowClick = (row: Order, event: React.MouseEvent) => {
        event?.stopPropagation();
        setSelectedRow(row);
        setShowInfo(true);
    };

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <OrderModal
                show={showInfo}
                setShow={setShowInfo}
                info={selectedRow}
            />

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col w-[50%] gap-6">
                    <span className="text-[34px] font-semibold">Управление заявками</span>
                    <div className="flex flex-row gap-8">
                        <Search placeholder="Поиск..." value={search} onChange={setSearch} classNames={{
                            container: "w-min rounded-lg h-[38px]",
                            input: "!w-[400px]",
                        }} />

                        <ButtonCheckList
                            name="Фильтр по объёму"
                            classNames={{ button: "w-max" }}
                            children={
                                volumes.map((volume, key) => (
                                    <InputCheckbox
                                        key={key}
                                        containerClassName="w-fit"
                                        name="tankValue"
                                        onChange={(e) => pushVolumes(Number(e.target.value), e.target.checked)}
                                        checked={volumesModel.includes(volume)}
                                        value={volume}
                                        label={`${volume}м³`}
                                    />
                                ))
                            }
                        />

                        <ButtonCheckList
                            name="Фильтр по статусу"
                            classNames={{
                                button: "w-max"
                            }}
                            children={
                                Object.values(OrderStatus).filter((_, index) => index < (Object.keys(OrderStatus).length / 2)).map((name, key) => (
                                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="status"
                                            value={OrderStatus[name]}
                                            checked={statusModel.includes(OrderStatus[name])}
                                            onChange={(e) =>
                                                pushStatus(Number(e.target.value), e.target.checked)
                                            }
                                        />
                                        <span>{StatusText(OrderStatus[name])}</span>
                                    </label>
                                ))
                            }
                        />
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                data={results.length > 0 ? results : []}
                onRowClick={handleRowClick}
                classNames={{
                    body: "mt-4",
                }}
            />
        </>
    )
})