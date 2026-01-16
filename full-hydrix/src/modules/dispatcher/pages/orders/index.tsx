import { Link, Outlet, useLocation } from "react-router-dom"


export const RequestRegistry = () => {

  let location = useLocation();

  const tabs: {
    to: string,
    label: string,
  }[] = [
      {
        to: "/dispatcher/orders",
        label: "Заявки",
      },
      {
        to: "/dispatcher/orders/create/",
        label: "Создание заявки",
      }
    ]
  return (
    <div className="informations-dispatch__requestregistry relative mt-8">
      <div className="absolute top-[-42px] left-[30px] flex gap-2">

        {tabs.map((tab, key) => {
          return <Link to={tab.to} key={key}
            className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all duration-200 ${location.pathname === tab.to
              ? 'bg-[#4A85F6] text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {tab.label}
          </Link>
        })}

      </div>

      <Outlet />
    </div>
  )
}