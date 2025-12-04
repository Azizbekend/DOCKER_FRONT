import { useLocation, useNavigate } from "react-router-dom";
import { NavbarItem } from "./navbar-item";
import { Button } from "@/app/cores/core-trieco/UIKit";

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();



    return (
        <div className="max-h-28 fixed bottom-0 bg-white flex justify-between items-center w-full px-5 pb-3 pt-2 shadow-[0px_12px_40px_-4px_rgba(188_196_207_0.25)] z-50">
            {/* Левая часть навигации */}
            <div className="flex items-center justify-between w-full">
                <NavbarItem isActive={location.pathname === "/"} link="/" title="Главная" icon="home" />
                <NavbarItem isActive={location.pathname === "/orders"} link="/orders" title="Заявки" icon="clipboard" />
            </div>

            {/* Центральный вырез для кнопки */}
            <div className="relative flex-1 mx-2 -top-10">
                <Button class="h-16 w-16 !rounded-full bg-[#2879E4]" onClick={() => navigate('/order/create')}>
                    <div className="w-full h-full flex items-center justify-center text-white text-[32px]">
                        +
                    </div>
                </Button>
            </div>

            {/* Правая часть навигации */}
            <div className="flex items-center justify-between w-full gap-3">
                <NavbarItem isActive={location.pathname === "/notification"} link="/notification" title="Уведомления" icon="notification" />
                <NavbarItem isActive={location.pathname === "/profile"} link="/profile" title="Профиль" icon="profile" />
            </div>
        </div>
    );
}

export const Headers = {
    '/': "Главная",
    '/order/create': "Создание заявки",
    '/orders': "Заявки",
    "/profile": "Профиль",
    "/notification": "Уведомления"

}