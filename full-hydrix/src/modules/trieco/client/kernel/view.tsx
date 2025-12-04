import { Outlet } from "react-router-dom"
import { observer } from "mobx-react-lite";

export const ClientView = observer(() => {
    return (
        <div className="h-screen w-screen overflow-hidden">
            {
                <Outlet/>
            }
        </div>
    )
})