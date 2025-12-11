import { useState } from "react";
import { RequestHistory } from "./tabs/request-history";
import { NavLink, Outlet } from "react-router-dom";

export const RequestRegistryForm = () => {
    return (
        <div>
            <div className="bg-white rounded-[20px] p-[45px_30px_50px_40px] relative">
                

                {/* Заголовок в едином стиле */}
      <div className=" flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Создание заявки</h1>
          <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>


                {/*<div className="mt-10">
                    <NavLink to={'/dispatcher/orders/create/form'} className={({ isActive }) => isActive ? 'border-b px-[20px] pb-2 text-[var(--clr-accent)] border-[var(--clr-accent)]' : 'border-b px-[20px] pb-2 text-[#757575] border-[#D9D9D9]'}>Основная информация</NavLink>
                     <NavLink to={'/dispatcher/orders/create/information'} className={({ isActive }) => isActive ? 'border-b px-[20px] pb-2 text-[var(--clr-accent)] border-[var(--clr-accent)]' : 'border-b px-[20px] pb-2 text-[#757575] border-[#D9D9D9]'}>Рабочие задания</NavLink>
                    <NavLink to={'/dispatcher/orders/create/tasks'} className={({ isActive }) => isActive ? 'border-b px-[20px] pb-2 text-[var(--clr-accent)] border-[var(--clr-accent)]' : 'border-b px-[20px] pb-2 text-[#757575] border-[#D9D9D9]'}>Вложения</NavLink>
                    <NavLink to={'/dispatcher/orders/create/journal'} className={({ isActive }) => isActive ? 'border-b px-[20px] pb-2 text-[var(--clr-accent)] border-[var(--clr-accent)]' : 'border-b px-[20px] pb-2 text-[#757575] border-[#D9D9D9]'}>Журнал работ</NavLink>
                    <NavLink to={'/dispatcher/orders/create/history'} className={({ isActive }) => isActive ? 'border-b px-[20px] pb-2 text-[var(--clr-accent)] border-[var(--clr-accent)]' : 'border-b px-[20px] pb-2 text-[#757575] border-[#D9D9D9]'}>История изменения</NavLink> 
                </div>*/}

                <div className="pt-14">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}