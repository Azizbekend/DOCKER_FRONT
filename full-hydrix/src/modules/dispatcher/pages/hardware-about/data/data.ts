// Расширенные данные для журнала событий (можно заменить на реальные)
export const eventLog = [
    {
        timestamp: "08.12.2025 12:34",
        action: "Отключение",
        initiator: "Система защиты",
        status: "warning",
        description: "Аварийное отключение из-за превышения давления"
    },
    {
        timestamp: "05.12.2025 12:36",
        action: "Запуск",
        initiator: "Оператор Иванов И.И.",
        status: "success",
        description: "Ручной запуск после устранения неисправности"
    },
    {
        timestamp: "05.12.2025 12:10",
        action: "ТО1",
        initiator: "Служба техобслуживания",
        status: "info",
        description: "Плановое техническое обслуживание (уровень 1)"
    },
    {
        timestamp: "01.12.2025 09:22",
        action: "Изменение параметра",
        initiator: "Диспетчер Сидоров А.В.",
        status: "neutral",
        description: "Установлен расход 150 м³/ч"
    }
];



export const getStatusClass = (status) => {
    switch (status) {
        case 'warning': return 'text-red-700 bg-red-100';
        case 'success': return 'text-green-700 bg-green-100';
        case 'info': return 'text-blue-700 bg-blue-100';
        default: return 'text-gray-700 bg-gray-100';
    }
};
