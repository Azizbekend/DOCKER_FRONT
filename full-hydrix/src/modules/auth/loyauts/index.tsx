import { Outlet } from 'react-router-dom';
import logo from './static/img/logo-3.png'

export const Layout = () => {
  return (
    <>
      {/* Solid background with water elements - matching left panel gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#4A85F6] via-[#3a6bc9] to-[#2a52a0] overflow-hidden z-0">
        {/* Water droplet elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-20 w-20 h-20 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-32 w-16 h-16 bg-white/20 rounded-full blur-md animate-pulse delay-1500"></div>


        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-3/4 w-20 h-20 bg-white/12 rounded-full blur-xl animate-bounce delay-300"></div>
        <div className="absolute top-2/3 right-1/3 w-12 h-12 bg-white/20 rounded-full blur-md animate-bounce delay-500"></div>


        <div className="absolute top-1/3 left-1/3 w-36 h-36 border-2 border-white/20 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 border-2 border-white/20 rounded-full opacity-30 animate-ping delay-1000"></div>
        <div className="absolute top-2/3 left-2/3 w-24 h-24 border-2 border-white/20 rounded-full opacity-30 animate-ping delay-500"></div>
      </div>

      <div
        className="flex w-full min-h-screen z-10 relative"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {/* Left engaging section */}
        <div className="w-[48%] min-h-screen bg-gradient-to-b from-[#4A85F6] via-[#3a6bc9] to-[#2a52a0] relative overflow-hidden flex flex-col">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 left-20 w-20 h-20 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
            <div className="absolute bottom-1/3 right-32 w-16 h-16 bg-white/20 rounded-full blur-md animate-pulse delay-1500"></div>
          </div>

          {/* Centered content */}
          <div className="flex flex-col items-center justify-center text-center relative z-10 flex-1 px-12">
            {/* Logo and main title */}
            <div className="flex flex-col items-center gap-6 mb-8 max-w-2xl">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/30 transform hover:scale-105 transition-transform duration-300">
                <img className='h-16 w-auto' src={logo} alt="Логотип" />
              </div>
              <h1 className='font-bold text-white text-3xl md:text-4xl leading-tight'>
                ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»
              </h1>
            </div>

            {/* Main description */}
            <div className="relative z-10 mb-12 max-w-2xl">
              <p className="text-white/95 text-lg leading-relaxed px-4">
                Комплексное решение для управления жидкими бытовыми отходами, по интеграции инженерных систем и очистных сооружений и оперативного реагирования на аварийные ситуации.
              </p>
            </div>
          </div>
        </div>

        {/* Right content section */}
        <div className="max-w-[52vw] w-full min-h-full flex justify-center flex-col px-[52px] relative">
          <div className='flex justify-center items-center max-w-full h-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
