import { Icon } from "@/packages/shared-ui/icon";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";

import logo from "../../../app/static/img/logo.png";
import illyas from "./assets/iilyas.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/packages/shared-ui/button/button";

export const Header = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <div className="flex relative max-w-full bg-white py-4 px-4 sm:py-6 sm:px-6 md:px-10 items-center border-solid border-[#D6D6D6] border-b-[0.5px] shadow-sm">
            <div
                className="cursor-pointer flex items-center gap-2 sm:gap-3 md:gap-4 xl:gap-[22px] h-fit min-w-fit"
                onClick={() => navigate("/menu-moduls")}
            >
                <img
                    src={logo}
                    alt="Логотип"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
                <span className="font-bold text-xs sm:text-sm md:text-base xl:text-[20px] max-w-[80px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-none truncate">
                    ИАС “Цифровой Водоканал”
                </span>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-6">
                {location.pathname.includes('/dispatcher') && (
                    <Link
                        to="/dispatcher/helper"
                        className="hidden md:hidden lg:flex items-center gap-4 hover:opacity-90 duration-200 cursor-pointer bg-[var(--clr-accent)] text-white px-4 py-2 rounded-[12px] h-[60px] text-xs"
                    >
                        <div className="text-left leading-tight">
                            <div>Задай вопрос</div>
                            <div>Ильяс — на связи!</div>
                        </div>
                        <img src={illyas} alt="Ильяс" />
                    </Link>
                )}

                <button className="relative p-2 hover:bg-gray-100 rounded-full transition" title="Уведомления">
                    <Icon systemName="bell" className="w-5 h-5 text-gray-700" />
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-8 w-px bg-[#C2C2C2]" />
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <Button
                        onClick={logout}
                        class="w-8 h-8 sm:w-10 sm:h-10 !rounded-full p-0"
                        styleColor="blue"
                    >
                        <Icon systemName="exit" width={18} className="sm:w-5 sm:h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
});
