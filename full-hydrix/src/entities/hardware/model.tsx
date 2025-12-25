import { checkedServiceApi, Documents, getCharacteristicAll, getCommandActive, getCommandAll, getCommandAllInfo, getCommandCheck, getCommandDeactive, getDocuments, getHistoryRecordsServiceApi, getInfoHardware, getInfoNodeInfoAllCheck, getInfoNodeInfoOne, getInfoNodeInfos, getNodeInfoIncidentAll, getNodeInfoIncidentTotal, getServiceApi, getServiceHistoryRecordsAllApi, getServiceHistoryRecordsAllOrderedApi, getTodayServiceApi } from "@/entities/hardware/api";
import { ModelHardwareOneInterface } from "@/entities/hardware/type";
import { Characteristic } from "@/modules/dispatcher/pages/equipment-form/components/characteristic/type";
import { ControlType, ServiceHistoryDataApiType, ServiceHistoryType, ServiceModelType, ServiceStatisticType } from "@/modules/dispatcher/pages/equipment-form/components/control/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class HardwareModel {

    model: ModelHardwareOneInterface = {
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
    isCommand: boolean = false;
    isLoaderCommand: boolean = false;

    сharacteristic: Characteristic[] = []
    commands: ControlType[] = []
    commandsInfo: ControlType[] = []
    services: ServiceModelType[] | any = []
    servicesToday: ServiceModelType[] | any = []
    servicesWeek: ServiceModelType[] | any = []
    servicesHistory: ServiceHistoryType[] | any = []
    serviceStatistic: ServiceStatisticType[] | any = []
    documents: Documents[] | any = []
    incidentList: { nodeId: number, nodeName: string }[] = []
    commandInfoIds: string[] = []
    ids: (string | undefined)[] = []

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

        this.commands = [];
        this.commandsInfo = [];
        this.сharacteristic = [];
        this.servicesToday = [];
        this.servicesWeek = [];
        this.servicesHistory = [];
        this.documents = [];
        this.incidentList = [];
        this.ids = []
    }

    async init(id: number, serviceTody: boolean = false) {

        this.isLoading = true
        this.clear()

        try {
            const [info, commands, commandsInfo, characteristics, servicesToday, week, historyService, statisticService, documents, incidentList, commandCheck] = await Promise.all([
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
                getCommandCheck({ hardwareId: id })
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

            this.isCommand = !(commandCheck.data == "True")

        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        } finally {
            this.isLoading = false;
        }

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

        if (this.isCommand) {
            await getCommandActive({ hardwareId: this.model.id })
                .then(() => {
                    this.isCommand = false
                    toast("Команды активированы", { progressStyle: { background: "green" } });
                })
                .catch((error) => {
                    console.log(error)
                    toast("Ошибка при активации команды", { progressStyle: { background: "red" } });
                })
                .finally(() => { this.isLoaderCommand = false })
        } else {
            await getCommandDeactive({ hardwareId: this.model.id })
                .then(() => {
                    this.isCommand = true
                    toast("Команды деактивированы", { progressStyle: { background: "green" } });
                })
                .catch((error) => {
                    console.log(error)
                    toast("Ошибка при активации команды", { progressStyle: { background: "red" } });
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
        } catch (error) {
            console.error(`Ошибка при получении данных для plcNodeid :`, error);
        }
    }

}

export const hardwareModel = new HardwareModel()