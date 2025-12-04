import { Outlet } from 'react-router-dom';
import logo from './static/img/logo.svg'
import bg from './static/img/gis-bg.png'

export const Layout = () => {
    return (
        <>
            <div className='w-full absolute bottom-0 -z-10 '>
                <img src={bg} alt="" className='w-full max-h-[20.833vm] h-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]' />
            </div>
            <div className="flex w-full min-h-screen z-10 flex items-center justify-center">
                <div className="max-w-[33.698vw] max-h-[24.375vm] w-full h-full pb-[8rem] ml-24">
                    <div className="auth-logo-wrapper flex flex-col gap-1 items-center  ">
                        <img className='h-auto max-w-full' src={logo} />
                        <span className='font-extrabold text-[20px]'>ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»</span>
                    </div>
                </div>


                <div className="max-w-[50vw] w-full min-h-full bg-gradient-to-r flex justify-center flex-col px-[52px]">
                    <div className='flex justify-center items-center max-w-full h-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};
