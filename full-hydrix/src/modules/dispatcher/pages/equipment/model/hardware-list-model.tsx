import { activeHardware, createServiceApi, getAllHardware } from "@/entities/hardware/api";
import { HardwareInterface } from "@/entities/hardware/type";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class HardwareListModel {
    model: HardwareInterface[] = []

    modalService: boolean = false;
    inService: number | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get list() {
        return this.model;
    }

    setModalService(value: boolean, id: number) {
        this.modalService = value;
        this.inService = id;
    }

    closeModal(value: boolean) {
        this.modalService = value;
        this.inService = 0;
    }

    async init() {
        await getAllHardware().then((res) => {
            console.log(res.data)
            this.model = res.data
        })
    }

    async active(id: number) {
        await activeHardware({ id: id }).then((res) => {

            const itemIndex = this.model.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                this.model[itemIndex].isActive = true;
            }

        }).catch(error => {
            console.error('Error activating hardware:', error);
            // Можно добавить обработку ошибки
        });
    }

    async createService({ description, date }: { description: string, date: number }) {

        if (this.inService == null) return
        await createServiceApi({
            HardwareId: this.inService,
            Discription: description,
            Period: date
        }).then((res) => {
            toast.success("Сервис добавлен", { progressStyle: { background: "green" } })
        }).catch(error => {
            console.error('Error activating hardware:', error);
            // Можно добавить обработку ошибки
        });
    }
}

export const hardwareListModel = new HardwareListModel()