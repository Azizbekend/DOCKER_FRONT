import { checkedServiceApi, Documents, getCharacteristicAll, getCommandAll, getCommandAllInfo, getDocuments, getHistoryRecordsServiceApi, getInfoHardware, getInfoNodeInfoOne, getInfoNodeInfos, getNodeInfoIncidentAll, getNodeInfoIncidentTotal, getServiceApi, getTodayServiceApi } from "@/entities/hardware/api";
import { ModelHardwareOneInterface } from "@/entities/hardware/type";
import { Characteristic } from "@/modules/dispatcher/pages/equipment-form/components/characteristic/type";
import { ControlType, ServiceModelType } from "@/modules/dispatcher/pages/equipment-form/components/control/type";
import { makeAutoObservable } from "mobx";
import { json } from "react-router-dom";
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

    сharacteristic: Characteristic[] = []
    commands: ControlType[] = []
    commandsInfo: ControlType[] = []
    services: ServiceModelType[] | any = []
    servicesToday: ServiceModelType[] | any = []
    servicesHistory: ServiceModelType[] | any = []
    documents: Documents[] | any = []


    commandInfoIds: string[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    get getCommands() {
        return this.servicesToday
    }


    async init(id: number, serviceTody: boolean = false) {

        this.isLoading = true

        try {

            const [info, commands, commandsInfo, characteristics, servicesToday, week, documents] = await Promise.all([
                getInfoHardware({ id }),
                getCommandAll({ id }),

                getCommandAllInfo({ id }),

                getCharacteristicAll({ id }),
                getTodayServiceApi({ id: id }),
                getServiceApi({ id: id }),
                getDocuments({ id: id })
            ]);

            this.model = info.data;
            this.commands = commands.data;
            this.commandsInfo = commandsInfo.data;
            this.сharacteristic = characteristics.data;

            this.servicesToday = servicesToday.data;
            this.servicesHistory = week.data;


            this.documents = documents.data;

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

    changeCommands(value: string, id: string) {
        this.commands[this.commands.findIndex(item => item.id === id)].value = value
    }

    async checkedService(id: string) {
        await checkedServiceApi({ id: id }).then((res) => {
            this.servicesToday = this.servicesToday.filter(item => item.id !== Number(id));
            toast("Задача выполнена", { progressStyle: { background: "green" }, });
        })
    }



    async getInfoNodeInfoAll() {
        let ids: (string | undefined)[] = []



        await getNodeInfoIncidentTotal({ id: this.model.id }).then((res) => { console.log(res.data) })
        await getNodeInfoIncidentAll({ id: this.model.id }).then((res) => { console.log(res.data) })



        for (let i = 0; i < this.commandsInfo.length; i++) {
            ids.push(this.commandsInfo[i].id)
        }

        try {
            await getInfoNodeInfos(JSON.stringify({ listId: ids }))
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