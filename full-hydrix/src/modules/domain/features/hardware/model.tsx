import { getDocuments } from "@/packages/entities/documents/api";
import { DocumentsType } from "@/packages/entities/documents/type";
import { getInfoHardware, hardwaresEvents, hardwaresLogs, statusHardwaresCheck } from "@/packages/entities/hardware/api";
import { checkedServiceApi, getCharacteristicAll, getCommandActive, getCommandAll, getCommandAllInfo, getCommandDeactive, getInfoNodeInfoAllCheck, getInfoNodeInfos, getServiceApi, getServiceHistoryRecordsAllApi, getServiceHistoryRecordsAllOrderedApi, getTodayServiceApi } from "@/packages/entities/hardware/api-general";
import { HardwareEventsDataType, HardwareInterface, StartEndDates } from "@/packages/entities/hardware/type";
import { sortHardwareEventsLogs } from "@/packages/functions/sort-data/sort-hardware-events-logs";
import { ControlType, ServiceHistoryDataApiType, ServiceHistoryType, ServiceModelType, ServiceStatisticType } from "@/packages/shared/libs/hardware-form/components/control/type";
import { Characteristic } from "@/packages/shared/libs/hardware-form/components/documents/type";

import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class HardwareModel {

    model: HardwareInterface = {
        id: 0,
        fileId: 0,
        name: "",
        model: "",
        category: "",
        developerName: "",
        supplierName: "",
        photoName: "",
        position: "",
        opcDescription: "",
        controlBlockId: 0,
    };

    isLoading: boolean = false;
    isActiveCommand: boolean = false;
    isLoaderCommand: boolean = false;

    сharacteristic: Characteristic[] = []
    commands: ControlType[] = []
    commandsInfo: ControlType[] = []
    services: ServiceModelType[] | any = []
    servicesToday: ServiceModelType[] | any = []
    missedService: ServiceModelType[] | any = []
    servicesWeek: ServiceModelType[] | any = []
    servicesHistory: ServiceHistoryType[] | any = []
    serviceStatistic: ServiceStatisticType[] | any = []
    documents: DocumentsType[] | any = []
    incidentList: { nodeId: number, nodeName: string }[] = []

    commandInfoIds: string[] = []
    ids: (string | undefined)[] = []
    status: boolean = false;

    evengLog: HardwareEventsDataType[] = [];


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get getCommands() {
        return this.servicesToday
    }

    clear() {
        this.model = {
            id: 0,
            fileId: 0,
            name: "",
            model: "",
            category: "",
            developerName: "",
            supplierName: "",
            photoName: "",
            position: "",
            opcDescription: "",
            controlBlockId: 0,
        };

        this.status = false;
        this.isLoading = false;
        this.isActiveCommand = false;
        this.isLoaderCommand = false;

        this.сharacteristic = [];
        this.commands = [];
        this.commandsInfo = [];
        this.services = [];
        this.servicesToday = [];
        this.missedService = [];
        this.servicesWeek = [];
        this.servicesHistory = [];
        this.serviceStatistic = [];
        this.documents = [];
        this.incidentList = [];
        this.commandInfoIds = []
        this.ids = []
    }

    async init(id: number, dateData: StartEndDates) {
        this.isLoading = true
        this.clear()

        try {
            const [info, commands, commandsInfo, characteristics, servicesToday, week, historyService, statisticService, documents, incidentList] = await Promise.all([
                getInfoHardware({ id }),
                getCommandAll({ id }),
                getCommandAllInfo({ id }),
                getCharacteristicAll({ id }),
                getTodayServiceApi({ id: id }),
                getServiceApi({ id: id }),
                getServiceHistoryRecordsAllOrderedApi({ id: id }),
                getServiceHistoryRecordsAllApi({ id: id }),
                getDocuments({ id: id }),
                getInfoNodeInfoAllCheck({ id: id }),
            ]);


            this.model = info.data;

            this.commands = commands.data;

            this.commandsInfo = commandsInfo.data;
            for (let i = 0; i < commandsInfo.data.length; i++) { this.ids.push(commandsInfo.data[i].id) }

            this.сharacteristic = characteristics.data;

            this.servicesToday = servicesToday.data;
            this.servicesWeek = week.data;

            this.servicesHistory = historyService.data
            this.sortServiceHistory(statisticService.data)

            this.documents = documents.data;
            this.incidentList = incidentList.data;


            const today = new Date();
            this.missedService = this.servicesToday.filter(service => {
                if (!service.nextMaintenanceDate) return false;
                const nextDate = new Date(service.nextMaintenanceDate);
                nextDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                return nextDate < today;
            });

            // this.isActiveCommand = commandCheck.data == "True"


        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        }

        let eventsData = [];
        let logsData = [];

        try {
            const hardwaresEventsRes = await hardwaresEvents({
                hadrwareId: id,
                start: dateData.start,
                end: dateData.end,
            });
            eventsData = hardwaresEventsRes.data;
        } catch (error) {
            console.error('Ошибка загрузки events:', error);
        }

        try {
            const hardwaresLogsRes = await hardwaresLogs({
                hadrwareId: id,
                start: dateData.start,
                end: dateData.end,
            });
            logsData = hardwaresLogsRes.data;
        } catch (error) {
            console.error('Ошибка загрузки logs:', error);
        }

        this.evengLog = sortHardwareEventsLogs([...eventsData, ...logsData]);

        await getInfoHardware({ id: id })
            .then((res) => {
                this.model = res.data
            })
            .finally(() => {
                this.isLoading = false
            })
    }

    sortServiceHistory(historyService: ServiceHistoryDataApiType[]) {

        let data: ServiceHistoryType[] = [];

        historyService.forEach(element => {
            element.recordsList.forEach(recird => {
                data.push({ title: element.title, sheduleMaintenanceDate: recird.sheduleMaintenanceDate, completedMaintenanceDate: recird.completedMaintenanceDate })
            });
        });

        this.dataServiceStatistic(historyService);
    }

    dataServiceStatistic(dataService: ServiceHistoryDataApiType[]) {
        for (let i = 0; i < dataService.length; i++) {

            let count = 0;

            dataService[i].recordsList.forEach(item => {
                const scheduleDate = new Date(item.sheduleMaintenanceDate);
                const actualDate = new Date(item.completedMaintenanceDate);

                console.log(item.completedMaintenanceDate.includes("2025-12-17"))

                if (item.completedMaintenanceDate.includes("2025-12-17")) {
                    ++count;
                }
            });

            if (dataService[i].recordsList.length == 0 || count == 0) {
                // this.serviceStatistic.push({ name: dataService[i].title, progress: 0 })
            } else {
                this.serviceStatistic.push({ name: dataService[i].title, progress: 100 })
                // this.serviceStatistic.push({ name: dataService[i].title, progress: (count / dataService[i].recordsList.length * 100) })
            }
        }
    }

    changeCommands(value: string, id: string) {
        this.commands[this.commands.findIndex(item => item.id === id)].value = value
    }

    async switchIsCommand() {
        this.isLoaderCommand = true;

        if (this.isActiveCommand) {
            await getCommandActive({ hardwareId: this.model.id })
                .then(() => {
                    this.isActiveCommand = false
                    toast("Команды деактивированы", { progressStyle: { background: "green" } });
                })
                .catch((error) => {
                    console.log(error)
                    toast("Ошибка при деактивации команд", { progressStyle: { background: "red" } });
                })
                .finally(() => { this.isLoaderCommand = false })
        } else {
            await getCommandDeactive({ hardwareId: this.model.id })
                .then(() => {
                    this.isActiveCommand = true
                    toast("Команды активированы", { progressStyle: { background: "green" } });
                })
                .catch((error) => {
                    console.log(error)
                    toast("Ошибка при активации команд", { progressStyle: { background: "red" } });
                })
                .finally(() => { this.isLoaderCommand = false })

        }
    }

    async checkedService(id: string) {
        await checkedServiceApi({ id: id }).then((res) => {
            this.servicesToday = this.servicesToday.filter(item => item.id !== Number(id));
            toast("Задача выполнена", { progressStyle: { background: "green" }, });
        })
    }

    async getInfoNodeInfoAll() {
        try {
            // const [] = await Promise.all([
            //     getInfoNodeInfos(JSON.stringify({ listId: this.ids })),
            //     statusCheck({ ids: [this.model.id] })
            // ]);

            await getInfoNodeInfos(JSON.stringify({ listId: this.ids }))
                .then(res => {
                    for (const key in res.data.indecatesGroup) {
                        this.commandsInfo = this.commandsInfo.map(item => {

                            if (item.id == key) {
                                return { ...item, value: res.data.indecatesGroup[key] };
                            }

                            return item;
                        });
                    }
                })


            await statusHardwaresCheck({ ids: [this.model.id] })
                .then((res) => {
                    res.data.forEach(info => {
                        if (this.model.id == info.hardwareId) {
                            if (info.hardwareStatus == "True") {
                                this.status = true
                            } else {
                                this.status = false
                            }
                        }
                    })
                })
        } catch (error) {
            console.error(`Ошибка при получении данных для plcNodeid :`, error);
        }
    }
}

export const hardwareModel = new HardwareModel()