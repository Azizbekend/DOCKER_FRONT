export function getDate(date: Date | string | number | any, type: 'full' | 'year' | 'short' = 'full'): string {

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        return 'Некорректная дата';
    }

    switch (type) {
        case 'full':
            return dateObj.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(/\//g, '.');

        case 'year':
            return dateObj.toLocaleDateString('ru-RU', {
                year: 'numeric'
            });

        case 'short':
            return dateObj.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '.');

        default:
            return dateObj.toLocaleDateString('ru-RU').replace(/\//g, '.');
    }
}