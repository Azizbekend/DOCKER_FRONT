import { Icon } from "@/shared/ui/icon";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/entities/user/context";

import logo from "../../../app/static/img/logo.png"
import illyas from "./assets/iilyas.png"
import { Link, useLocation } from "react-router-dom";
import { getRoleText } from "@/entities/user/hooks";

export const Header = observer(() => {

    const location = useLocation();
    const { user, isAuthenticated } = useAuth();


    return (
        <div className="flex relative max-w-full bg-white py-6 pr-14 pl-10 items-center border-solid border-[#D6D6D6] border-b-[0.5px]">
            <div className='flex items-center gap-[22px] h-fit min-w-fit'>
                <img src={logo} alt="" />
                <span className='text-[20px] font-bold flex'>ИАС “Цифровой Водоканал”</span>
            </div>
            <div className="flex flex-row gap-6 w-full justify-end">

                {
                    location.pathname.includes('/dispatcher') &&
                    <Link to={"/dispatcher/helper"} className="flex items-center justify-center gap-6 hover:opacity-50 duration-300 cursor-pointer bg-[var(--clr-accent)] text-white p-[3px_10px_0_20px] rounded-[12px]">
                        <div className="text-[12px] font-medium">
                            <div>Задай вопрос</div>
                            <div>Ильяс — на связи!</div>
                        </div>
                        <div>
                            <img src={illyas} alt="" />
                        </div>
                    </Link>
                }

                <div className="flex items-center justify-center">
                    <Icon systemName="bell" />
                </div>
                <div className="flex flex-row">
                    <div className="h-full w-[1px] bg-[#C2C2C2]" />
                    <div className="bg-[#C2C2C2] rounded-full w-[45px] h-[45px] ml-6" />
                    {user &&
                        <div className="flex h-full flex-col justify-center items-start ml-4">
                            <span className="font-semibold text-[16px]">{user?.lastName + " " + user?.firstName}</span>
                            <span className="text-[12px]">{getRoleText(user?.roleId)}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
})