import { hardwaresEvents, hardwaresLogs } from "@/packages/entities/hardware/api";
import { HardwareEventsDataType, StartEndDates } from "@/packages/entities/hardware/type";
import { sortHardwareEventsLogs } from "@/packages/functions/sort-data/sort-hardware-events-logs";
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

        let eventsData = [];
        let logsData = [];

        try {
            const hardwaresEventsRes = await hardwaresEvents({
                hadrwareId: this.hardwareId,
                start: startDate,
                end: endDate,
            });
            eventsData = hardwaresEventsRes.data;
        } catch (error) {
            console.error('Ошибка загрузки events:', error);
        }

        try {
            const hardwaresLogsRes = await hardwaresLogs({
                hadrwareId: this.hardwareId,
                start: startDate,
                end: endDate,
            });
            logsData = hardwaresLogsRes.data;
        } catch (error) {
            console.error('Ошибка загрузки logs:', error);
        }

        this.evengLog = sortHardwareEventsLogs([...eventsData, ...logsData]);
    }
}

export const logsModel = new LogsModel();