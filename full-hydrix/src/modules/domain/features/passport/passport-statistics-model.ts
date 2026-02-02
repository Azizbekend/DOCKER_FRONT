import { getTechSpecsStatisticsByPeriod } from '@/packages/entities/object/api';
import { getTimeRanges } from '@/packages/functions/get-data/get-time-ranges';
import { makeAutoObservable } from 'mobx';
import { staticDataWater, staticDataElectro } from './data';
class PassportStatisticsModel {

    model: any[] = []
    isLoader: boolean = false
    nodePlcId: string[] = []
    type: string = ""

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    async getData({ start, end }: { start: Date, end: Date }) {

        this.isLoader = true

        try {

            // const promises = this.nodePlcId.map(async (nodeId) => {
            //     try {
            //         const dataRes = await getTechSpecsStatisticsByPeriod({
            //             plcNodeId: nodeId,
            //             startTime: start,
            //             endTime: end,
            //         });
            //         return dataRes?.data || [];
            //     } catch (error) {
            //         console.error(`Ошибка для nodeId ${nodeId}:`, error);
            //         return [];
            //     }
            // });

            // const allResults = await Promise.all(promises);

            // // Объединяем все данные в один массив
            // const allData = allResults.flat();


            // 1. Группируем данные по дате
            const groupedByDate = new Map<string, number>();

            let staticData = this.nodePlcId[0].includes("_pwr_total") ? staticDataElectro : staticDataWater
            this.type = this.nodePlcId[0].includes("_pwr_total") ? "electro" : "water"

            staticData.forEach(item => {
                // Извлекаем дату из timestamp (YYYY-MM-DD)
                const date = item.timeStamp.split('T')[0];

                // Преобразуем indicates в число
                const value = parseFloat(item.indicates);


                if (!isNaN(value)) {
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
                    results.push({
                        date: day.date,
                        sum: day.sum,
                    });
                } else {
                    // Для последующих дней: сумма текущего дня минус сумма предыдущего дня
                    // const previousDaySum = sortedDates[index - 1].sum;

                    results.push({
                        date: day.date,
                        sum: day.sum,
                    });
                }
            });

            console.log(results)
            this.model = results

        } catch (error) {
            console.log(error)
        } finally {
            this.isLoader = false
        }
    }


    init({ nodeId }: { nodeId: string[] }) {

        this.nodePlcId = nodeId
        const { todayRange } = getTimeRanges()
        this.getData(todayRange)
    }
}

export const passportStatisticsModel = new PassportStatisticsModel()