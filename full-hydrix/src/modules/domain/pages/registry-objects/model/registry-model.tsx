import { makeAutoObservable } from "mobx";
import { getAllObjects, getAllUserObjects, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { Role } from "@/packages/entities/user/enums";
import { PassportDataType } from "@/packages/entities/object/type";



class RegistryModel {
    model: PassportDataType[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(userId: number, userRole: Role) {
        try {
            const [objectsRes, charsShapshiRes] = await Promise.all([
                userRole == Role.Admin ? getAllObjects() : getAllUserObjects({ userId: userId }),
                getTechnicalCharsShapshi()
            ])

            // const objectIds = new Set(objectsRes.data.map(data => data.id));

            // try {
            //     const results = await Promise.all(
            //         Array.from(objectIds).map(id => console.log(id))
            //     );
            //     console.log(results);
            // } catch (error) {
            //     console.error('Ошибка при загрузке одного из объектов:', error);
            // }


            this.model = objectsRes.data.map((data, _) => {
                if (data.id == 14) {
                    if (charsShapshiRes.data.hourEfficiency) {
                        console.log(charsShapshiRes.data.dayEfficiency)
                        console.log(charsShapshiRes.data.hourEfficiency)

                        return {
                            ...data,
                            dayEfficiency: charsShapshiRes.data.dayEfficiency,
                            hourEfficiency: charsShapshiRes.data.hourEfficiency,
                        }
                    }
                }
                return data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const registryModel = new RegistryModel()