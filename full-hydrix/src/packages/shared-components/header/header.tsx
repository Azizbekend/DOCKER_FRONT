import { Icon } from "@/packages/shared-ui/icon";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";

import logo from "../../../app/static/img/logo.png"
import illyas from "./assets/iilyas.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/packages/shared-ui/button/button";
import { getRoleText } from "@/packages/entities/user/utils";

export const Header = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();


    return (
        <div className="flex relative max-w-full bg-white py-6 pr-14 pl-10 items-center border-solid border-[#D6D6D6] border-b-[0.5px]">
            <div className='cursor-pointer flex items-center lg:gap-[22px] gap-[12px] h-fit min-w-fit' onClick={() => navigate("/menu-moduls")}>
                <img src={logo} alt="" className="lg:w-auto lg:h-auto h-[30px] w-[30px] " />
                <span className='font-bold flex lg:text-[20px] text-[12px] max-w-[150px] lg:max-w-none'>ИАС “Цифровой Водоканал”</span>
            </div>
            <div className="flex flex-row lg:gap-6 gap-3 w-full justify-end">

                {location.pathname.includes('/dispatcher') &&
                    <Link to={"/dispatcher/helper"} className=" hidden lg:flex items-center justify-center gap-6 hover:opacity-50 duration-300 cursor-pointer bg-[var(--clr-accent)] text-white p-[3px_10px_0_20px] rounded-[12px]">
                        <div className="text-[12px] font-medium">
                            <div>Задай вопрос</div>
                            <div>Ильяс — на связи!</div>
                        </div>
                        <div>
                            <img src={illyas} alt="" />
                        </div>
                    </Link>
                }

                {/* Уведомления */}
            <button 
              title="Уведомления"
            >
              <Icon systemName="bell" className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

                <div className="flex flex-row items-center gap-4">
                    <div className="h-full w-[1px] bg-[#C2C2C2]" />
                   
                    {/* Аватар */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold shadow-sm">
                {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
                    {user && false &&
                        <div className="flex h-full flex-col justify-center items-start ml-4">
                            <span className="font-semibold text-[16px]">{user?.lastName + " " + user?.firstName}</span>
                            <span className="text-[12px]">{getRoleText(user?.roleId)}</span>
                        </div>
                    }

                    <Button onClick={logout} class="w-[40px] h-[40px] !rounded-full" styleColor="blue">
                        <Icon systemName="exit" width={25} />
                    </Button>
                </div>

            
            </div>
        </div>
    )
})