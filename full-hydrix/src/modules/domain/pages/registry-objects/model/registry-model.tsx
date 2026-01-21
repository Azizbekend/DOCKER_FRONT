import { DespetcherTest } from "@/packages/entities/despetcher-test/type";
import { makeAutoObservable } from "mobx";
import { passportObject } from "../service/api";
import { getAllUserObjects, getTechnicalCharsShapshi } from "@/packages/entities/object/api";



class RegistryModel {
    model: DespetcherTest[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(userId: number) {
        try {
            const [objectsRes, charsShapshiRes] = await Promise.all([
                getAllUserObjects({ userId: userId }),
                getTechnicalCharsShapshi()
            ])

            this.model = objectsRes.data.map((data, _) => {
                if (data.id == 14) {
                    return {
                        id: data.id,
                        img: data.fileId,
                        nameMinin: data.name,
                        company: data.operatingOrganization,
                        statusСonnection: true,
                        volumeProjec: data.projectEfficiency,
                        dayEfficiency: charsShapshiRes.data.dayEfficiency,
                        hourEfficiency: charsShapshiRes.data.hourEfficiency,
                        dispetcher: true,
                    }
                }

                return {
                    id: data.id,
                    img: data.fileId,
                    nameMinin: data.name,
                    company: data.operatingOrganization,
                    statusСonnection: true,
                    volumeProjec: data.projectEfficiency,
                    dayEfficiency: "0",
                    hourEfficiency: "0",
                    dispetcher: true,
                }
            })


        } catch (error) {
            console.log(error)
        }


    }
}

export const registryModel = new RegistryModel()