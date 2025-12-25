import { observer } from "mobx-react-lite";
import { Icon } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/button";
import orderModel from "../model/order-model";
import { format } from "date-fns";
import orderListModel from "../model/order-list-model";
import { OrderStatus, StatusColor, OrderStatusText } from "@/app/cores/core-trieco/lib/order";
import { ru } from "date-fns/locale";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  setShow: (value: boolean) => void;
};

export const OrderModal = observer(({ isOpen, setShow }: Props) => {
  const { order } = orderModel;
  const [cancelReason, setCancelReason] = useState("");

  if (!order) return null;

  const status = (order.orderStatusId ?? OrderStatus.Cancelled) as OrderStatus;
  const statusColor = StatusColor(status);
  const statusText = OrderStatusText[status];

  // Форматирование даты с обработкой ошибок
  const formatDate = (dateString: string | null, formatStr: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), formatStr, { locale: ru });
    } catch {
      return '-';
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'visible' : 'invisible'
      }`}
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Оверлей */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Модальное окно */}
      <div 
        className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Заголовок */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 
            id="modal-title"
            className="text-xl font-bold text-gray-800"
          >
            {orderModel.isCancel ? "Подробная информация о заявке" : "Причина отмены заявки"}
          </h2>
        </div>

        {/* Основной контент */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderModel.isCancel ? (
            /* Подробная информация */
            <div className="space-y-6">
              {/* Заголовок заявки */}
              <div className="flex items-start gap-4">
                {order.selfCreated && (
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon systemName="ambulance" className="text-blue-600 w-5 h-5" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Заявка на вывоз ЖБО</h3>
                  <p className="text-gray-600 mt-1 text-sm">{order.adress}</p>
                </div>
              </div>

              {/* Статус */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium">Статус заявки</span>
                <span 
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: statusColor }}
                >
                  {statusText}
                </span>
              </div>

              {/* Детали */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: "Номер заявки", value: order.id.toString() },
                  { label: "Код", value: order.code || '-' },
                  { label: "Объём", value: `${order.wasteVolume} куб. м` },
                  { 
                    label: "Дата подачи", 
                    value: formatDate(order.timeOfPublication, 'dd.MM.yyyy HH:mm') 
                  },
                  { 
                    label: "Дата вывоза", 
                    value: formatDate(order.arrivalStartDate, 'dd.MM.yyyy') 
                  },
                  { 
                    label: "Время вывоза", 
                    value: order.arrivalStartDate && order.arrivalEndDate 
                      ? `${formatDate(order.arrivalStartDate, 'HH:mm')}–${formatDate(order.arrivalEndDate, 'HH:mm')}`
                      : '-'
                  },
                  { 
                    label: "Контактное лицо", 
                    value: `${order.userLastName || ''} ${order.userFirstName || ''} ${order.userPatronymic || ''}`.trim() || '-' 
                  },
                  { label: "Телефон", value: order.userPhone || '-' },
                  { label: "Адрес", value: order.adress || '-' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.label}</span>
                    <span className="text-gray-800 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Форма отмены */
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  Пожалуйста, укажите причину отмены заявки. Это поможет нам улучшить качество предоставляемых услуг.
                </p>
              </div>
              
              <div>
                <label htmlFor="cancel-reason" className="block text-sm font-medium text-gray-700 mb-2 ">
                  Причина отмены
                </label>
                <textarea
                  id="cancel-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Опишите причину отмены..."
                  className="w-full min-h-[120px] p-3  border border-gray-500 rounded-lg  bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-vertical  "
                />
              </div>
            </div>
          )}
        </div>

        {/* Футер с кнопками */}
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-3">
          {orderModel.isCancel ? (
            /* Кнопки для подробной информации */
            order.orderStatusId !== OrderStatus.Cancelled ? (
              <Button
                onClick={() => orderModel.setIsCancel()}
                class="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors min-w-[140px]"
              >
                Отменить заявку
              </Button>
            ) : (
              <span className="px-5 py-2.5 bg-red-100 text-red-800 font-medium rounded-lg min-w-[140px] text-center">
                Отменено
              </span>
            )
          ) : (
            /* Кнопки для формы отмены */
            <>
              <Button
                onClick={() => orderModel.setIsCancel()}
                class="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors min-w-[100px]"
              >
                Назад
              </Button>
              <Button
                onClick={() => {
                  // Здесь можно отправить cancelReason на сервер
                  orderModel.cancelOrder((id) => orderListModel.changeOrderStatus(id, OrderStatus.Cancelled));
                  setShow(false);
                  orderModel.setIsCancel();
                }}
                disabled={!cancelReason.trim()}
                class="px-5 py-2.5 bg-[#4A85F6] hover:bg-[#3a6bc9] text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Подтвердить отмену
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});