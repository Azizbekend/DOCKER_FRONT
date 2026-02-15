import { getPlanedServiceByPlanApi } from "@/packages/entities/planed-services/api";
import { ServiceType } from "@/packages/entities/service-requests/type";
import { getCompanyUserRequest } from "@/packages/functions/get-data/get-company-user-request";
import { makeAutoObservable } from "mobx";

class HardwareServiceModalsModel {
    // Состояния модальных окон
    show: boolean = false;
    showServiceForm: boolean = false;
    showPlanedList: boolean = false;
    showStagePanel: boolean = false;

    // ID для фокуса
    focusServiceId: number = 0;
    focusIdPlaned: number = 0;
    focusService: any = null; // для сервиса в панели этапов

    // Дополнительные данные
    serviceChecked: number = 0;

    // Колбэки для сервисов
    completeService: any = null;
    cancelService: any = null;
    completePlanedService: any = null;

    modelPlaned: ServiceType[] = []
    isLoadedPlaned: boolean = true


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async initPlaned(id: number) {
        try {
            const serviceRes = await getPlanedServiceByPlanApi({ planId: id });
            const results = [];

            for (const item of serviceRes.data) {
                const enrichedItem = await getCompanyUserRequest(item);
                results.push({
                    ...enrichedItem,
                });
            }
            this.modelPlaned = results;
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoadedPlaned = false
        }
    }

    // Методы для Service Open
    handleServiceOpen(id: number) {
        this.serviceChecked = id;
        this.show = true;
    }

    handleService() {
        this.serviceChecked = 0;
        this.show = false;
    }

    // Метод для ModalPlanedCommonServiceForm
    onSwitchPlanerCommonServiceForm(value: boolean, id: number) {
        this.showServiceForm = value;
        this.focusServiceId = id;
    }

    // Методы для Planed List
    switchPlanedList(value: boolean, id: number) {
        this.showPlanedList = value;
        this.focusIdPlaned = id;

        if (value) {
            this.initPlaned(id)
        }
    }

    // Методы для Stage Panel
    openStagePanel(service: any) {
        this.focusService = service;
        this.showStagePanel = true;
    }

    closeStagePanel() {
        this.showStagePanel = false;
        this.focusService = null;
    }

    // Метод для установки колбэков
    setServiceCallbacks(completeService: any, cancelService: any, completePlanedService: any) {
        this.completeService = completeService;
        this.cancelService = cancelService;
        this.completePlanedService = completePlanedService;
    }

    // Метод для сброса всех состояний
    resetAll() {
        this.show = false;
        this.showServiceForm = false;
        this.showPlanedList = false;
        this.showStagePanel = false;
        this.focusServiceId = 0;
        this.focusIdPlaned = 0;
        this.focusService = null;
        this.serviceChecked = 0;
    }
}

export const hardwareServiceModalsModel = new HardwareServiceModalsModel();