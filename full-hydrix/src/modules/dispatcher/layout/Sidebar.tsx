import { Icon } from '@/packages/shared-ui/icon';
import { SidebarItem } from '../../../packages/shared-components/container-blocks/sidebar-item'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/packages/entities/user/context';
import { getDostup, isAdmin } from '@/packages/entities/user/utils';


export const Sidebar = observer(() => {
    const { logout } = useAuth();

    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isFullPanel, setIsFullPanel] = useState<boolean>(false);

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

    const userDD = getDostup()


    return (
        <div ref={sidebarRef}
            className={"pt-5 pl-8 pr-6 bg-white min-h-full flex-shrink-0 gap-10 flex flex-col rounded-r-0 rounded-r-lg "}
        >
            <div className={`flex flex-col justify-between transition-all duration-300 sticky top-10 ${isSticky ? 'h-[95vh] pb-7' : 'h-[85vh] pb-7 '}`}>
                <div className='flex gap-4 flex-col w-full'>
                    {/* 
                    <div>
                        <div className={`flex relative rounded-md items-center cursor-pointer`} >
                            <div className='flex flex-row gap-4 w-full py-2 px-3 2xl:py-3 2xl:px-5 items-center'>
                                <button onClick={() => setIsFullPanel(!isFullPanel)} className='w-[32px] h-[32px] bg-gray-300 rounded-sm'>
                                    <Icon systemName={"arrow-down"} width={24} height={24} />
                                </button>
                                <Link to={"/dispatcher"} className={`text-[13px] w-fit 2xl:text-[16px] tracking-[0.5px] text-[#757575] font-bold`}>Очистные сооружения в с. Шапши</Link>
                            </div>
                        </div>
                    </div> */}


                    <SidebarItem link={`/dispatcher`} icon='scheme' title='Мнемосхемы' isActive={location.pathname == ('/dispatcher')} />
                    <SidebarItem link={`/dispatcher/timmodel`} icon='cube' title='3D модель' isActive={location.pathname.includes('/dispatcher/timmodel')} />
                    <SidebarItem link={`/dispatcher/video-surveillance`} icon='video-surveillance' title='Видеонаблюдение' isActive={location.pathname.includes('/dispatcher/video-surveillance')} />
                    <SidebarItem link={`/dispatcher/hardware`} icon='wrench' title='Оборудование' isActive={location.pathname.includes('/dispatcher/hardware')} />
                    {(userDD.isCommandsEnabled || isAdmin()) &&
                        <SidebarItem link={`/dispatcher/services`} icon='clipboard' title='Заявки' isActive={location.pathname.includes('/dispatcher/services')} />
                    }
                    {(!userDD.isCommandsEnabled || isAdmin()) &&
                        <SidebarItem link={`/dispatcher/stages`} icon='clipboard' title='Задачи' isActive={location.pathname.includes('/dispatcher/stages')} />
                    }

                    <SidebarItem link={`/dispatcher/incident`} icon='incident' title='Аварии' isActive={location.pathname.includes('/dispatcher/incident')} />
                </div>
                <div>
                    {false && <SidebarItem link='/gis/sewers' icon='cog' title='Настройки' isActive={location.pathname === '/gis/settings'} />}
                    {false && <SidebarItem link='/gis/sewers' icon='help-circle' title='Помощь' isActive={location.pathname === '/gis/help'} />}
                    <SidebarItem link='/exit' icon='exit-client' title='Выйти' onClick={logout} />
                </div>
            </div>
        </div>
    )
});