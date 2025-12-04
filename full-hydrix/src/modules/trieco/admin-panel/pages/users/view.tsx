import { Button } from "@/app/cores/core-trieco/UIKit/button"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { Input } from "@/app/cores/core-trieco/UIKit/input"
import { useEffect, useRef, useState } from "react"
import { ExtendedColumnDef, Table } from "@/app/cores/core-trieco/UIKit/table"
import { observer } from "mobx-react-lite"
import { Role } from "@/app/cores/core-trieco/enums/role"
import userModel from "./models/users-model"
import { Roles } from "./utils/getRoles"
import { DeleteUserModal } from "./component/delete-user-modal"
import { CreateModal } from "./component/create-modal"

export const UsersView = observer(() => {


    const columns: ExtendedColumnDef<any, any>[] = [
        {
            header: "ФИО",
            accessorKey: 'name',
            cell: ({ row }) => {
                return (
                    <span className="text-[12px] text-[#222B45] font-semibold">{row.original['lastName']} {row.original['firstName']} {row.original['patronymic']}</span>)
            },
        },
        {
            header: "Телефон",
            accessorKey: 'phoneNumber',
            // size: 200,
            cell: info => {
                return (
                    <span className="text-[12px] ml-5">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'E-mail',
            accessorKey: 'email',
            // size: 100,
            cell: info => {
                return (
                    <span className="text-[12px]">{info.getValue()}</span>
                )
            },
        },
        {
            header: 'Логин',
            accessorKey: 'login',
            cell: info => {
                return (
                    <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">{info.getValue()}</div>
                )
            }
        },
        {
            header: 'Роль',
            accessorKey: 'roleId',
            cell: info => {
                return (
                    <div className="text-[12px] text-[#222B45] font-semibold w-full text-center">{Roles[info.getValue()]}</div>
                )
            }
        },
        {
            header: '',
            accessorKey: 'rating',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-[10px]">
                        <Button class="bg-[#ECF3FF] py-2 px-[15px] !text-[12px] !text-[#4080FB] !w-max" onClick={(e) => { e.stopPropagation(), recovery(row.original["email"], row.original["id"]); }}>Выслать пароль</Button>
                        <Icon width={30} height={30} onClick={(e) => { e.stopPropagation(), setUserId(row.original["id"]), setDeleteUserShow(true) }} systemName="basket" className="cursor-pointer" />
                    </div>
                )
            }
        },
    ]

    const { model, roles, search, searchValue, pushRoles, init, passwordRecovery } = userModel

    useEffect(() => { init() }, [])

    // Переключатель для филтра объёма
    const [switchTankFilter, setSwitchTankFilter] = useState(false)
    const [deleteUserShow, setDeleteUserShow] = useState(false)
    const [showModal, setShow] = useState(false)
    const [UserId, setUserId] = useState<number>(0)

    const handleRowClick = (row: any, event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const recovery = (email: string, id: number) => {
        passwordRecovery(email, id)
    }

    return (
        <>
            <CreateModal show={showModal} setShow={setShow} />

            <DeleteUserModal show={deleteUserShow} setShow={setDeleteUserShow} id={UserId} />

            <div className="mt-12">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col w-[70%] gap-6">
                        <span className="text-[34px] font-semibold">Список пользователей</span>
                        <div className="flex flex-row gap-8 items-center">
                            <Button children="Создать" class="bg-[#4A85F6] p-5" onClick={() => setShow(true)} />
                            <div className="flex flex-row gap-8 items-center">

                                <Input placeholder="Поиск..." id={'sewerNumberPlate'} value={searchValue} onChange={search} class="border-[#EFF4FA]" icon="search" />
                                <div className="relative">
                                    <div className="flex items-center cursor-pointer" onClick={() => setSwitchTankFilter(!switchTankFilter)}>Фильтр по ролям <Icon systemName="arrow-down" className={`ml-1 ${switchTankFilter && "rotate-180"}`} /></div>
                                    <div className={`flex flex-col absolute botton-0 right-0 px-[14px] py-[12px] bg-stone-50 rounded-lg shadow-md z-10 ${!switchTankFilter && "hidden"}`}>
                                        <div className="flex flex-col gap-1">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="tankValue" onChange={(e) => pushRoles(Number(e.target.value), e.target.checked)} checked={roles.includes(Role.Client)} value={Role.Client} />
                                                <span>Клиенты</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="tankValue" onChange={(e) => pushRoles(Number(e.target.value), e.target.checked)} checked={roles.includes(Role.CompanytClient)} value={Role.CompanytClient} />
                                                <span>Компании</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="tankValue" onChange={(e) => pushRoles(Number(e.target.value), e.target.checked)} checked={roles.includes(Role.CompanyOperator)} value={Role.CompanyOperator} />
                                                <span>Перевозчики</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="tankValue" onChange={(e) => pushRoles(Number(e.target.value), e.target.checked)} checked={roles.includes(Role.Ministry)} value={Role.Ministry} />
                                                <span>Министр</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer w-max">
                                                <input type="checkbox" name="tankValue" onChange={(e) => pushRoles(Number(e.target.value), e.target.checked)} checked={roles.includes(Role.Sewer)} value={Role.Sewer} />
                                                <span>Сточная труба</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" name="tankValue" onChange={(e) => pushRoles(Number(e.target.value), e.target.checked)} checked={roles.includes(Role.WaterCompany)} value={Role.WaterCompany} />
                                                <span>Водоканал</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Table onRowClick={handleRowClick} pageSize={10} columns={columns} data={model} />
            </div>
        </>
    )
})