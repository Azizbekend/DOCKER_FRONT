import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Icon } from '@/packages/shared-ui/icon';
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@/packages/shared-ui/button/button";
import { Header } from "@/packages/shared-components/header/header";

export const Layout = observer(() => {


    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <>
            <div className="bg-[#F5F5F5] flex flex-col min-h-screen w-full">
                 
                
                <Header />

                <div className='flex items-center  gap-[28px] my-[30px] lg:pl-[40px] lg:pr-[40px] pr-[20px] pl-[20px] '>

                    
                    <Link
                        to="/domain/list"
                        className="flex items-center justify-center lg:w-10 lg:h-10 w-8 h-8 bg-[#4A85F6] rounded-lg hover:bg-[#3a6bc9] transition-colors"
                    >
                        <Icon systemName="arrow-left" className="text-white" />
                    </Link>

                    <div>
                        <h1 className="font-bold text-gray-800 text-xl lg:text-4xl">Диспетчеризация ЖКХ</h1>
                    </div>
                </div>

                <div className="w-full lg:flex-row flex-col flex h-full flex-grow md">
                    <Sidebar />
                    <div className="min-w-0 flex flex-col min-h-full flex-grow">
                        <div className="mx-4 ls:ml-5 ls:pr-[40px] h-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})