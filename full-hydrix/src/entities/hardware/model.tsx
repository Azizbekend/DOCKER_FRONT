import { checkedServiceApi, getCharacteristicAll, getCommandAll, getInfoHardware, getServiceApi } from "@/entities/hardware/api";
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
    servicesWeek: ServiceModelType[] | any = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    async init(id: number, serviceTody: boolean = false) {

        this.isLoading = true

        try {
            const [info, commands, characteristics, services] = await Promise.all([
                getInfoHardware({ id }),
                getCommandAll({ id }),
                getCharacteristicAll({ id }),
                getServiceApi({ id: id })
            ]);

            this.model = info.data;
            this.commands = commands.data;
            this.сharacteristic = characteristics.data;

            if (serviceTody) {
                const today = new Date();
                const todayStr = today.toISOString().split('T')[0];

                this.services = services.data
                // this.services = services.data.filter(item => {
                //     const date = item.nextMaintenanceDate?.split('T')[0];
                //     return date === todayStr;
                // });

                // this.servicesWeek = services.data.filter(item => {
                //     const date = item.nextMaintenanceDate?.split('T')[0];
                //     return date !== todayStr;
                // })
            } else {
                this.services = services.data;
            }

            console.log(services.data)

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