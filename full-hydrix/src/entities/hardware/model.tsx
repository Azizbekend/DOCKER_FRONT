import { checkedServiceApi, getCharacteristicAll, getCommandAll, getHistoryRecordsServiceApi, getInfoHardware, getServiceApi, getTodayServiceApi } from "@/entities/hardware/api";
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
    services: ServiceModelType[] | any = []
    servicesToday: ServiceModelType[] | any = []
    servicesHistory: ServiceModelType[] | any = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    async init(id: number, serviceTody: boolean = false) {

        this.isLoading = true

        try {



            const [info, commands, characteristics, servicesToday,] = await Promise.all([
                getInfoHardware({ id }),
                getCommandAll({ id }),
                getCharacteristicAll({ id }),
                getTodayServiceApi({ id: id }),
                // getHistoryRecordsServiceApi({ id: 17 })
            ]);

            this.model = info.data;
            this.commands = commands.data;
            this.сharacteristic = characteristics.data;

            this.servicesToday = servicesToday.data;
            // this.servicesHistory = servicesHistory.data;


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

    async checkedService(id: number) {
        await checkedServiceApi({ id: id })
    }
}

export const hardwareModel = new HardwareModel()