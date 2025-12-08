import { activeHardware, createServiceApi, getAllHardware } from "@/entities/hardware/api";
import { HardwareInterface } from "@/entities/hardware/type";
import { makeAutoObservable, runInAction } from "mobx";
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
            console.log(res.data.reverse())
            this.model = res.data.reverse()
        })
    }

    async active(id: number) {
        try {
            await activeHardware({ id: id });

            // Создаем новый массив с обновленным элементом
            this.model = this.model.map(item =>
                item.id === id
                    ? { ...item, activatedAt: new Date().toISOString() }
                    : item
            );

        } catch (error) {
            console.error('Error activating hardware:', error);
        }
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