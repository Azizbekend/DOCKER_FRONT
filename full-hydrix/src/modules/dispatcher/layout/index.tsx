import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "@/shared/components/header/header";
import { Icon } from '@/shared/ui/icon';

export const Layout = () => {
    return (
        <>
            <div className="bg-[#F5F5F5] flex flex-col min-h-screen w-full">
                <Header />

                <div className='flex items-center  gap-[28px] my-[30px] pl-[40px] pr-[40px]'>
                    <Link to={"/menu-moduls"} className='bg-[var(--clr-accent)] rounded px-3 py-2 hover:opacity-50 cursor-pointer duration-300'>
                        <Icon systemName="arrow-left" />
                    </Link>
                    <span className='font-bold text-[#222B45] text-[34px]'>Диспетчеризация ЖКХ</span>
                </div>

                <div className="w-full flex flex-row h-full flex-grow">
                    <Sidebar />
                    <div className="min-w-0 flex flex-col min-h-full flex-grow">
                        <div className=" ml-5 pr-[40px] h-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 