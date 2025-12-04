import { Municipality } from "../municipality/type";

export type GetWaterCompanyPlantsRequest = {
    WaterCompanyId: number;
};

export type CreatePlantRequest = {
    adress: string;
    companyId: number;
    latitude: number;
    longitude: number;
    dailyLimit: number;
    name: string;
};

export type DeletePlantRequest = {
    id: number;
};

export type Plant = {
    id: number;
    adress: string;
    waterCompanyId: number;
    companyName: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    post: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    dailyLimit: number;
    isArchived: boolean;
    name: string;
    municipalities?: Municipality[];
    municipalitiesId: number[];
};

export type PlantTariff = {
    price: number;
    treatmentId: number;
};