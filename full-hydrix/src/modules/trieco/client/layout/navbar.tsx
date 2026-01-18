import { useLocation, useNavigate } from "react-router-dom";
import { NavbarItem } from "./navbar-item";
import notificationModel from "./notifications/model/notification-model";
import { NotificationList } from "./notifications/notification";
import { Roles } from "./utils/getRoles";
import { Icon } from "@/packages/shared-ui/icon";
import { useAuth } from "@/packages/entities/user/context";
import { observer } from "mobx-react-lite";

export const Navbar = observer(() => {
  const { setShow, unreadCount } = notificationModel;
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getUserInitials = () => {
    if (!user) return '--';
    if (user.roleId === 5) {
      return user.firstName?.charAt(0).toUpperCase() || '--';
    }
    return (user.lastName?.charAt(0) + user.firstName?.charAt(0))?.toUpperCase() || '--';
  };

  return (
    <div 
      className="flex items-center justify-between w-full h-14 px-6 border-gray-200"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Левая часть: Навигация */}
      <div className="flex items-center gap-8">
        {/* Логотип (опционально) */}
        {/* <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Логотип" className="h-6" />
          <span className="font-bold text-gray-800">ТриЭко</span>
        </div> */}

        {/* Навигационные пункты */}
        <div className="flex items-center gap-6">
          <NavbarItem 
            isActive={location.pathname === "/trieco/client/"} 
            link="/trieco/client/" 
            title="Главная" 
            icon="home" 
          />
          <NavbarItem 
            isActive={location.pathname === "/trieco/client/orders"} 
            link="/trieco/client/orders" 
            title="Заявки" 
            icon="clipboard-link" 
          />
        </div>
      </div>

      {/* Правая часть: Уведомления и профиль */}
      <div className="flex items-center gap-4">
        {/* Уведомления */}
        <div className="relative">
          <button
            aria-label="Открыть уведомления"
            className="relative p-2 text-gray-600 hover:text-[#4A85F6] transition-colors"
            onClick={() => setShow(true)}
          >
            <Icon systemName="bell" className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationList />
        </div>

        {/* Разделитель */}
        <div className="w-px h-6 bg-gray-300" />

        {/* Профиль пользователя */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('profile')}
          aria-label="Перейти в профиль"
        >
          <div className="w-10 h-10 rounded-full bg-[#4A85F6] flex items-center justify-center text-white font-semibold group-hover:bg-[#3a6bc9] transition-colors">
            {getUserInitials()}
          </div>
          
          <div className="flex flex-col items-start">
            <span className="font-semibold text-gray-800 text-sm">
              {user?.roleId === 5 
                ? user.firstName 
                : `${user?.lastName} ${user?.firstName?.charAt(0)}.`
              }
            </span>
            <span className="text-xs text-gray-600">
              {Roles[user?.roleId] || 'Пользователь'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export const Headers = {
  '/': "Главная",
  '/order/create': "Создание заявки",
  '/orders': "Заявки",
  "/profile": "Профиль"
};
