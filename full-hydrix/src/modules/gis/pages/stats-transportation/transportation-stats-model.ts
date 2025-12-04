import { makeAutoObservable } from "mobx";
import { getAvgPrice, getExportedVolume, getExportProfit} from "../../loyauts/api/stats-service";

export class TransportationStatsModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    exportVolumeStat: any = [];
    exportProfitStat: any = [];
    avgOrderPrice: any = [];

    isInit: boolean = false;

    async getStats(waterCompanyId: number) {
        this.exportVolumeStat = [];

        await getExportedVolume({ WaterCompanyId: waterCompanyId }).then(x => {
            this.exportVolumeStat = x.data
        })

        await getExportProfit({ WaterCompanyId: waterCompanyId }).then(x => {
            this.exportProfitStat = x.data
        })

        await getAvgPrice({ WaterCompanyId: waterCompanyId }).then(x => {
            this.avgOrderPrice = x.data
        })

        this.isInit = true;
    }
}

const transportationStatsModel = new TransportationStatsModel();
export default transportationStatsModel;