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
