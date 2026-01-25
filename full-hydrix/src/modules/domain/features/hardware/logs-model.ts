import { hardwaresEvents } from "@/packages/entities/hardware/api";
import { HardwareEventsDataType, StartEndDates } from "@/packages/entities/hardware/type";
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

        await hardwaresEvents({
            hadrwareId: this.hardwareId,
            start: startDate,
            end: endDate,
        }).then((res) => {
            this.evengLog = res.data
        })
    }
}

export const logsModel = new LogsModel();