export const getTimeRanges = () => {
    const now = new Date();

    // 1. Текущий день с 00:00 до текущего момента
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayRange = {
        start: todayStart,
        end: now
    };

    // 2. Вчера с 00:00 до 00:00
    const yesterdayStart = new Date(now);
    yesterdayStart.setDate(now.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setDate(yesterdayStart.getDate() + 1);
    const yesterdayRange = {
        start: yesterdayStart,
        end: yesterdayEnd
    };

    // 3. Неделя (-7 дней от текущей даты)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekRange = {
        start: weekStart,
        end: now
    };

    // 4. Месяц (-30 дней от текущей даты)
    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 30);
    monthStart.setHours(0, 0, 0, 0);
    const monthRange = {
        start: monthStart,
        end: now
    };

    return { todayRange, yesterdayRange, weekRange, monthRange };
};