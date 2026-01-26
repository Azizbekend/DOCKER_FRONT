import { EquipmentLogEntry, EventLogEntry } from "./type";

const now = new Date();
const todayISO = now.toISOString();

// Пример данных ЗА СЕГОДНЯ (чтобы видеть отображение)
export const equipmentLog: EquipmentLogEntry[] = [
    {
        id: 1,
        indicates: "Вкл",
        plcNodeId: "PLC-001",
        timestamp: todayISO,
        details: "Автоматический запуск по расписанию"
    },
    {
        id: 2,
        indicates: "Выкл",
        plcNodeId: "PLC-001",
        timestamp: new Date(now.getTime() - 30 * 60000).toISOString(), // 30 минут назад
        details: "Ручное отключение оператором"

    },
    {
        id: 3,
        indicates: "Вкл",
        plcNodeId: "PLC-002",
        timestamp: new Date(now.getTime() - 60 * 60000).toISOString(), // 1 час назад
        details: "Запуск после техобслуживания"

    }
];

export const eventLogData: EventLogEntry[] = [
    {
        id: 1,
        description: "Сработал датчик давления",
        timestamp: todayISO,

    },
    {
        id: 2,
        description: "Оборудование успешно перезагружено",
        timestamp: new Date(now.getTime() - 15 * 60000).toISOString(), // 15 минут назад

    },
    {
        id: 3,
        description: "Проверка связи с ПЛК",
        timestamp: new Date(now.getTime() - 45 * 60000).toISOString(), // 45 минут назад

    }
];



// Функция для получения классов статуса оборудования
export const getIndicateClass = (indicates: string) => {
    switch (indicates) {
        case 'Вкл':
            return {
                badge: 'bg-green-100 text-green-800',
                border: 'border border-green-200'
            };
        case 'Выкл':
            return {
                badge: 'bg-red-100 text-red-800',
                border: 'border border-red-200'
            };
        default:
            return {
                badge: 'bg-gray-100 text-gray-800',
                border: 'border border-gray-200'
            };
    }
};


export const dateFilterBtns: {
    label: string,
    value: string
}[] = [
        {
            label: "Сегодня",
            value: "day",
        },
        {
            label: "Вчера",
            value: "yesterday",
        },
        {
            label: "Неделя",
            value: "week",
        },
        {
            label: "Месяц",
            value: "month",
        },
        {
            label: "Другое",
            value: "custom",
        },
    ]


export const svodStatistics: {
    label: string,
    value: string
}[] = [
        {
            label: "Включений",
            value: "8",
        },
        {
            label: "Выключений",
            value: "8",
        },
        {
            label: "Средняя работа",
            value: "2 ч 45 мин",
        },
        {
            label: "Время в работе",
            value: "91.7%",
        },
        {
            label: "Кол-во критичных аварий",
            value: "50",
        },
        {
            label: "Кол-во важных аварий",
            value: "50",
        },
        {
            label: "Кол-во заявок",
            value: "50",
        },
    ]