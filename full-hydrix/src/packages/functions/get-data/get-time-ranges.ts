export const getTimeRanges = () => {
    const now = new Date();

    // 1. Текущий день: с 00:00 до текущего момента
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayRange = {
        start: todayStart,
        end: now
    };

    console.log(todayRange)


    // 2. Вчера: с 00:00 до 23:59:59:999
    const yesterdayStart = new Date(now);
    yesterdayStart.setDate(now.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const yesterdayRange = {
        start: yesterdayStart,
        end: yesterdayEnd
    };

    // 3. Последние 7 дней: с 00:00 семью днями ранее до текущего момента
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    // weekStart.setDate(now.getDate() - 7);
    const weekRange = {
        start: weekStart,
        end: now
    };

    // 4. Последние 30 дней: с 00:00 тридцать дней назад до текущего момента
    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 29);
    monthStart.setHours(0, 0, 0, 0);
    const monthRange = {
        start: monthStart,
        end: now
    };

    return { todayRange, yesterdayRange, weekRange, monthRange };
};
