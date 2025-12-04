import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { useLayoutEffect } from "react";
import AdminPanelModel from "../kernel/model/admin-panel-model";
import { Meta } from "@/app/cores/core-trieco/network/meta";
import { observer } from "mobx-react-lite";

export const AdminPanelLayout = observer(() => {
    const navigate = useNavigate();
    const { meta, init } = AdminPanelModel;
    const userToken = window.localStorage.getItem('refresh-token');

    useLayoutEffect(() => {
        // if (userToken === null) {
        //     navigate("admin-panel/auth")
        //     return;
        // }
        init();
    }, [])


    return (
        <div className="bg-[#F5F5F5] flex min-h-screen">
            <Sidebar />
            <div className="w-full pt-8 pr-12 pl-7 flex flex-col overflow-hidden">
                <Navbar />
                {
                    meta === Meta.SUCCESS && <Outlet />
                }
            </div>
        </div>
    )
})