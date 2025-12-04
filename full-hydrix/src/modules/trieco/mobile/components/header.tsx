import { useLocation } from "react-router-dom"
import mobileModel from "../kernel/model/mobile-model";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { observer } from "mobx-react-lite";
import headerStore from "../kernel/helper/header-store";
import { useEffect, useState } from "react";


export const Header = observer(() => {
    const location = useLocation();
    const { user } = mobileModel;

    // @ts-ignore
    const header = Headers[location.pathname]

    const handleBackButtonClick = () => {
        if (headerStore.onBackButtonClick) {
            headerStore.executeBackButtonClick();
        }
    };

    const [sizeHeader, setSizeHeader] = useState(false);

    useEffect(() => {
        const smallHeaderTitles = ["/", "/orders", "/notification", "/profile"];
        setSizeHeader(smallHeaderTitles.includes(location.pathname));
    }, [header]);

    return (
        <div className="flex z-10 relative items-center max-w-full py-3 px-5 mt-5">
            {headerStore.onBackButtonClick && <div>
                <Icon systemName="back" className="mr-6 rotate-180" width={16} height={15} onClick={handleBackButtonClick} />
            </div>}
            <div>
                {/* {location.pathname === "/" && <p>Приветствуем вас, {user?.firstName}</p>} */}
                <p className={`text-[${sizeHeader ? 22 : 16}px] font-bold`}>{headerStore.title || header}</p>
            </div>
        </div>
    )
})

// eslint-disable-next-line react-refresh/only-export-components
export const Headers = {
    '/': "Главная",
    '/order/create': "Создание заявки",
    '/orders': "Заявки",
    "/profile": "Профиль",
    "/notification": "Уведомления",
}