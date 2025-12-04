import { Link, Outlet, useLocation } from "react-router-dom"
import { TtemsRequestRegistryType } from "./type/type"


export const RequestRegistry = () => {

    let location = useLocation();


    return (
        <>
            <div className="informations-dispatch__requestregistry relative mt-10">
                <div className="absolute  top-[-38px] left-[30px] flex gap-3">
                    <Link to="/dispatcher/orders" className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${location.pathname == "/dispatcher/orders" ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}>
                        Заявки
                    </Link>
                    <Link to="/dispatcher/orders/create/form" className={`hover:bg-[var(--clr-accent)] hover:text-white duration-300 cursor-pointer px-[15px] pt-[7px] pb-[6px] rounded-tl-lg rounded-tr-lg font-semibold  ${location.pathname.includes("/dispatcher/orders/create/") ? "bg-[var(--clr-accent)] text-white" : "bg-[#E6E9EF] text-[#757575]"}`}>
                        Создание заявки
                    </Link>
                </div>

                <Outlet />
            </div>
        </>
    )
}