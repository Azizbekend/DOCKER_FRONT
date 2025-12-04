import { Outlet } from "react-router-dom"
import { observer } from "mobx-react-lite";

export const MobileView = observer(() => {
    return (
        <div className="h-dvh w-dvw relative">
            <Outlet />
        </div>
    )
})