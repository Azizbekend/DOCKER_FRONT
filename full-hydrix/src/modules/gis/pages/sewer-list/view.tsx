import { observer } from "mobx-react-lite"
import { Icon } from "@/shared/ui/icon";
import { Search } from "@/shared/ui/Inputs/input-search";
import sewerListModel from "./models/sewer-list-model";
import { ButtonCheckList } from "@/shared/ui/button-check-list";
import { Table } from "@/shared/ui/table/index";
import { useEffect, useState } from "react";
import { Sewer } from "@/entities/sewer/type";
import { TableColumn } from "@/shared/ui/table/setting/types";
import { Button } from "@/shared/ui/button";
import { SewerInfoModal } from "./component/sewer-info-modal";
import sewerMapModel from "./models/sewer-map-model";
import { volumes } from "@/entities/volume/data";
import { AccidentReportModal } from "./component/accident-report-modal";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { useAuth } from "@/entities/user/context";
import InputCheckbox from "@/shared/ui/Inputs/input-checkbox";

const columns: TableColumn<Sewer>[] = [
    {
        header: "ФИО Водителя",
        key: 'name',
        cell: ({ lastName, firstName, patronymic }) => {
            return (
                <span className="text-[#222B45] font-semibold">{lastName} {firstName} {patronymic}</span>)
        },
    },
    {
        header: "Номер телефона",
        key: 'phoneNumber',
        cell: ({ phoneNumber }) => {
            return (
                <span>{phoneNumber}</span>
            )
        },
    },
    {
        header: "Наименование организации",
        key: 'companyName',
        cell: ({ companyName }) => {
            return (
                <span>{companyName}</span>
            )
        },
    },

    {
        header: 'Марка',
        key: 'sewerCarModel',
        cell: ({ sewerCarModel }) => {
            return (
                <span>{sewerCarModel}</span>
            )
        },

    },
    {
        header: 'Номер автомобиля',
        key: 'sewerNumberPlate',
        cell: ({ sewerNumberPlate }) => {
            return (
                <div className="text-[#222B45] font-semibold w-full text-center">{sewerNumberPlate}</div>
            )
        }
    },
    {
        header: "Объём",
        key: 'tankVolume',
        cell: ({ tankVolume }) => {
            return (
                <span>{tankVolume} м³</span>
            )
        },
    },
    {
        header: '',
        key: 'edit',
        cell: ({ id }) => {
            return (
                <span className="flex items-center justify-center h-full">
                    {/* <Icon width={32} onClick={(e) => { e.stopPropagation(); sewerMapModel.openModal(gisModel.user?.id || 0, id); }} height={32} systemName="location" className="cursor-pointer" /> */}
                    <Icon width={32} onClick={(e) => { e.stopPropagation(); sewerMapModel.openModal(5 || 0, id); }} height={32} systemName="location" className="cursor-pointer" />
                </span>
            )
        },
    },
    {
        header: '',
        key: 'id',
        cell: ({ id }) => {
            return (
                <Button class="text-[16px] text-[#4A85F6] font-semibold flex justify-center w-full" onClick={() => { sewerListModel.setShowInfo(false); window.location.href = "https://cloud.digicity.io/" }} >Сайт</Button>
            )
        }
    },
]

export const SewerListView = observer(() => {

    const { init, list, pushTank, tanks, showInfo, setShowInfo } = sewerListModel;

    const { search, setSearch, results } = useSearch<Sewer>({ data: list, searchFields: ['sewerNumberPlate', 'sewerCarModel', 'companyName', "firstName", "lastName", "patronymic"] })


    const { waterCompany } = useAuth();

    useEffect(() => {
        waterCompany && init(waterCompany?.id)
    }, []);

    const [selectedRow, setSelectedRow] = useState<Sewer | null>(null);

    const handleRowClick = (row: Sewer, event: React.MouseEvent) => {
        event.stopPropagation();
        setSelectedRow(row);
        setShowInfo(true);
    };



    return (
        <>

            <SewerInfoModal
                setShow={setShowInfo}
                show={showInfo}
                info={selectedRow}
            />
            {/* <SewerMapModal /> */}
            {/* <AccidentReportModal setShow={setAccidentShow} show={accidentShow} /> */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-6">
                    <span className="text-[34px] font-semibold">Список ассенизаторов</span>
                    <div className="flex flex-row gap-8 items-center ">
                        <Search placeholder="Поиск..." value={search} onChange={setSearch} classNames={{
                            container: "w-min rounded-lg h-[38px]",
                            input: "!w-[400px]",
                        }} />

                        <ButtonCheckList
                            name="Фильтр по объёму"
                            classNames={{
                                button: "w-max"
                            }}
                            children={
                                volumes.map((tank) => (
                                    <InputCheckbox
                                        containerClassName="w-fit"
                                        name="tankValue"
                                        onChange={(e) =>
                                            pushTank(Number(e.target.value), e.target.checked)
                                        }
                                        checked={tanks.includes(tank)}
                                        value={tank}
                                        label={`${tank} м³`}
                                    />
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
    );
});
