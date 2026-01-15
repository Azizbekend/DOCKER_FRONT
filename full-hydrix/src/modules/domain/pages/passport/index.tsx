
import { Link, NavLink, Outlet } from "react-router-dom";
import { Icon } from "@/shared/ui/icon"
import { useEffect } from "react";
import { passportModel } from "../../../../features/object/model";
import { tabLinks } from "../../../../entities/object/config";
import { observer } from "mobx-react-lite";

export const PassportObject = observer(() => {

  const { init: passportInit } = passportModel;

  useEffect(() => {
    passportInit()
  }, [])

  return (
    <>
      <div className="flex items-center gap-4 mb-14">
        <Link
          to="/menu-moduls"
          className="flex items-center justify-center w-11 h-11  transition-colors"
        >
          <Icon systemName="home-active" className="text-white" />
        </Link>

        <div>
          <h1 className="font-bold text-gray-800 text-4xl">Единый реестр объектов</h1>
          <div className="w-28 h-1 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>

      <div className="relative top-[15px] mb-20">

        <div className="absolute top-[-37px] left-[30px] flex gap-2">
          {tabLinks.map((link, key) => {
            return (
              <NavLink to={link.to} key={key}
                className={({ isActive }) => `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}
              >
                {link.name}
              </NavLink>
            )
          })}
        </div>

        <Outlet />

      </div>
    </>
  )
})