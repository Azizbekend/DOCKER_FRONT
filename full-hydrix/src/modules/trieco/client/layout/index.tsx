import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./sidebar"
// import { Navbar } from "./navbar"
// import { useLayoutEffect } from "react";
// import clientModel from "../kernel/model/client-model";
// import { Meta } from "@/app/cores/core-trieco/network/meta";
import { observer } from "mobx-react-lite";
import { Navbar } from "./navbar";

export const ClientLayout = observer(() => {

    // const navigate = useNavigate();
    // const userToken = window.localStorage.getItem('refresh-token');
    // const { meta, init } = clientModel;

    // useLayoutEffect(() => {
    //     if (userToken === null) {
    //         navigate("/auth")
    //         return;
    //     }

    //     init();
    // }, [])


    return (
        <>
            {
                // meta === Meta.SUCCESS &&
                <div className="w-scree h-screen flex flex-row">
                    <Sidebar />
                    <div className="w-full pt-10 pr-12 pl-7 f-full overflow-auto pb-5">
                        <Navbar />
                        <Outlet />
                    </div>
                </div>
            }

        </>
    )
})