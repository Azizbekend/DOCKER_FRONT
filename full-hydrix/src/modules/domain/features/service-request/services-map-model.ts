import { getInfoHardware } from "@/packages/entities/hardware/api";
import { getAllIncedent } from "@/packages/entities/incident/api";
import { cancelServiceRequests, completeServiceRequests, getServiceRequestsAll } from "@/packages/entities/service-requests/api";
import { CompleteCancelType, ServiceType } from "@/packages/entities/service-requests/type";
import { makeAutoObservable } from "mobx";
import { Incident } from "../../pages/registry-objects/data/data";
import { toast } from "react-toastify";

class ServicesMapModel {
    services: ServiceType[] = [];
    incidents: Incident[] = [];

    isLoaded: boolean = true;

    isPanel: boolean = false;
    serviceId: number = 0

    isService: { id: number, status: 'New' | 'Completed' | 'Canceled' | null } = { id: 0, status: null }


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setIsPanel(value: boolean, id = 0, status: 'New' | 'Completed' | 'Canceled' | null) {
        this.isPanel = value;

        this.isService = {
            id: id,
            status: status
        }

    }

    async init() {
        try {
            this.isLoaded = true;
            this.initService()
            this.initIncident()

        } catch (error) {
            console.error('Ошибка инициализации сервисов:', error);
            throw error;
        } finally {
            this.isLoaded = false;
        }
    }

    async initService() {

        const serviceResponse = await getServiceRequestsAll();
        const services = serviceResponse.data;

        const hardwareIds = new Set<number>();
        const creatorIds = new Set<number>();
        services.forEach(service => {
            hardwareIds.add(service.hardwareId);
            creatorIds.add(service.creatorId);
        });

        const hardwarePromises = Array.from(hardwareIds).map(async (hardwareId) => {
            try {
                const hardwareResponse = await getInfoHardware({ id: hardwareId });
                return {
                    hardwareId,
                    hardwareName: hardwareResponse.data?.name || 'Неизвестно'
                };
            } catch (error) {
                console.error(`Ошибка загрузки hardware ${hardwareId}:`, error);
                return {
                    hardwareId,
                    hardwareName: 'Ошибка загрузки'
                };
            }
        });

        const hardwareInfoArray = await Promise.all(hardwarePromises);

        // const creatorPromises = Array.from(creatorIds).map(async (creatorId) => {
        //     try {
        //         const creatorResponse = await getInfoHardware({ id: creatorId });
        //         return {
        //             creatorId,
        //             hardwareName: creatorResponse.data?.name || 'Неизвестно'
        //         };
        //     } catch (error) {
        //         console.error(`Ошибка загрузки hardware ${creatorId}:`, error);
        //         return {
        //             creatorId,
        //             createdName: 'Ошибка загрузки'
        //         };
        //     }
        // });

        // const creatorInfoArray = await Promise.all(creatorPromises);

        const hardwareMap = new Map<number, string>();
        hardwareInfoArray.forEach(info => {
            hardwareMap.set(info.hardwareId, info.hardwareName);
        });

        const enrichedServices = services.map(service => ({
            ...service,
            hardwareName: service.hardwareId ? hardwareMap.get(service.hardwareId) || 'Неизвестно' : null
        }));



        this.services = enrichedServices;

    }

    async initIncident() {
        const incidentResponse = await getAllIncedent();
        this.incidents = incidentResponse.data;

        const hardwareIds = new Set<number>();
        this.incidents.forEach(incident => {
            if (incident.hardwareId) {
                hardwareIds.add(incident.hardwareId);
            }
        });

        const hardwarePromises = Array.from(hardwareIds).map(async (hardwareId) => {
            try {
                const hardwareResponse = await getInfoHardware({ id: hardwareId });
                return {
                    hardwareId,
                    hardwareName: hardwareResponse.data?.name || 'Неизвестно'
                };
            } catch (error) {
                console.error(`Ошибка загрузки hardware ${hardwareId}:`, error);
                return {
                    hardwareId,
                    hardwareName: 'Ошибка загрузки'
                };
            }
        });

        const hardwareInfoArray = await Promise.all(hardwarePromises);

        const hardwareMap = new Map<number, string>();
        hardwareInfoArray.forEach(info => {
            hardwareMap.set(info.hardwareId, info.hardwareName);
        });

        const enrichedIncidents = this.incidents.map(incident => ({
            ...incident,
            hardwareName: incident.hardwareId ? hardwareMap.get(incident.hardwareId) || 'Неизвестно' : null
        }));

        this.incidents = enrichedIncidents;
    }


    async completeService(data: CompleteCancelType) {
        await completeServiceRequests(data)
            .then(() => {
                toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
            })
            .catch(() => {
                toast.error("Ошибка при завершении", { progressStyle: { background: "red" } })
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

export const servicesMapModel = new ServicesMapModel();