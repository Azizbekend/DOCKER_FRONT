import { getInfoHardware, getInfoNodeInfos, getSchemaObjects, NodeInfoSingle, statusCheck } from "@/entities/hardware/api";
import { SchemaObjectType } from "@/entities/hardware/type";
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { SchemaCardInterface } from "@/entities/sensor/type";
import { ApiSchemaCardAll } from "@/entities/sensor/api";
import { formatToTwoDecimalsSafe } from "@/shared/functions/formatToTwoDecimalsSafe";

class SchemeModel {

    model: SchemaObjectType[] = []
    schemaSensoreData: SchemaCardInterface[] = []

    focusHardware: number = 0
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

            const nodeInfoMap = new Map<number, number>();

            await Promise.all(
                nodeInfoIds.map(async (nodeInfoId) => {
                    const { data } = await NodeInfoSingle({ id: nodeInfoId });
                    nodeInfoMap.set(nodeInfoId, data.hardwareId);
                })
            );

            sensors.forEach(sensor => {
                sensor.hardwareId = nodeInfoMap.get(sensor.nodeInfoId);
            });

            runInAction(() => {
                this.model = objects;
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

    setFocusHardware(id: number) {
        this.closePanels()
        if (this.focusSchemeObject != 0) {
            this.focusSchemeObject = 0
            this.focusSchemeObjectData = null
        }
        this.focusHardware = id
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

    handleSwitchImage() {
        this.switchColo = !this.switchColo
        toast.success("Авария устранена", { progressStyle: { background: "green" } })
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
        await statusCheck({ ids: this.idska })
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