import { getInfoNodeInfos, getSchemaObjects, getTodayServiceApi, NodeInfoSingle } from "@/packages/entities/hardware/api-general";
import { SchemaObjectType } from "@/packages/entities/hardware/type-general";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { SchemaCardInterface } from "@/packages/entities/sensor/type";
import { ApiSchemaCardAll } from "@/packages/entities/sensor/api";
import { statusHardwaresCheck } from "@/packages/entities/hardware/api";
import { formatToTwoDecimalsSafe } from "@/packages/shared/libs/hardware/functions/formatToTwoDecimalsSafe";

class SchemeModel {

    model: SchemaObjectType[] = []
    schemaSensoreData: SchemaCardInterface[] = []

    focusHardware: number = 0
    focusHardwareStatus: boolean = false
    focusSchemeObject: number = 0
    focusSchemeSensore: number = 0
    focusSchemeObjectData: SchemaObjectType | null = null
    switchColo: boolean = false;

    idska: number[] = []
    idskaSensores: number[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model
    }

    get listSensore() {
        return this.schemaSensoreData
    }

    async init(schemeIds: number[]) {
        try {
            const [objectsResponses, sensorsResponses] = await Promise.all([
                Promise.all(schemeIds.map(id => getSchemaObjects({ id }))),
                Promise.all(schemeIds.map(id => ApiSchemaCardAll({ id }))),
            ]);

            const objects = objectsResponses.flatMap(r => r.data);
            const sensors = sensorsResponses.flatMap(r => r.data as SchemaCardInterface[]);

            const hardwareIds = this.collectIds(objects, "hardwareId");
            const nodeInfoIds = this.collectIds(sensors, "nodeInfoId");

            const hardwareIdMap = new Map<number, number>();
            const hardwareStatusMap = new Map<number, boolean>();

            await Promise.all(nodeInfoIds.map(async (nodeInfoId) => {
                const { data } = await NodeInfoSingle({ id: nodeInfoId });
                hardwareIdMap.set(nodeInfoId, data.hardwareId);
                hardwareStatusMap.set(nodeInfoId, data.status);
            }));

            sensors.forEach(sensor => {
                sensor.hardwareId = hardwareIdMap.get(sensor.nodeInfoId);
                sensor.hardwareStatus = hardwareStatusMap.get(sensor.nodeInfoId);
            });

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const newObjectWithServiceStatus = await Promise.all(objects.map(async (object) => {
                try {
                    const { data } = await getTodayServiceApi({
                        id: object.hardwareId
                    });

                    // Фильтруем сервисы с просроченной датой обслуживания
                    const overdueServicesCount = data.filter(service => {
                        if (!service.nextMaintenanceDate) return false;

                        const nextDate = new Date(service.nextMaintenanceDate);
                        nextDate.setHours(0, 0, 0, 0);

                        return nextDate < today;
                    }).length;

                    return { ...object, serviceStatus: overdueServicesCount > 0 };
                } catch (error) {
                    console.error(`Ошибка при запросе для hardwareId=${object.hardwareId}:`, error);
                    return { ...object, serviceStatus: false };
                }
            }));

            runInAction(() => {
                this.model = newObjectWithServiceStatus;
                this.schemaSensoreData = sensors;
                this.idska = hardwareIds;
                this.idskaSensores = nodeInfoIds;
            });

            this.timesFunctions();
        } catch (error) {
            toast.error("Ошибка загрузки схемы");
            console.error(error);
        }
    }

    private collectIds<T, K extends keyof T>(data: T[], key: K): number[] {
        return [...new Set(data.map(item => item[key] as number))];
    }

    setFocusHardware(id: number, status: boolean) {
        this.closePanels()
        if (this.focusSchemeObject != 0) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        }
        this.focusHardware = id
        this.focusHardwareStatus = status
    }

    setSchemeObjectData(id: number) {
        this.closePanels()
        if (this.focusSchemeObject == id) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        } else {
            this.focusSchemeObjectData = this.model[this.model.findIndex(item => item.id === id)]
            this.focusSchemeObject = id
        }
    }

    setSchemeSensoreData(id: number) {
        this.closePanels()
        if (this.focusSchemeSensore == id) {
            this.focusSchemeSensore = 0
        } else {
            this.focusSchemeSensore = id
        }
    }

    closePanels() {
        this.focusSchemeObject = 0;
        this.focusSchemeSensore = 0;
        this.focusHardware = 0;
        this.focusSchemeObjectData = null;
    }

    // async 
    timesFunctions() {
        this.checkIncidents()
        this.updateSensoreData()
    }

    async updateSensoreData() {
        await getInfoNodeInfos({ listId: this.idskaSensores })
            .then(res => {
                for (const key in res.data.indecatesGroup) {
                    this.schemaSensoreData = this.schemaSensoreData.map(item => {
                        if (item.nodeInfoId.toString() == key) {
                            return { ...item, value: formatToTwoDecimalsSafe(res.data.indecatesGroup[key]) };
                        }
                        return item;
                    });
                }
            })
    }

    async checkIncidents() {
        await statusHardwaresCheck({ ids: this.idska })
            .then((res) => {
                res.data.forEach(info => {
                    for (let i = 0; i < this.model.length; i++) {
                        if (this.model[i].hardwareId == info.hardwareId) {


                            if (info.hardwareStatus == "True") {

                                this.model[i].focusFileId = this.model[i].greenFileId
                                this.model[i].status = false

                            } else if (info.incidents == "True") {

                                this.model[i].focusFileId = this.model[i].redFileId
                                this.model[i].status = true

                            } else if (info.hardwareStatus == null || info.incidents == false) {

                                this.model[i].focusFileId = this.model[i].fileId
                                this.model[i].status = false

                            } else {

                                this.model[i].focusFileId = this.model[i].fileId
                                this.model[i].status = true

                            }
                        }
                    }
                })
            })
    }
}


export const schemeModel = new SchemeModel();