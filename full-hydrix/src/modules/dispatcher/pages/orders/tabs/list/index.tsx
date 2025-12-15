import { statistics } from "../../data/data";
import { Icon } from "@/shared/ui/icon";
import { TtemsRequestRegistryType } from "../../type/type";

export const RequestRegistryList = () => {
  const itemsRequestRegistry: TtemsRequestRegistryType[] = [
    {
      name: "Насос усреднителя №1",
      id: "REQ-001",
      texts: [
        "Замена подшипников и уплотнений",
        "Создано: 2025-10-01 | Плановая дата: 2025-10-15 | Исполнитель: Иванов И.И. | Стоимость: 25 000 ₽",
        "Запчасти: Подшипник 6208, Уплотнение торцевое"
      ],
      status: [
        { name: "В работе", color: "blue" },
        { name: "Средний", color: "yellow" },
      ],
      time: "4/8 ч",
      progress: 50,
    },
    {
      name: "Насос усреднителя №2",
      id: "REQ-003",
      texts: [
        "Плановая калибровка датчика",
        "Создано: 2025-10-01 | Плановая дата: 2025-10-01 | Исполнитель: Сидоров С.С. | Стоимость: 3 000 ₽"
      ],
      status: [
        { name: "Завершено", color: "green" },
        { name: "Низкий", color: "green-light" },
      ],
      time: "2/2 ч",
      progress: 100,
    },

    
    // ... остальные элементы аналогично
  ];

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'green-light': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <div 
      className="informations-dispatch__requestregistry requestregistry-dispatch bg-white rounded-2xl p-7 mb-8"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Реестр заявок</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statistics.map((item, index) => (
          <div 
            key={index} 
            className={`${item.color} statistic-item rounded-xl p-5`}
          >
            <div className="text-sm mb-1">{item.name}</div>
            <div className="text-xl font-bold ">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Список заявок */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Список заявок</h2>

        <div className="space-y-5">
          {itemsRequestRegistry.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl p-5 bg-white hover:bg-blue-50 transition-colors"
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                      <div className="text-sm text-gray-600 mt-1 font-mono">{item.id}</div>
                    </div>
                    <button 
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#4A85F6] transition-colors"
                      aria-label="Редактировать заявку"
                    >
                      <Icon systemName="edit" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    {item.texts.map((text, idx) => (
                      <p key={idx} className="leading-relaxed">{text}</p>
                    ))}
                  </div>
                </div>
              </div>         

              {/* Нижняя панель: статусы и прогресс */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {item.status.map((stat, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(stat.color)}`}
                    >
                      {stat.name}
                    </span>
                  ))}
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">{item.time}</div>
                  <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-[#4A85F6] rounded-full" 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>



  );
};
