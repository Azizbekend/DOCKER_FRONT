import { getCompanyOne } from "../../entities/company/api";
import { getInfoHardware } from "../../entities/hardware/api";
import { getByUser } from "../../entities/user/api";
import { getGoodName } from "./get-good-name";

export async function getCompanyUserRequest(item: any) {
    try {
        const requests: { key: string; promise: Promise<any> }[] = [];

        if (item.creatorsCompanyId) {
            requests.push({
                key: 'creatorsCompany',
                promise: getCompanyOne({ id: item.creatorsCompanyId })
            });
        }

        if (item.implementersCompanyId) {
            requests.push({
                key: 'implementersCompany',
                promise: getCompanyOne({ id: item.implementersCompanyId })
            });
        }

        if (item.creatorId) {
            requests.push({
                key: 'creator',
                promise: getByUser({ id: item.creatorId })
            });
        }

        if (item.implementerId) {
            requests.push({
                key: 'implementer',
                promise: getByUser({ id: item.implementerId })
            });
        }

        if (item.hardwareId) {
            requests.push({
                key: 'hardware',
                promise: getInfoHardware({ id: item.hardwareId })
            });
        }

        const responses = await Promise.allSettled(
            requests.map(r => r.promise)
        );

        const enrichedItem = { ...item };

        responses.forEach((response, index) => {
            if (response.status === 'fulfilled') {
                const key = requests[index].key;

                if (key == "hardwareId") {
                    console.log(response.value.data)
                }

                enrichedItem[key] = (key === 'implementer' || key == "creator") ? getGoodName(response.value.data) : response.value.data;
            }
        });


        return enrichedItem;
    }
    catch (error) {
        console.error(`Error processing`, error);
    }
}