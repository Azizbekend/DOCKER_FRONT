import { Header } from "@/shared/components/header/header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="bg-[#F5F5F5] flex flex-col min-h-screen w-full">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
}