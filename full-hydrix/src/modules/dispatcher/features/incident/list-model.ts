import { getInfoHardware } from '@/packages/entities/hardware/api';
import { getByObject } from '@/packages/entities/incident/api';
import { cancelServiceRequests, completeServiceRequests } from '@/packages/entities/service-requests/api';
import { CompleteCancelType } from '@/packages/entities/service-requests/type';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';


class IncidentListModel {

    model: any = []
    isLoader: boolean = false

    showPanel: boolean = false
    showStagePanel: boolean = false

    focusIncedent: any = null
    focusService: any = null


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    setShowPanel(value: boolean, incident: any) {
        this.focusIncedent = incident
        this.showPanel = value
    }

    setShowStagePanel(value: boolean, service: any) {
        this.focusService = service
        this.showStagePanel = value
    }

    async init(id: number) {
        try {
            const dataRes = await getByObject({ id: id });
            this.model = await Promise.all(
                dataRes.data.map(async (item) => {
                    if (!item.hardwareId) {
                        return { ...item, hardware: null };
                    }
                    try {
                        const hardwareRes = await getInfoHardware({ id: item.hardwareId });
                        return {
                            ...item,
                            hardware: hardwareRes.data
                        };
                    } catch (error) {
                        console.error(`Error fetching hardware ${item.hardwareId}:`, error);
                        return {
                            ...item,
                            hardware: null,
                            hardwareError: true
                        };
                    }
                })
            );

            console.log(this.model)

        } catch (error) {
            console.error('Error in init:', error);
            this.model = [];
        }
    }



    async completeService(data: CompleteCancelType) {
        await completeServiceRequests(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch((error) => {
                toast.error(error.response.data, { progressStyle: { background: "red" } })
            })
    }

    async cancelService(data: CompleteCancelType) {
        await cancelServiceRequests(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
            })
    }
}

export const incedentListModel = new IncidentListModel()