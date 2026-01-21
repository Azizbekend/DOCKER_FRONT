
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { Icon } from "@/packages/shared-ui/icon"
import { useEffect } from "react";
import { passportModel } from "../../features/object/model";
import { tabLinks } from "../../../../packages/entities/object/config";
import { observer } from "mobx-react-lite";

export const PassportObject = observer(() => {

  const { objectId } = useParams();
  const { init } = passportModel;

  useEffect(() => {
    init(objectId)
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

        <div className="sticky top-0 z-10 backdrop-blur-sm px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {tabLinks.map((link, key) => (
                <NavLink
                  key={key}
                  to={link.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 rounded-t-lg font-semibold text-sm sm:text-base transition-colors duration-300 ${isActive
                      ? "bg-[#4A85F6] text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <Outlet />

      </div>
    </>
  )
})