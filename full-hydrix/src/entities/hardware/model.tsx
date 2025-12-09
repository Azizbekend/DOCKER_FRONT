import { checkedServiceApi, Documents, getCharacteristicAll, getCommandAll, getCommandAllInfo, getDocuments, getHistoryRecordsServiceApi, getInfoHardware, getServiceApi, getTodayServiceApi } from "@/entities/hardware/api";
import { ModelHardwareOneInterface } from "@/entities/hardware/type";
import { Characteristic } from "@/modules/dispatcher/pages/equipment-form/components/characteristic/type";
import { ControlType, ServiceModelType } from "@/modules/dispatcher/pages/equipment-form/components/control/type";
import { makeAutoObservable } from "mobx";

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

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
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
                console.log(res.data)
                this.model = res.data
            })

            .finally(() => {
                this.isLoading = false
            })

    }

    changeCommands(value: string, id: string) {
        this.commands[this.commands.findIndex(item => item.id === id)].value = value
    }

    async checkedService(id: number) {
        await checkedServiceApi({ id: id })
    }
}

export const hardwareModel = new HardwareModel()