export const eventLog = [

    {
        timestamp: "08.12.2025 12:34",
        action: "Отключение",

        status: "warning",
        description: "Аварийное отключение из-за превышения давления"
    },
    {
        timestamp: "05.12.2025 12:36",
        action: "Запуск",

        status: "success",
        description: "Ручной запуск после устранения неисправности"
    },
    {
        timestamp: "05.12.2025 12:10",
        action: "ТО1",

        status: "info",
        description: "Плановое техническое обслуживание (уровень 1)"
    },
    {
        timestamp: "01.12.2025 09:22",
        action: "Изменение параметра",

        status: "neutral",
        description: "Установлен расход 150 м³/ч"
    }
];


export const tabsList: { to: string, name: string }[] = [
    {
        to: "passport",
        name: "Паспорт"
    },
    // {
    //     to: "controll",
    //     name: "Управление"
    // },
    {
        to: "service",
        name: "Сервис"
    },
    {
        to: "events",
        name: "События"
    },
    // {
    //     to: "logs",
    //     name: "Логи"
    // },
]