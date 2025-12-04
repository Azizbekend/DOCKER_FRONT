import logo from './logo.svg'

import { SidebarItem } from './sidebar-item'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import adminModel from '../kernel/model/admin-model'
import { useAuth } from '@/entities/user/context'

export const Sidebar = observer(() => {
    let location = useLocation();
    const { logout } = useAuth()

    return (
        <div className="pt-10 pl-8 pr-3 bg-white min-h-screen w-min w-full flex flex-col gap-14">
            <div className='flex items-center gap-[22px]'>
                <img src={logo} />
            </div>
            <div className='flex gap-8 flex-col'>


            <SidebarItem link='/trieco/admin/' icon='sewer-car' isActive={location.pathname === "/trieco/admin/"} hoverText="Список ассенизаторов" />
                <SidebarItem link='/trieco/admin/orders' icon='client-clipboard' isActive={location.pathname === '/trieco/admin/orders'} hoverText='Управление заявками' />
                {/* <SidebarItem link='/trieco/admin/statistics' icon='arrows-clockwise' title='Управление сменами' isActive={location.pathname === '/trieco/admin/shifts'}/> */}
                < SidebarItem link='/trieco/admin/calendar' icon='calendar' isActive={location.pathname === '/trieco/admin/calendar'} hoverText='График' />
                <SidebarItem link='/trieco/admin/statistics' icon='graph' isActive={location.pathname === '/trieco/admin/statistics'} hoverText='Статистика' />
                <SidebarItem link='/trieco/admin/cash' icon='card' isActive={location.pathname === '/trieco/admin/cash'} hoverText='Счет' />
            </div>
            <div className='flex gap-8 flex-col mt-3'>
                <SidebarItem link='/trieco/admin/settings' icon='cog' isActive={location.pathname === '/trieco/admin/settings'} hoverText='Настройки' />
                {/* <SidebarItem link='/admin/sewers' icon='help-circle' title='Помощь' isActive={location.pathname === '/admin/help'}/> */}
                <div onClick={logout}><SidebarItem link='/trieco/admin/sewers' icon='exit-client' hoverText='Выйти' /></div>
            </div>
        </div>
    )
})