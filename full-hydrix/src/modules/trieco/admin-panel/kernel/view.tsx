import { Outlet } from "react-router-dom"
import { observer } from "mobx-react-lite";

export const AdminPanelView = observer(() => {
    return (
        <div className="h-screen w-screen overflow-auto">
            {
                <Outlet />
            }
        </div>
    )
})