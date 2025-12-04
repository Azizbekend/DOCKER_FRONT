import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { hardwareModel } from "@/entities/hardware/model";

export const EquipmentAbout = observer(() => {
    const { id } = useParams();

    const { init, isLoading, initControl, initCharacteristic } = hardwareModel

    useEffect(() => {
        init(Number(id))
        initControl(Number(id))
        initCharacteristic(Number(id))
    }, [])

    return (
        isLoading &&
        <div className="informations-dispatch__requestregistry relative mt-10" >
            <div className="absolute  top-[-38px] left-[30px] flex gap-3">
                <NavLink
                    to={`/dispatcher/equipment-about/passport/${id}`}
                    className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
                >
                    Паспорт
                </NavLink>
                <NavLink
                    to={`/dispatcher/equipment-about/controll/${id}`}
                    className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
                >
                    Управление
                </NavLink>
            </div>

            <Outlet />
        </div>
    );
})