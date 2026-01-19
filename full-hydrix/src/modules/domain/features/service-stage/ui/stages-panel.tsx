import { Modal } from "@/packages/shared-ui/modal/modal";
import { serviceStagesModel } from "../models/model";
import { observer } from "mobx-react-lite";
import Loader from "@/packages/shared-ui/loader/loader";
import { useEffect } from "react";
import { serviceStagesFormModel } from "../models/form-model";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Textarea } from "@/packages/shared-ui/textarea";
import { Button } from "@/packages/shared-ui/button";
import { StageCard } from "@/packages/shared-components/stage-card";

interface ServiceStagesPanelProps {
    show: boolean;
    onClose: () => void;
    serviceId: number;
}

export const ServiceStagesPanel = observer(({ show, onClose, serviceId }: ServiceStagesPanelProps) => {

    const { model, isLoaded, init, create, completeEngineer, cancelEngineer } = serviceStagesModel
    const { model: formModel, setServiceId, setCreatorId, setImplementerId, setDiscription, setStageType, } = serviceStagesFormModel

    useEffect(() => {
        init(serviceId)

        setServiceId(serviceId)
        setCreatorId(400)
        setImplementerId(400)
        setStageType('Общий')
    }, [serviceId])


    return (
        <Modal
            wrapperId='register'
            type="right"
            show={show}
            setShow={onClose}
            title="Этапы заявки"
            classNames={{
                panel: "max-w-[640px] w-full",
                footer: "bg-gray-50 p-6 border-t border-gray-200"
            }}
            children={isLoaded ? <Loader /> :
                <div className="flex flex-col gap-6">
                    {isLoaded ? <Loader /> : model.map((stage, key) => (
                        <StageCard stage={stage}
                            footerBlock={
                                <div>
                                    <div className="flex gap-4">
                                        <Button onClick={completeEngineer} class="py-3 px-4 bg-[var(--clr-accent)] text-white">Заверишть этап</Button>
                                        <Button onClick={cancelEngineer} class="py-3 px-4 bg-red-500 text-white">Закрыть этап</Button>
                                    </div>
                                </div>
                            }
                        />
                    ))}
                </div>
            }

            footerSlot={
                <div className="">
                    <InputContainer headerText="Описание" classNames={{ wrapper: "100%" }} >
                        <Textarea
                            className="h-[116px]"
                            placeholder="Описание"
                            value={formModel.discription}
                            onChange={setDiscription}
                        />
                    </InputContainer>
                    <Button class="bg-[#4A85F6] text-white px-6 py-2.5 rounded-lg hover:opacity-50 duration-300 mt-5" onClick={() => create(formModel)}>Создать</Button>
                </div>
            }
        />
    );
})