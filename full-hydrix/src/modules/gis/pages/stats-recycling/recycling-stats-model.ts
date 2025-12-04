import { makeAutoObservable } from "mobx";
import { getRecycleAllStat, getRecycleCompaniesStat, getTariffChanges } from "../../api/stats-service";

export class RecyclingStatsModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    recycleAllStat: any = []
    recycleCompaniesStat: any = [];
    tariffChanges: any = [];

    isInit: boolean = false


    async getStats(waterCompanyId: number) {
        this.recycleAllStat = [];
        this.recycleCompaniesStat = []
        this.tariffChanges = [];

        await getRecycleAllStat({ WaterCompanyId: waterCompanyId }).then(x => {
            this.recycleAllStat = x.data;
        })

        await getRecycleCompaniesStat({ WaterCompanyId: waterCompanyId }).then(x => {
            this.recycleCompaniesStat = x.data;
        })

        await getTariffChanges({ WaterCompanyId: waterCompanyId }).then(x => {
            this.tariffChanges = x.data;
        })

        this.isInit = true;
    }
}

const recyclingStatsModel = new RecyclingStatsModel();
export default recyclingStatsModel;