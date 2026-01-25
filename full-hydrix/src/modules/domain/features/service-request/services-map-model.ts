import { getInfoHardware } from "@/packages/entities/hardware/api";
import { getAllIncedent } from "@/packages/entities/incident/api";
import { Incident } from "@/packages/entities/incident/type";
import { cancelServiceRequests, completeServiceRequests, getServiceRequestsAll } from "@/packages/entities/service-requests/api";
import { CompleteCancelType, ServiceType } from "@/packages/entities/service-requests/type";
import { getByUser } from "@/packages/entities/user/api";
import { getGoodName } from "@/packages/functions/get-good-name";
import { isStageAnswerTypes, isStageIncidentTypes, isStageSupplyTypes } from "@/packages/functions/is-stage-types";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ServicesMapModel {
    services: ServiceType[] = [];
    incidents: Incident[] = [];

    isLoaded: boolean = true;

    isPanel: boolean = false;
    serviceId: number = 0

    isService: { id: number, status: 'New' | 'Completed' | 'Canceled' | null } = { id: 0, status: null }

    chartData: { name: string, value: number, color: string }[] = []

    serviceStatusCounter: { new: number, complete: number, cancle: number } = { new: 0, complete: 0, cancle: 0 };
    serviceTypeCounter: { asnser: number, supply: number, incident: number } = { asnser: 0, supply: 0, incident: 0 };

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

        const statusCounter: { new: number, complete: number, cancle: number } = { new: 0, complete: 0, cancle: 0 };
        const typeCounter: { asnser: number, supply: number, incident: number } = { asnser: 0, supply: 0, incident: 0 };

        services.forEach(service => {
            // подсчёт по статусам
            if (service.status) {
                if (service.status === 'New') statusCounter.new++;
                if (service.status === 'Completed') statusCounter.complete++;
                if (service.status === 'Canceled') statusCounter.cancle++;
            }

            if (service.type) {
                if (isStageAnswerTypes(service.type)) typeCounter.asnser++
                if (isStageSupplyTypes(service.type)) typeCounter.supply++
                if (isStageIncidentTypes(service.type)) typeCounter.incident++
            }
        });

        const hardwareIds = new Set<number>();
        const creatorIds = new Set<number>();

        services.forEach(service => {
            hardwareIds.add(service.hardwareId);
            creatorIds.add(service.creatorId);
        });

        let typesServices: string[] = [];
        services.forEach(element => {
            if (!typesServices.includes(element.status)) {
                typesServices.push(element.status)
            }
        });

        console.log('typesServices', typesServices);


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

        const userPromises = Array.from(creatorIds).map(async (userId) => {
            try {
                const userResponse = await getByUser({ id: userId });
                return {
                    userId,
                    userName: getGoodName(userResponse.data) || 'Неизвестно'
                };
            } catch (error) {
                console.error(`Ошибка загрузки пользователя ${userId}:`, error);
                return {
                    userId,
                    userName: 'Ошибка загрузки'
                };
            }
        });

        const userInfoArray = await Promise.all(userPromises);

        const userMap = new Map<number, string>();
        userInfoArray.forEach(info => {
            userMap.set(info.userId, info.userName);
        });

        const enrichedServices = services.map(service => ({
            ...service,
            hardwareName: service.hardwareId ? hardwareMap.get(service.hardwareId) || 'Неизвестно' : null,

            userName: service.creatorId ? userMap.get(service.creatorId) || 'Неизвестно' : 'Неизвестно'
        }));

        this.services = enrichedServices;
        this.serviceStatusCounter = statusCounter;
        this.serviceTypeCounter = typeCounter;

        this.chartData = [
            { name: 'Новые', value: statusCounter.new, color: '#0088FE' },
            { name: 'Завершенные', value: statusCounter.complete, color: '#00C49F' },
            { name: 'Отмененные', value: statusCounter.cancle, color: '#FFBB28' }
        ]
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