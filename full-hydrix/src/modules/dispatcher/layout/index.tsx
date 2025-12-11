import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "@/shared/components/header/header";
import { Icon } from '@/shared/ui/icon';

export const Layout = () => {
    return (
        <>
            <div className="bg-[#F5F5F5] flex flex-col min-h-screen w-full">
                <Header />

                <div className='flex items-center  gap-[28px] my-[30px] pl-[40px] pr-[40px]'>
                    <Link
                    to="/domain/list"
                    className="flex items-center justify-center w-10 h-10 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
                >
                    <Icon systemName="arrow-left" className="text-white" />
                </Link>
                    <div>
          <h1 className="font-bold text-gray-800 text-4xl">Диспетчеризация ЖКХ</h1>
          <div className="w-28 h-1 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
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