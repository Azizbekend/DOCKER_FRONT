import { getTechSpecsStatisticsByPeriod } from '@/packages/entities/object/api';
import { getTimeRanges } from '@/packages/functions/get-time-ranges';
import { makeAutoObservable } from 'mobx';


class PassportStatisticsModel {

    model: any[] = []
    isLoader: boolean = false
    nodePlcId: string = ""
    statisticsPanelShow: boolean = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    async getData({ start, end }: { start: Date, end: Date }) {
        await getTechSpecsStatisticsByPeriod({
            plcNodeId: this.nodePlcId,
            startTime: start,
            endTime: end,
        })
    }

    

    init({ nodeId }: { nodeId: string, start: Date, end: Date }) {
        this.nodePlcId = nodeId

        const { todayRange } = getTimeRanges()


        this.getData(todayRange)
    }
}

export const passportStatisticsModel = new PassportStatisticsModel()