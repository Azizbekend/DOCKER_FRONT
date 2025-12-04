import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import listModel from "./model/list-model"
import { Icon } from "@/shared/ui/icon"
import { Search } from "@/shared/ui/Inputs/input-search"
import { Button } from "@/shared/ui/button"
import { ButtonCheckList } from "@/shared/ui/button-check-list"
import { Table } from "@/shared/ui/table/"

import { WaterCompany } from "@/entities/water-company/types"
import { TableColumn } from "@/shared/ui/table/setting/types"
import { formatAddress } from "@/shared/ui/format-adress"
import { ModalDelete } from "@/shared/ui/modal/modal-delete"
import { CreateCompanyModal } from "./components/add-company-modal"
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search"
import InputCheckbox from "@/shared/ui/Inputs/input-checkbox"

const columns: TableColumn<WaterCompany>[] = [
    {
        header: "№",
        key: 'id',
        width: "0.5fr",
        cell: ({ id }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{id}</span>
            )
        },
    },
    {
        header: "Наименование",
        key: 'waterCompanyName',
        cell: ({ waterCompanyName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{waterCompanyName}</span>
            )
        },
    },
    {
        header: "Муниципальное образование",
        key: 'municipality',
        cell: ({ municipality }) => {
            return (
                <span className="text-[14px] text-[#222B45]">{municipality.name}</span>
            )
        },
    },
    {
        header: 'ФИО администратора системы',
        key: 'operator',
        cell: ({ operator }) => {
            return (
                <span className="text-[14px]">{`${operator.lastName} ${operator.firstName} ${operator.patronymic}`}</span>
            )
        },
    },
    {
        header: 'Контакты администратора системы',
        key: 'operator',
        cell: ({ phoneNumber }) => {
            return (
                <span className="text-[14px]">{phoneNumber}</span>
            )
        },
    },
    {
        header: 'Email',
        key: 'operator',
        width: "0.7fr",
        cell: ({ email }) => {
            return (
                <span className="text-[14px]">{email}</span>
            )
        },
    },
    {
        header: 'Транспортировщик',
        key: 'isTranporter',
        cell: ({ isTransporter }) => {
            return (
                <span className="text-[14px]">{isTransporter ? "Да" : "Нет"}</span>
            )
        },
    },
    {
        header: 'Адрес',
        key: 'address',
        cell: ({ address }) => {
            return (
                <span className="text-[14px]">{formatAddress(address)}</span>
            )
        },
    },
    {
        header: '',
        key: 'delete',
        width: "0.5fr",
        cell: ({ id }) => (
            <div className="flex items-center justify-center h-full">
                <Icon
                    onClick={(e) => { e.stopPropagation(); listModel.setShowDeleteModal(true, id) }}
                    width={24}
                    height={24}
                    systemName="delete"
                    className="z-10 cursor-pointer max-w-[24px] max-h-[24px]"
                />
            </div>
        ),
    }
]

export const CompanyListView = observer(() => {
    const { setShowDeleteModal, showDeleteModal, list, init, municipalities, pushmunicipality, municipalityFilterIds, deleteCompany } = listModel;
    const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false)

    const { search, setSearch, results } = useSearch<WaterCompany>({ data: list, searchFields: ['waterCompanyName', 'address'] })
    useEffect(() => { init() }, []);

    return (
        <>
            <ModalDelete wrapperId="delete" show={showDeleteModal} setShow={setShowDeleteModal} onClickDelete={() => deleteCompany}
                text="Вы действительно хотите удалить этот водоканал?" />
            <CreateCompanyModal show={showCreateCompanyModal} setShow={setShowCreateCompanyModal} />

            <div className="flex flex-col w-[50%] gap-6">
                <span className="text-[34px] font-semibold">Список водоканалов</span>
                <div className="flex flex-row gap-8 items-center">
                    <Button children="Создать" class="bg-[#4A85F6] h-[38px] px-6 flex items-center hover:opacity-50 duration-300 text-white" onClick={() => setShowCreateCompanyModal(true)} />
                    <Search placeholder="Поиск (название, адрес)" value={search} onChange={setSearch} classNames={{
                        container: "w-min rounded-lg h-[38px]",
                        input: "!w-[400px]",
                    }} />

                    <ButtonCheckList
                        name="Фильтр по районам"
                        classNames={{
                            button: "w-max"
                        }}
                        children={
                            municipalities.map((municipality, key) => (
                                <InputCheckbox
                                    key={key}
                                    containerClassName="w-fit"
                                    onChange={(e) => pushmunicipality(Number(e.target.value), e.target.checked)}
                                    checked={municipalityFilterIds.includes(municipality.id)}
                                    value={municipality.id}
                                    label={`${municipality.name}`}
                                />
                            ))}
                    />
                </div>
            </div>


            <Table
                columns={columns}
                data={results.length > 0 ? results : []}
                classNames={{
                    body: "mt-4",
                }}
            />
        </>
    )
})