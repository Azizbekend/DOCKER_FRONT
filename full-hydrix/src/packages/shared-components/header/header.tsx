import { Icon } from "@/packages/shared-ui/icon";
import { observer } from "mobx-react-lite";
import { useAuth } from "@/packages/entities/user/context";
import logo from "../../../app/static/img/logo.png";
import illyas from "./assets/iilyas.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/packages/shared-ui/button/button";
import { useState, useEffect, useRef } from "react";

// Тип уведомления
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

export const Header = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Состояние уведомлений
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Новая заявка",
      message: "Поступила заявка на обслуживание оборудования",
      time: "2 часа назад",
      type: "info",
      read: false
    },
    {
      id: 2,
      title: "Авария",
      message: "Насосная станция №3 перешла в аварийный режим",
      time: "5 часов назад",
      type: "error",
      read: false
    },
    {
      id: 3,
      title: "Заявка выполнена",
      message: "Заявка №1245 успешно завершена",
      time: "Вчера",
      type: "success",
      read: true
    }
  ]);
  
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Получение цвета для типа уведомления
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  // Получение иконки для типа уведомления
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check-circle';
      case 'warning': return 'alert-triangle';
      case 'error': return 'x-circle';
      default: return 'info';
    }
  };

  return (
    <div className="flex relative max-w-full bg-white py-4 px-4 sm:py-6 sm:px-6 md:px-10 items-center border-solid border-gray-200 border-b shadow-sm">
      {/* Логотип */}
      <div
        className="cursor-pointer flex items-center gap-2 sm:gap-3 md:gap-4 xl:gap-[22px] h-fit min-w-fit"
        onClick={() => navigate("/menu-moduls")}
      >
        <img
          src={logo}
          alt="Логотип"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
        <span className="font-bold text-xs sm:text-sm md:text-base xl:text-[20px] max-w-[80px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-none truncate">
          ИАС “Цифровой Водоканал”
        </span>
      </div>

      {/* Правая панель */}
      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-6">
        {/* Ассистент Ильяс */}
        {location.pathname.includes('/dispatcher') && (
          <Link
            to="/dispatcher/helper"
            className="hidden md:hidden lg:flex items-center gap-4 hover:opacity-90 duration-200 cursor-pointer bg-[#4A85F6] text-white px-4 py-2 rounded-lg h-[60px] text-xs font-medium"
          >
            <div className="text-left leading-tight">
              <div>Задай вопрос</div>
              <div>Ильяс — на связи!</div>
            </div>
            <img src={illyas} alt="Ильяс" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          </Link>
        )}

        {/* Уведомления */}
        <div className="relative" ref={notificationsRef}>
          <button 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            title="Уведомления"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Icon systemName="notification" className="w-5 h-5 text-gray-700" />
            {notifications.some(n => !n.read) && (
              <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Выпадающее окно уведомлений */}
          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
              {/* Заголовок */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Уведомления</h3>
              </div>

              {/* Список уведомлений */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-l-4 ${getNotificationColor(notification.type)} hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'success' ? 'bg-green-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <Icon 
                            systemName={getNotificationIcon(notification.type)} 
                            className={`w-4 h-4 ${
                              notification.type === 'success' ? 'text-green-600' :
                              notification.type === 'warning' ? 'text-yellow-600' :
                              notification.type === 'error' ? 'text-red-600' : 'text-blue-600'
                            }`} 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-600 text-xs mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Icon systemName="bell" className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Нет новых уведомлений</p>
                  </div>
                )}
              </div>

              {/* Кнопка "Показать все" */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <Link 
                    to="/notifications" 
                    className="w-full text-center text-[#4A85F6] font-medium text-sm hover:text-[#3a6bc9] transition-colors duration-200"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    Показать все уведомления
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Профиль пользователя */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-px bg-gray-300" />
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <Button
            onClick={logout}
            class="w-8 h-8 sm:w-10 sm:h-10 !rounded-full p-0"
            styleColor="blue"
          >
            <Icon systemName="exit" width={18} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
});
