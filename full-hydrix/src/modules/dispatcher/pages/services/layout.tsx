import { Link, Outlet, useLocation } from "react-router-dom"
import { tabs } from "../../features/service-request/config";



export const RequestRegistry = () => {

  let location = useLocation();


  return (
    <div className="informations-dispatch__requestregistry relative mt-8">
      <div className="absolute top-[-40px] px-[30px] max-w-full flex gap-2  overflow-x-auto">
        {tabs.map((tab, key) => {
          return <Link to={tab.to} key={key}
            className={`lg:px-5 lg:py-2.5 rounded-t-lg font-semibold min-w-max lg:text-sm px-3 py-3 text-[12px] transition-all duration-200 ${location.pathname === tab.to
              ? 'bg-[#4A85F6] text-white shadow-md' : 'bg-gray-100 text-gray-700 bg-gray-200'
              }`}
          >
            {tab.label}
          </Link>
        })}
      </div>

      <div className="informations-dispatch__requestregistry requestregistry-dispatch bg-white rounded-2xl p-7 mb-8" >
        <Outlet />
      </div>

    </div>
  )
}