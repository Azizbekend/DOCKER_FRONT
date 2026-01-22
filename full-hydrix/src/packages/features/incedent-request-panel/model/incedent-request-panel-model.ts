import { makeAutoObservable } from "mobx";

class IncedentRequestPanelModel {

    model: any = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }


    async init(id: number) {

        

    }


}

export const incedentRequestPanelModel = new IncedentRequestPanelModel()