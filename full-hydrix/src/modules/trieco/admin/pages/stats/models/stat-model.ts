import { Meta } from "@/app/api/meta";
import { getAvgPriceStat, getExported, getTransportIncome } from "@/app/cores/core-trieco/network/stats/stats";
import { makeAutoObservable } from "mobx";

export class StatModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    avgPriceStat: any = [];
    exportedStat: any = [];
    transportIncomeStat: any = [];
    meta: Meta = Meta.LOADING;

    async getStat(companyId: number) {
        const avgPriceResponse = await getAvgPriceStat({ CompanyId: companyId });
        this.avgPriceStat = avgPriceResponse.data;

        const exportedResponse = await getExported({ CompanyId: companyId })
        this.exportedStat = exportedResponse.data;

        const transportIncomeResponse = await getTransportIncome({ CompanyId: companyId });
        this.transportIncomeStat = transportIncomeResponse.data;

        this.meta = Meta.SUCCESS
    }
}

const statModel = new StatModel();
export default statModel;