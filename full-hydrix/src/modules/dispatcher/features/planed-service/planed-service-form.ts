import { attachPlanedServicesInstructionApi, createPlanedServiceApi, createPlanedServicesInstructionApi, getAllPlanedServicesInstructionApi } from '@/packages/entities/planed-services/api';
import { CreatePlanedServicesInstructionInterface, CreatePlanedServicesInterface, PlanedServicesInstructionInterface } from '@/packages/entities/planed-services/type';
import { SeletectItemInterface } from '@/packages/shared-ui/Selector/type';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';


class PlanedServiceFormModel {

    model: CreatePlanedServicesInterface = {
        title: "",
        periodInHours: 0,
        hardwareId: 0,
    }
    instruction: CreatePlanedServicesInstructionInterface = {
        title: "",
        discription: "",
    }

    isLookFormInstruction: boolean = false

    idInstruction: number = 0

    instructionList: SeletectItemInterface[] = []

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setIsLookFormInstruction(value: boolean) {
        if (!value) {
            this.clearInstruction()
        }

        this.isLookFormInstruction = value
    }

    setTitle(value: string) {
        this.model.title = value
    }
    setPeriodInHours(value: string) {
        this.model.periodInHours = Number(value)
    }

    setInstructionTitle(value: string) {
        this.instruction.title = value
    }

    setInstructionDiscription(value: string) {
        this.instruction.discription = value
    }

    setIdInstruction(value: string | number) {
        this.idInstruction = Number(value)
    }

    async init(hardwareId: number) {
        this.model.hardwareId = hardwareId
        this.clear()

        await getAllPlanedServicesInstructionApi()
            .then(({ data }: { data: PlanedServicesInstructionInterface[] }) => {
                this.instructionList = data.map((item) => {
                    return {
                        value: item.id,
                        title: item.title,
                    }
                });
            })

            .catch((error) => {
                console.log(error)
            })
    }

    clear() {
        this.model = {
            title: "",
            periodInHours: 0,
            hardwareId: this.model.hardwareId,
        }

        this.clearInstruction()
    }

    clearInstruction() {
        this.instruction = {
            title: "",
            discription: "",
        }
    }


    isValid(): boolean {
        return (
            this.model.title.length > 0 &&
            this.model.periodInHours > 0 &&
            this.model.hardwareId > 0
        ) && (this.isLookFormInstruction ? (
            this.instruction.title.length > 0 &&
            this.instruction.discription.length > 0
        ) : true)
    }

    async create(onActin: () => void) {

        if (!this.isValid()) {
            toast.error("Заполните все поля")
            return
        }

        try {
            const res = await createPlanedServiceApi(this.model)

            if (this.instruction.title.length > 0 && this.instruction.discription.length > 0) {
                const resIns = await createPlanedServicesInstructionApi(this.instruction)
                this.idInstruction = resIns.data
            }

            const attachRes = attachPlanedServicesInstructionApi({
                plannedServiceId: res.data,
                instructionId: this.idInstruction,
            })

            console.log(res.data)
            onActin()
            toast.success("ТО создано")

        } catch (error) {
            console.log(error)
            toast.error("Ошибка при создании ТО")
        }
    }
}

export const planedServiceFormModel = new PlanedServiceFormModel()