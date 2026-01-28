import { hardwaresEvents, hardwaresLogs } from "@/packages/entities/hardware/api";
import { HardwareEventsDataType, StartEndDates } from "@/packages/entities/hardware/type";
import { sortHardwareEventsLogs } from "@/packages/functions/sort-hardware-events-logs";
import { makeAutoObservable } from "mobx";

class LogsModel {
    evengLog: HardwareEventsDataType[] = [];
    loader: boolean = false;
    hardwareId: number = 0;


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    init(hardwareId: number, dateData: StartEndDates) {
        this.hardwareId = hardwareId;
        evengLog: [] = [];
        this.getEvents(dateData)
    }

    async getEvents({ start, end }: StartEndDates) {
        const startDate = start instanceof Date ? start : new Date(start);
        const endDate = end instanceof Date ? end : new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Некорректные даты:', { start, end });
            throw new Error('Переданы некорректные даты');
        }


        try {
            const [hardwaresEventsRes, hardwaresLogsRes] = await Promise.all([
                hardwaresEvents({
                    hadrwareId: this.hardwareId,
                    start: startDate,
                    end: endDate,
                }),
                hardwaresLogs({
                    hadrwareId: this.hardwareId,
                    start: startDate,
                    end: endDate,
                })
            ]);


            this.evengLog = sortHardwareEventsLogs([...hardwaresEventsRes.data, ...hardwaresLogsRes.data])
        } catch (error) {
            console.log(error)
        }
    }
}

export const logsModel = new LogsModel();