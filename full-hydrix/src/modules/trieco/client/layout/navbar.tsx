import { useLocation, useNavigate } from "react-router-dom"
import { NavbarItem } from "./navbar-item";
import clientModel from "../kernel/model/client-model";
import notificationModel from "./notifications/model/notification-model";
import { NotificationList } from "./notifications/notification";
import { Roles } from "./utils/getRoles";
import { Icon } from "@/shared/ui/icon";
import { useAuth } from "@/entities/user/context";

export const Navbar = () => {
    const { setShow } = notificationModel;
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    // @ts-ignore
    const header = Headers[location.pathname]
    return (
        <div className="flex relative max-w-full h-[51px]">
            <div className="w-full">
                {location.pathname === "/" && <span className="text-[24px] text-[#575757]">Приветствуем Вас!<br /></span>}
                <span className="text-[34px] font-semibold">{header}</span>
            </div>
            <div className="flex flex-row gap-6 w-full justify-end">
                <div className="flex flex-row items-center justify-center gap-9 mr-7">
                    <NavbarItem isActive={location.pathname === "/trieco/client/"} link="/trieco/client/" title="Главная" icon="home" />
                    <NavbarItem isActive={location.pathname === "/trieco/client/orders"} link="/trieco/client/orders" title="Заявки" icon="clipboard" />
                </div>
                <div className="flex items-center justify-center relative">
                    <Icon systemName="bell" className="cursor-pointer" onClick={() => setShow(true)} />
                    <NotificationList />
                </div>
                <div className="h-full w-[2px] bg-[#C2C2C2]" />
                <div className="flex flex-row gap-4 items-center cursor-pointer" onClick={() => navigate('profile')}>
                    <div className="bg-[#C2C2C2] rounded-full w-[45px] h-[45px]" />
                    <div className="flex h-full flex-col justify-center items-start">
                        {
                            user?.roleId === 5 ? <span className="font-semibold text-[16px]">{user.firstName}</span> : <span className="font-semibold text-[16px]">{user?.lastName} {user?.firstName[0]}.</span>
                        }
                        <span className="text-[12px]">{Roles[user?.roleId]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Headers = {
    '/': "Главная",
    '/order/create': "Создание заявки",
    '/orders': "Заявки",
    "/profile": "Профиль"
}