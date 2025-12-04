import { PlantRoutes } from "@/app/api/api-router";
import instance from "@/app/api/instances";
import { GetWaterCompanyPlantsRequest } from "./types";

export const getWaterCompanyPlants = (params: GetWaterCompanyPlantsRequest) => {
    return instance.get(PlantRoutes.GetByWaterCompany, { params });
};

// export const deletePlant = async (params: DeletePlantRequest) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//         const response = await instance.delete(PlantRoutes.Delete, { params });
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

// export const createPlant = (data: Plant) => {
//     return instance.post(PlantRoutes.Create, data);
// };
// export const createPlantTatiff = (data: PlantTariff) => {
//     return instance.post(Tariff.Create, data);
// };

// export const createPlantOperator = (data: Operator) => {
//     return instance.post(PlantRoutes.CreateOperator, data);
// };

// export const updatePlant = (data: Plant) => {
//     return instance.put(PlantRoutes.Update, data);
// };
