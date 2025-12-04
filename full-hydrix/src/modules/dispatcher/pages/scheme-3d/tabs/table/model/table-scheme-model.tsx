import { makeAutoObservable } from "mobx";
import { ControlBlockAllType, createOrderByPoint, getAllClientCompanies } from "../service/table-scheme-service";

class TableSchemeModel {

    model: ControlBlockAllType[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    get list() {
        return this.model;
    }


    async getInfoSensor() {
        await createOrderByPoint()
            .then((data) => {
                this.model = data.data
            })
    }



    async init() {
        await createOrderByPoint()
            .then((data) => {
                this.model = data.data
            })
    }

    infoChange = async (id: number): Promise<string> => {
        const data = await getAllClientCompanies({ id: id });
        return String(data.data.indicates);
    }
}
export const tableSchemeModel = new TableSchemeModel()