import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/entities/hardware/model";
import Loader from "@/shared/ui/loader/loader";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";
import { hardwareListModel } from "../equipment/model/hardware-list-model";

export const EquipmentAbout = observer(() => {
    const { id } = useParams();

    const { model, init, isLoading } = hardwareModel
    const { setModalService } = hardwareListModel;
    const navigate = useNavigate();

    useEffect(() => {
        init(Number(id))
    }, [])

    return isLoading ?
        <Loader />
        :
        <div className="informations-dispatch__requestregistry relative mt-10" >
            <div className="absolute  top-[-36px] left-[30px] flex gap-3">
                <NavLink
                    to={`/dispatcher/equipment-about/${id}/passport/`}
                    className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
                >
                    Паспорт
                </NavLink>
                <NavLink
                    to={`/dispatcher/equipment-about/${id}/controll/`}
                    className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
                >
                    Управление
                </NavLink>
                <NavLink
                    to={`/dispatcher/equipment-about/${id}/service/`}
                    className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
                >
                    Сервис
                </NavLink>
            </div>

            {/* border border-gray-200 shadow-xl  */}
            <div className="space-y-6 min-h-[60vh] mb-10">
                {/* Шапка */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between h-[100px] gap-4 z-2 rounded-2xl bg-white shadow-sm p-6">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/dispatcher/equipment"
                            className="flex items-center justify-center w-10 h-10 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
                        >
                            <Icon systemName="arrow-left" className="text-white" />
                        </Link>
                        <div className="relative">
                            <h1 className="text-xl md:text-2xl font-bold">
                                {window.location.pathname == `/dispatcher/equipment-about/${id}/passport/` && "Паспорт"}
                                {window.location.pathname == `/dispatcher/equipment-about/${id}/controll/` && "Управление"}
                                {window.location.pathname == `/dispatcher/equipment-about/${id}/service/` && "Сервис"}
                            </h1>

                            {window.location.pathname == `/dispatcher/equipment-about/${id}/passport/` && <p className="w-max text-sm">{model.name || '—'}</p>}
                        </div>
                    </div>
                    {/* Top Action Buttons */}
                    <div className="flex gap-3 z-10">
                        <Link
                            to="/dispatcher/orders/create"
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#4A85F6] text-white rounded-lg font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
                        >
                            <Icon systemName="file-plus" />
                            Создать заявку
                        </Link>

                        <Button
                            class="px-4 py-2.5 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors shadow-sm"
                            onClick={() => setModalService(true, model.id)}
                        >
                            + сервис
                        </Button>

                        <Button
                            class="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            onClick={() => navigate(`/dispatcher/equipment/form/${model.id}`)}
                        >
                            <Icon systemName="edit-white" width={20} height={20} />
                        </Button>
                    </div>
                </div>

                <Outlet />
            </div>
        </div>

})