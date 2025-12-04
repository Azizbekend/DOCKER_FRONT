import { Operator } from "@/entities/operator/type";
import { Button } from "@/shared/ui/button";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { Search } from "@/shared/ui/Inputs/input-search";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import operatorListModel from "./models/operator-list-model";
import { Table } from "@/shared/ui/table/index";
import { TableColumn } from "@/shared/ui/table/setting/types";
import { Icon } from "@/shared/ui/icon";
import { OperatorRole, operatorRole } from "@/entities/user/hooks";
import { OperatorInfoModal } from "./components/info-operator-madal";
import { OperatorModal } from "./components/operator-modal";
import operatorModel from "./models/operator-model";
import { useAuth } from "@/entities/user/context";


const columns: TableColumn<Operator>[] = [
    {
        header: "ФИО оператора",
        key: '',
        cell: ({ lastName, firstName, patronymic }) => {
            return (
                <span className="text-[#222B45] font-semibold">{lastName + " " + firstName + " " + patronymic}</span>
            )
        },
    },
    {
        header: "Роль",
        key: 'roleName',
        cell: ({ roleName }) => {
            return (
                <span className="">{operatorRole(roleName as OperatorRole)}</span>
            )
        },
    },
    {
        header: "Телефон",
        key: 'phone',
        cell: ({ phone }) => {
            return (
                <span className="">{phone}</span>
            )
        },
    },
    {
        header: "E-mail",
        key: 'email',
        cell: ({ email }) => {
            return (
                <span className="">{email}</span>
            )
        },
    },
    {
        header: '',
        key: 'edit',
        width: "100px",
        cell: (operator) => {
            return (
                <div className="flex justify-end" onClick={(e) => { e.preventDefault(); e.stopPropagation(); operatorListModel.updateOperator(operator) }}>
                    <Icon systemName="edit" width={24} height={24} className="cursor-pointer" />
                </div>
            )
        },
    },
    {
        header: '',
        key: 'archive',
        cell: () => {
            return (
                <Button class='m-auto px-[24px] py-[8px] bg-opacity-10 bg-[#4080fb] border-1 rounded-lg' children={<span className="text-[11px] text-center text-[#4080fb] font-medium">Поместить в архив</span>} />
            )
        },
    },
]


export const OperatorsView = observer(() => {

    const { init, list, setShowInfo, setShowModalChange } = operatorListModel;
    const { setTypeModal } = operatorModel;
    const { waterCompany } = useAuth();

    useEffect(() => { waterCompany && init(waterCompany.id) }, [])

    const { search, setSearch, results } = useSearch<Operator>({ data: list, searchFields: ['firstName', 'lastName', 'patronymic', 'email', 'phone'] })

    // const toggleAddSidebar = () => {
    //     initOperator(null, gisModel.waterCompany?.id)
    //     setAddShowSidebar(!showAddSidebar);
    // };

    // const toggleEditSidebar = () => {
    //     setShowInfo(false);
    //     setEditShowSidebar(!showEditSidebar);
    // };

    const handleRowClick = (row: Operator, event: React.MouseEvent) => {
        setShowInfo(true, row);
    };

    return (
        <>
            <OperatorInfoModal />
            <OperatorModal />

            {/* {showEditSidebar && (
                <div ref={addsidebarRef} className="z-50">
                    <EditOperatorMenu setShow={setShow} show={show} onClose={toggleEditSidebar} initOperator={() => initOperator(selectedRow, gisModel.waterCompany?.id)} />
                </div>
            )} */}
            <div className="flex flex-col w-[100%]">
                <span className="mb-[16px] text-[34px] font-semibold">Операторы</span>

                <div className="flex justify-between w-[100%]">
                    <div className="flex gap-[23px]">
                        <Button onClick={() => setShowModalChange(true, null)} class='bg-[#4A85F6] h-[38px] px-6 flex items-center hover:opacity-50 duration-300 text-white' children="Добавить" />
                        <Search
                            placeholder="Поиск..."
                            value={search}
                            onChange={setSearch}
                            classNames={{
                                container: "w-min rounded-lg h-[38px]",
                                input: "!w-[400px]",
                            }}
                        />
                    </div>
                    <Button class='px-[32px] py-[9px] text-[#4a85f6] border-[#4a85f6] border-solid border-[2px] items-center justify-center' children={<span className="font-semibold leading-none text-[#4a85f6]">Архив</span>} />
                </div>
                <Table
                    columns={columns}
                    data={results.length ? results : []}
                    onRowClick={handleRowClick}
                />
            </div>
        </>
    )
})