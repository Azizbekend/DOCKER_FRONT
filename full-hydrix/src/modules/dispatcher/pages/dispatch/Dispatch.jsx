import { NavLink, Outlet, useParams } from "react-router-dom";
import TableList from "./Contents/TableList";

export default function Dispatch() {

    const { about } = useParams();

    const links = [
        { name: 'passport', label: 'Паспорт объекта' },
        { name: 'scheme', label: 'Мнемосхема' },
        { name: 'tim_model', label: 'ТИМ-модель' },
        { name: 'equipment_registry', label: 'Реестр оборудования' },
        { name: 'request_registry', label: 'Реестр заявок' },
    ];

    return (
        <>
            <div className="accout__dispatch dispatch-accout">
                <div className="dispatch-accout__top">
                    {about && links.map(link => (
                        <NavLink to={link.name} className={({ isActive }) => isActive ? 'dispatch-accout__item  _active' : 'dispatch-accout__item '}>{link.label}</NavLink>
                    ))}
                </div>

                <div className="dispatch-accout__content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}