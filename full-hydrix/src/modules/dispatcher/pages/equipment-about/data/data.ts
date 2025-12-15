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