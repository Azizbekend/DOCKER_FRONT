export const getStatusColor = (status: 'New' | 'Completed' | 'Canceled') => {
    let data = { color: '', text: '' };

    switch (status) {
        case 'New':
            data = { color: 'bg-blue-100 text-blue-800', text: "Новый" };
            break;
        case 'Completed':
            data = { color: 'bg-green-100 text-green-800', text: "Завершен" };
            break;
        case 'Canceled':
            data = { color: 'bg-yellow-100 text-yellow-800', text: "Отменен" };
            break;
        default:
            data = { color: 'bg-gray-100 text-gray-700', text: "Неизвестно" };
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${data.color}`}>
            {data.text}
        </span>
    );
};

export const getRequestTypeColor = (type: 'Общая' | "Общий" | 'Поставочная' | 'Аварийная' | "InitialSupply" | "Incident" | "Поставочная заявка") => {
    let data = { color: '', text: '' };

    switch (type) {
        case 'Общая':
            data = { color: 'bg-blue-600 text-white', text: "Общий" };
            break;
        case 'Общий':
            data = { color: 'bg-blue-600 text-white', text: "Общий" };
            break;
        case 'Поставочная':
            data = { color: 'bg-yellow-500 text-white', text: type };
            break;
        case 'InitialSupply':
            data = { color: 'bg-yellow-500 text-white', text: "Поставочная" };
            break;
        case 'Поставочная заявка':
            data = { color: 'bg-yellow-500 text-white', text: "Поставочная" };
            break;
        case 'Аварийная':
            data = { color: 'bg-red-600 text-white', text: type };
            break;
        case 'Incident':
            data = { color: 'bg-red-600 text-white', text: "Аварийная" };
            break;
        default:
            data = { color: 'bg-gray-800 text-white', text: type };
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${data.color}`}>
            {data.text}
        </span>
    );
};




export const txtLastStageRequest = (status: 'New' | 'Completed' | 'Canceled') => {
    return status === 'New' ? 'Текущий этап' : 'Последний этап';
};
