import { Link, Outlet, useLocation } from "react-router-dom"
import { TtemsRequestRegistryType } from "./type/type"


export const RequestRegistry = () => {

  let location = useLocation();


  return (
    <>
      <div
        className="informations-dispatch__requestregistry relative mt-8"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="absolute top-[-42px] left-[30px] flex gap-2">
          <Link
            to="/dispatcher/orders"
            className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all duration-200 ${location.pathname === '/dispatcher/orders'
                ? 'bg-[#4A85F6] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Заявки
          </Link>
          <Link
            to="/dispatcher/orders/create/form"
            className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all duration-200 ${location.pathname.includes('/dispatcher/orders/create/')
                ? 'bg-[#4A85F6] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Создание заявки
          </Link>
        </div>

        <Outlet />
      </div>


    </>
  )
}