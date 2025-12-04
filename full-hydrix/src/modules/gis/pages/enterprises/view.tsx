import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import clientCompaniesModel, { TypeInfoType } from "./models/client-company-model";
import { Table } from "@/shared/ui/table/index";
import { ClientCompany } from "@/entities/company/type";
import { TableColumn } from "@/shared/ui/table/setting/types";
import { Button } from "@/shared/ui/button";
import { useSearch } from "@/shared/ui/Inputs/hooks/hook-search";
import { Search } from "@/shared/ui/Inputs/input-search";
import { CreateEnterprice } from "./components/create-enterprise";

const columns: TableColumn<ClientCompany>[] = [
    {
        header: "Наименование предприятия",
        key: 'companyName',
        width: '0.7fr',
        cell: ({ companyName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{companyName}</span>
            )
        },
    },
    {
        header: "Обслуживающая организация",
        key: 'waterCompanyName',
        cell: ({ waterCompanyName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{waterCompanyName}</span>
            )
        },
    },
    {
        header: "Муниципальное образование",
        key: 'municipalityName',
        cell: ({ municipalityName }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">{municipalityName}</span>
            )
        },
    },
    {
        header: "Контракт/договор",
        key: 'contract',
        cell: ({ contractId }) => {
            return (
                <span className="text-[14px] text-[#222B45] font-semibold">ссылка {contractId}</span>
            )
        },
    },
    {
        header: '',
        key: 'archive',
        width: '200px',
        cell: ({ contractId }) => {
            return (
                <Button class='mx-auto px-[16px] py-[8px] bg-opacity-10 bg-[#4080fb] border-1 rounded-lg' children={
                    <span className="text-[12px] text-center text-[#4080fb]">Поместить в архив</span>
                } />
            )
        },
    }
]

export const EnterprisesView = observer(() => {

    const { list, init, typeInfo, setTypeInfo } = clientCompaniesModel;
    const { search, setSearch, results } = useSearch<ClientCompany>({ data: list, searchFields: ['companyName', 'waterCompanyName', 'municipalityName'] })

    useEffect(() => {
        init();
    }, [])

    const [show, setShow] = useState(false)

    return (
        <>

            <CreateEnterprice setShow={setShow} show={show} />

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-6 w-[100%]">
                    <span className="text-[34px] font-semibold">Предприятия</span>
                    <div className="flex gap-[23px] ">
                        <div className="flex space-x-2">
                            <Button
                                onClick={() => { setTypeInfo(TypeInfoType.listCompanies) }}
                                class={`px-4 py-2 font-semibold rounded-lg ${typeInfo == TypeInfoType.listCompanies ? "bg-[#4A85F6] text-white" : 'bg-[#DCDEE3] text-[#2C2A2A]'}`}
                            >
                                Список предприятия
                            </Button>
                            <Button
                                onClick={() => { setTypeInfo(TypeInfoType.orderCompanies) }}
                                class={`px-4 py-2 font-semibold rounded-lg ${typeInfo == TypeInfoType.orderCompanies ? "bg-[#4A85F6] text-white" : 'bg-[#DCDEE3] text-[#2C2A2A]'}`}
                            >
                                Заявки предприятий
                            </Button>
                        </div>
                    </div>
                    {
                        typeInfo == TypeInfoType.listCompanies
                            ?
                            <div>
                                <div className="flex justify-between w-[100%]">
                                    <div className="flex gap-[23px]">
                                        <Button children="Добавить" class="bg-[#4A85F6] h-[38px] px-6 flex items-center hover:opacity-50 duration-300 text-white"
                                            onClick={() => setShow(true)} />
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
                                    data={results.length > 0 ? results : []}
                                    classNames={{
                                        body: "mt-4",
                                    }}
                                />

                            </div>
                            :
                            <div className="w-max">
                                <div className="flex">
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
                            </div>
                    }
                </div>
            </div>
        </>
    )
});
