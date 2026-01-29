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

    async getData({ start, end }: { start: Date, end: Date }) {

        this.model.push(...staticData)
        console.log(this.model)

        for await (const nodeId of this.nodePlcId) {
            // const dataRes = await getTechSpecsStatisticsByPeriod({
            //     plcNodeId: nodeId,
            //     startTime: start,
            //     endTime: end,
            // })
            // console.log(dataRes.data)
        }

    }



    init({ nodeId }: { nodeId: string[] }) {

        this.nodePlcId = nodeId
        const { todayRange } = getTimeRanges()
        this.getData(todayRange)
    }
}

export const passportStatisticsModel = new PassportStatisticsModel()