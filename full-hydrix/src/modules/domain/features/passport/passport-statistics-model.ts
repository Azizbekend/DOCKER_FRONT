import { getTechSpecsStatisticsByPeriod } from '@/packages/entities/object/api';
import { getTimeRanges } from '@/packages/functions/get-time-ranges';
import { makeAutoObservable } from 'mobx';
import { staticData } from './data';


class PassportStatisticsModel {

    model: any[] = []
    isLoader: boolean = false
    nodePlcId: string[] = []
    statisticsPanelShow: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    async getData(data: any[]): Promise<any[]> {
        for await (const nodeId of this.nodePlcId) {
            // const dataRes = await getTechSpecsStatisticsByPeriod({
            //     plcNodeId: nodeId,
            //     startTime: start,
            //     endTime: end,
            // })
            // console.log(dataRes.data)
        }

        // 1. Группируем данные по дате
        const groupedByDate = new Map<string, number>();

        data.forEach(item => {
            // Извлекаем дату из timestamp (YYYY-MM-DD)
            const date = item.timeStamp.split('T')[0];

            // Преобразуем indicates в число
            const value = parseInt(item.indicates, 10);

            if (!isNaN(value)) {
                // Суммируем значения для каждой даты
                if (groupedByDate.has(date)) {
                    groupedByDate.set(date, groupedByDate.get(date)! + value);
                } else {
                    groupedByDate.set(date, value);
                }
            }
        });

        // 2. Преобразуем Map в массив объектов и сортируем по дате (по возрастанию)
        const sortedDates = Array.from(groupedByDate.entries())
            .map(([date, sum]) => ({ date, sum }))
            .sort((a, b) => a.date.localeCompare(b.date));

        // 3. Вычисляем разницу с предыдущим днем
        const results: DailyResult[] = [];

        sortedDates.forEach((day, index) => {
            if (index === 0) {
                // Для первой даты разницы нет (null или можно оставить сумму)
                results.push({
                    date: day.date,
                    sum: day.sum,
                    difference: null // или day.sum если считать от 0
                });
            } else {
                // Для последующих дней: сумма текущего дня минус сумма предыдущего дня
                const previousDaySum = sortedDates[index - 1].sum;
                const difference = day.sum - previousDaySum;

                results.push({
                    date: day.date,
                    sum: day.sum,
                    difference: difference
                });
            }
        });

        console.log(results)

        return results;
    }


    init({ nodeId }: { nodeId: string[] }) {

        this.nodePlcId = nodeId
        const { todayRange } = getTimeRanges()
        // this.getData(todayRange)
        this.getData(staticData)
    }
}

export const passportStatisticsModel = new PassportStatisticsModel()