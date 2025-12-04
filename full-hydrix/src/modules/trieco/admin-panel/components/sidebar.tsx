import logo from './logo.svg'
import { SidebarItem } from './sidebar-item'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import AdminPanelModel from '../kernel/model/admin-panel-model'

export const Sidebar = observer(() => {
    let location = useLocation();
    const { logout } = AdminPanelModel;

    return (
        <div>
            <div className="pt-10 pl-8 pr-3 bg-white w-min w-full h-full flex flex-col gap-14 pb-11">
                <div className='flex items-center gap-[22px]'>
                    <img src={logo} />
                </div>
                <div className='flex gap-8 flex-col'>
                    <SidebarItem link='/trieco/admin-panel/' icon='sewers' isActive={location.pathname === "/trieco/admin-panel/"} hoverText="Список пользователей" />
                    <SidebarItem link='/trieco/admin-panel/sewers' icon='sewer-car' isActive={location.pathname === "/trieco/admin-panel/sewers"} hoverText="Список ассенизаторов" />
                    <SidebarItem link='/trieco/admin-panel/companies' icon='water-company' isActive={location.pathname === "/trieco/admin-panel/companies"} hoverText="Список предприятий" />
                </div>
                <div className='flex gap-8 flex-col mt-3'>
                    <div onClick={logout}><SidebarItem link='/admin/sewers' icon='exit-client' hoverText='Выйти' /></div>
                </div>
            </div>
        </div>
    )
})