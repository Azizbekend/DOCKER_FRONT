import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useLayoutEffect } from "react";
import { Meta } from "@/app/cores/core-trieco/network/meta";
import { observer } from "mobx-react-lite";
import { Header } from "./header";
import mobileModel from "../kernel/model/mobile-model";
import { Navbar } from "./navbar";
import headerStore from "../kernel/helper/header-store";

export const MobileLayout = observer(() => {

    const navigate = useNavigate();
    const userToken = window.localStorage.getItem('refresh-token');
    const { meta, init } = mobileModel;

    useLayoutEffect(() => {

        if (userToken === null) {
            navigate("/auth")
            return;
        }

        init();
    }, [])

    return (
        <>
            {
                meta === Meta.SUCCESS &&
                <div className="w-full h-full flex flex-col">
                    <Header />
                    <div className={`flex flex-grow ${!headerStore.onBackButtonClick && "pb-28"}`}>
                        <Outlet />
                    </div>
                    {!headerStore.onBackButtonClick && <Navbar />}
                </div>
            }

        </>
    )
})