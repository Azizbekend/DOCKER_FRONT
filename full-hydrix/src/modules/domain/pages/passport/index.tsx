
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Icon } from "@/packages/shared-ui/icon"
import { useEffect } from "react";
import { passportModel } from "../../features/object/model";
import { tabLinks } from "../../../../packages/entities/object/config";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";

export const PassportObject = observer(() => {

  const { objectId } = useParams();
  const { init, isLodaded } = passportModel;

  useEffect(() => {
    init(Number(objectId))
  }, [])

  return (
    <>
      <div className="flex items-center gap-4 mb-6 sm:mb-8 p-2">
        <Link
          to="/menu-moduls"
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg hover:bg-[#3a6bc9] transition-colors"
        >
          <Icon systemName="home-active" className="text-white" />
        </Link>

        <div>
          <h1 className="font-bold text-gray-800 text-2xl sm:text-3xl md:text-4xl">Единый реестр объектов</h1>
          <div className="w-28 h-1 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>

      <div className="relative mb-20 min-h-[60vh]">

        <div className="top-0 z-10 backdrop-blur-sm px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {tabLinks.map((link, key) => (
                <NavLink
                  key={key}
                  to={"/domain/passport/" + objectId + "/" + link.to}
                  className={({ isActive }) =>
                    `hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>


        {isLodaded ? <Loader /> : <Outlet />}

      </div>
    </>
  )
})