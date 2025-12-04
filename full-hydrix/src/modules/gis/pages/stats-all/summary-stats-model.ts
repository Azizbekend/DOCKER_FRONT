import { makeAutoObservable } from "mobx";
import { getSummaryOrdersPlantStat, getSummaryOrdersSewersStat, getSummaryPlantTariffStat, getSummaryRecycleByCompanyStat } from "../../loyauts/api/stats-service";

export class SummaryStatsModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    recycleCompanyStat: any = [];
    plantTariffStat: any = [];
    ordersSewersStat: any = [];
    plantOrdersStat: any = [];

    isInit: boolean = false;

    async getStats(waterCompanyId: number) {
        this.recycleCompanyStat = [];
        this.plantTariffStat = [];

        await getSummaryRecycleByCompanyStat({ WaterCompanyId: waterCompanyId }).then(x => {
            this.recycleCompanyStat = x.data
        })

        await getSummaryPlantTariffStat({ WaterCompanyId: waterCompanyId }).then(x => {
            this.plantTariffStat = x.data
        })

        await getSummaryOrdersSewersStat({ WaterCompanyId: waterCompanyId }).then(x => {
            this.ordersSewersStat = x.data
        })

        await getSummaryOrdersPlantStat({ WaterCompanyId: waterCompanyId }).then(x => {
            this.plantOrdersStat = x.data
        })

        this.isInit = true;
    }
}

const summaryStatsModel = new SummaryStatsModel();
export default summaryStatsModel;