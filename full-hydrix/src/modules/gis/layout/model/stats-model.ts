import { makeAutoObservable } from "mobx";
import { getExportSummaryStats, getExportTransportingStats, getExportUtilizationStats } from "../../api/stats-service";

export class StatsModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    downloadProgress: number = 0;

    getExportSummaryStats(waterCompanyId: number) {
        getExportSummaryStats({ WaterCompanyId: waterCompanyId }).then(x => {
            const blob = new Blob([x.data], { type: x.headers['content-type'] });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'summary.xlsx';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    }

    getExportUtilizationStats(waterCompanyId: number) {
        getExportUtilizationStats({ WaterCompanyId: waterCompanyId }).then(x => {
            const blob = new Blob([x.data], { type: x.headers['content-type'] });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'utilization.xlsx';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    }

    getExportTransportingStats(waterCompanyId: number) {
        getExportTransportingStats({ WaterCompanyId: waterCompanyId }).then(x => {
            const blob = new Blob([x.data], { type: x.headers['content-type'] });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'transporting.xlsx';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    }
}

const statsModel = new StatsModel();
export default statsModel;