import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar";
import { Header } from "@/shared/components/header/header";

export const Layout = () => {
    return (
        <div className="bg-[#F5F5F5] flex flex-col min-h-screen w-full">
            <Header />
            <div className="w-full flex flex-row h-full flex-grow">
                <Sidebar />
                <div className="min-w-0 flex flex-col min-h-full flex-grow">
                    <div className="mt-12 ml-10 pr-[40px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}