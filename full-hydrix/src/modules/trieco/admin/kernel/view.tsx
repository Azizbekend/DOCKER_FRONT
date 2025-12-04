import { Outlet, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const AdminView = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {


        // ============
        // Прверка роли
        // ============


        // const userToken = window.localStorage.getItem('refresh-token');
        // console.log(userToken)
        // if (!userToken) {
        //     navigate("/admin/auth")
        //     return;
        // }
    }, [])


    return (
        <div className="w-full h-auto">
            <Outlet />
        </div>
    )
})