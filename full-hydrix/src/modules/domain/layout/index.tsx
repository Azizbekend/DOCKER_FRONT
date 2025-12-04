import { Header } from '@/shared/components/header/header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            <div className="bg-[#F5F5F5] flex flex-col min-h-screen w-full">
                <Header />
                <div className="mt-12 pl-[40px] pr-[40px] overflow-hidden flex-1 h-full w-full">
                    <Outlet />
                </div>
            </div >

        </>
    );
};