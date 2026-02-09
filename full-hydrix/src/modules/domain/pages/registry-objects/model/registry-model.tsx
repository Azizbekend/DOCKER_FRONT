import { makeAutoObservable } from "mobx";
import { getAllObjects, getAllUserObjects, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { Role } from "@/packages/entities/user/enums";
import { PassportPlcDataType, PassportRegistryDataType } from "@/packages/entities/object/type";
import { checkObjectPlc, getOneObjectData } from "@/packages/entities/controll-block/api";
import { ControlBlockType } from "@/packages/entities/controll-block/type";



class RegistryModel {
    model: PassportRegistryDataType[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(userId: number, userRole: Role) {
        try {
            const [objectsRes, charsShapshiRes] = await Promise.all([
                userRole == Role.Admin ? getAllObjects() : getAllUserObjects({ userId: userId }),
                getTechnicalCharsShapshi()
            ])

            const results = await Promise.all(objectsRes.data.map(({ id }) => getOneObjectData({ id })));

            const fullData: PassportRegistryDataType[] = objectsRes.data.map(obj => {
                const matchedResult = results.find(element =>
                    element.data.some((el: any) => el.staticObjectInfoId === obj.id)
                );

                const plcList: PassportPlcDataType[] = matchedResult
                    ? matchedResult.data
                        .filter((el: any) => el.staticObjectInfoId === obj.id)
                        .map(async el => {
                            const info = await checkObjectPlc({ plcIp: el.plcIpAdress })
                            return {
                                plcId: el.id,
                                plcName: el.name,
                                plcIpAdress: el.plcIpAdress,
                                status: info.data
                            }
                        })
                    : [];

                return {
                    ...obj,
                    plcList
                };
            });

            this.model = fullData

        } catch (error) {
            console.log(error)
        }
    }
}

export const registryModel = new RegistryModel()