import { Outlet } from 'react-router-dom';
import logo from './static/img/logo-3.png';
import { useEffect } from 'react';

export const Layout = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes dropletAnimation {
        0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
        50% { transform: translate(0, -20px) scale(1.2); opacity: 0.6; }
        100% { transform: translate(0, -40px) scale(0.8); opacity: 0; }
      }
      .animate-droplet {
        animation: dropletAnimation 1.2s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    const createDroplet = (x, y) => {
      const droplet = document.createElement('div');
      droplet.className = "pointer-events-none fixed w-3 h-3 bg-white/50 rounded-full animate-droplet z-[9999] shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]";
      droplet.style.left = (x - 6) + "px";
      droplet.style.top = (y - 6) + "px";
      document.body.appendChild(droplet);
      setTimeout(() => droplet.remove(), 1200);
    };

    let dropletTimeout = null;
    const handleMouseMove = (e) => {
      if (!dropletTimeout) {
        dropletTimeout = setTimeout(() => { dropletTimeout = null; }, 80);
        createDroplet(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      style.remove();
    };
  }, []);
  
  return (
    <>
      {/* Water-themed background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#4A85F6] via-[#3a6bc9] to-[#2a52a0] overflow-hidden z-0">
        {/* Existing water elements */}
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
            <div className="relative z-10 mb-8 max-w-2xl">
              <p className="text-white/95 text-lg leading-relaxed px-4">
                Комплексная интеллектуальная система управления, объединяющая в единый цифровой контур все процессы водоснабжения и водоотведения для обеспечения их надежности, управляемости и экономической эффективности.
              </p>
            </div>

            {/* Регистрация в Реестре ПО — красиво и официально */}
            <div className="relative z-10 p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-w-lg">
  <div className="flex items-start gap-3">

    {/* Текст */}
    <div>
      <p className="text-white/90 text-sm leading-relaxed mb-2">
        Программное обеспечение зарегистрировано в Реестре российского ПО&nbsp;
        
        <a 
          href="https://reestr.digital.gov.ru/reestr/4154545/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:underline"
        >
          №2024686777
        </a>
        &nbsp;от 12.11.2024
        
      </p>
      
      <div className="space-y-1.5">
        
        
        <p className="text-white/80 text-xs">
          <a 
            href="https://reestr.digital.gov.ru/request/4048188/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Запись от 01.10.2025 №342655
          </a>
        </p>
      </div>
    </div>
  </div>
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

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-sm border-t border-white/20 text-white/80 text-sm">
        <div className="flex items-center justify-between w-full px-6 py-3">
          <div className="text-left">
            <a 
              href="https://elseti-rt.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors duration-200"
            >
              © Государственное унитарное предприятие Республики Татарстан «Электрические сети»
            </a>
          </div>
          <div className="text-center font-medium">
            <a 
              href="https://smkhydrig.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors duration-200"
            >
              Разработано: ООО "СМК-ГИДРИКС"
            </a>
          </div>
          <div className="text-right">
            <a 
              href="/privacy-policy" 
              className="hover:text-white hover:underline transition-colors duration-200"
            >
              Политика обработки персональных данных
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
