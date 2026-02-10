import { makeAutoObservable } from "mobx";
import { getAllObjects, getAllUserObjects, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { Role } from "@/packages/entities/user/enums";
import { PassportPlcDataType, PassportRegistryDataType } from "@/packages/entities/object/type";
import { checkObjectPlc, getOneObjectData } from "@/packages/entities/controll-block/api";
import { ControlBlockType } from "@/packages/entities/controll-block/type";



class RegistryModel {
    model: PassportRegistryDataType[] = []
    isLoading: boolean = true

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(userId: number, userRole: Role) {
        this.isLoading = true;
        try {
            const [objectsRes, charsShapshiRes] = await Promise.all([
                userRole == Role.Admin || userRole == Role.Ministry ? getAllObjects() : getAllUserObjects({ userId: userId }),
                getTechnicalCharsShapshi()
            ]);

            const results = await Promise.all(objectsRes.data.map(({ id }) => getOneObjectData({ id })));

            const fullDataPromises = objectsRes.data.map(async obj => {
                const matchedResult = results.find(element =>
                    element.data.some((el: any) => el.staticObjectInfoId === obj.id)
                );

                let plcList: PassportPlcDataType[] = [];

                if (matchedResult) {
                    const plcItems = matchedResult.data
                        .filter((el: any) => el.staticObjectInfoId === obj.id);

                    // Параллельно проверяем статусы всех PLC
                    const plcStatuses = await Promise.all(
                        plcItems.map(async el => {
                            const info = await checkObjectPlc({ plcIp: el.plcIpAdress });
                            return {
                                plcId: el.id,
                                plcName: el.name,
                                plcIpAdress: el.plcIpAdress,
                                status: info.data
                            };
                        })
                    );

                    plcList = plcStatuses;
                }

                return {
                    ...obj,
                    plcList
                };
            });

            const fullData: PassportRegistryDataType[] = await Promise.all(fullDataPromises);
            this.model = fullData;
        } catch (error) {
            console.log(error)
        } finally {
            this.isLoading = false;
        }
    }
}

export const registryModel = new RegistryModel()