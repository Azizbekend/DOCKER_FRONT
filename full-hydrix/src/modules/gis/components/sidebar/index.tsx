import { useAuth } from '@/packages/entities/user/context';
import { SidebarItem } from '../../../../packages/shared/components/sidebar-item'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Role } from '@/packages/entities/user/enums';


export const Sidebar = observer(() => {
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    const { logout, waterCompany, user } = useAuth();

    // Функция для расширения сайдбара при прокрутке
    useEffect(() => {
        const handleScroll = () => {
            if (!sidebarRef.current) return;

            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const isTopReached = sidebarRect.top - 50 <= 0;

            setIsSticky(isTopReached);
        };

        window.addEventListener('scroll', handleScroll);

        // Вызываем сразу для установки начального состояния
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            ref={sidebarRef}
            className="pt-10 pl-8 pr-6 bg-white min-h-full w-[245px] 2xl:w-[290px] flex-shrink-0 gap-10 flex flex-col rounded-r-lg"
        >
            <div className={`flex flex-col justify-between transition-all duration-300 sticky top-10 ${isSticky ? 'h-[95vh] pb-0' : 'h-[85vh] pb-5 '}`}>
                <div className='flex gap-4 flex-col w-full'>
                    {user?.roleId == 6 &&
                        <SidebarItem link='/gis/companies' icon='water-company' title='Водоканалы' isActive={location.pathname === "/gis/companies" || location.pathname === "/gis/company/56"} />
                    }

                    {(user?.roleId === Role.WaterCompany || user?.roleId === Role.Guest) &&
                        <SidebarItem link={`/gis/company/${waterCompany?.id}`} icon='water-company' title='Водоканал' isActive={location.pathname.includes('/gis/company/')} />
                    }

                    <SidebarItem link='/gis/sewers' icon='sewer-car' title='Ассенизаторы' isActive={location.pathname === '/gis/sewers'} />
                    <SidebarItem link='/gis/orders' icon='arrows-clockwise' title='Заявки' isActive={location.pathname === '/gis/orders'} />

                    {(user?.roleId === Role.WaterCompany || user?.roleId === Role.Guest) &&
                        <SidebarItem link='/gis/drain-stations' icon='drain-stations' title='Сливные станции' isActive={location.pathname === '/gis/drain-stations'} />
                    }

                    {(user?.roleId === Role.WaterCompany || user?.roleId === Role.Guest) &&
                        <SidebarItem link='/gis/operators' icon='operators' title='Операторы' isActive={location.pathname === '/gis/operators'} />
                    }

                    {false && <SidebarItem link='/gis/accident' icon='graph' title='Ликвидация аварий' isActive={location.pathname === '/gis/accident'} />}

                    <SidebarItem link='/gis/enterprises' icon='clipboard' title='Предприятия' isActive={location.pathname === '/gis/enterprises'} />
                </div>
                <div>
                    {false && location.pathname.includes("gis") && <SidebarItem link='/gis/settings' icon='cog' title='Настройки' isActive={location.pathname === '/gis/settings'} />}
                    {false && location.pathname.includes("gis") && <SidebarItem link='/gis/sewers' icon='help-circle' title='Помощь' isActive={location.pathname === '/gis/help'} />}
                    {location.pathname.includes("gis") && <SidebarItem link='/exit' icon='exit-client' title='Выйти' onClick={logout} />}
                </div>
            </div>

        </div >
    )
})