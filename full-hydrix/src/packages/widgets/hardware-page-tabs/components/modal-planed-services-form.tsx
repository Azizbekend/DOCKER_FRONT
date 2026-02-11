import { planedServiceFormModel } from '@/modules/dispatcher/features/planed-service/planed-service-form';
import { Button } from '@/packages/shared-ui/button/button';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { Textarea } from '@/packages/shared-ui/textarea';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

interface ModalPlanedServicesFormProps {
    show: boolean;
    setShow: (value: boolean) => void;
    hardwareId: number;
}

export const ModalPlanedServicesForm = observer(({ show, setShow, hardwareId }: ModalPlanedServicesFormProps) => {

    const { model, init, setTitle, setPeriodInHours, create, setInstructionTitle, setInstructionDiscription, instruction, isLookFormInstruction, setIsLookFormInstruction, instructionList, setIdInstruction } = planedServiceFormModel

    useEffect(() => {
        init(hardwareId)
    }, [hardwareId])

    return (
        <Modal title="Создать плановое тех. обуслуживание"
            wrapperId="wardhare"
            type="right"
            show={show}
            setShow={setShow}
            classNames={{
                panel: "max-w-[640px] w-full",
                header: "border-b border-gray-100",
                title: "text-xl font-bold text-gray-800"
            }}
            children={
                <div className="flex flex-col gap-4 p-[28px_20px]">
                    <InputContainer
                        headerText="Наименование"
                        children={
                            <Input
                                className="px-3 py-3"
                                type="text"
                                placeholder="Наименование"
                                value={model.title}
                                onChange={setTitle}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Период в часах"
                        children={
                            <Input
                                className="px-3 py-3"
                                type="number"
                                placeholder="Период"
                                value={model.periodInHours || ""}
                                onChange={setPeriodInHours}
                            />
                        }
                    />



                    <div className='mt-5 mb-3 text-xl font-semibold pt-5 border-t border-gray-500'>Прикрепить инструкцию</div>

                    <div className='flex gap-4'>
                        <Button class='w-full py-2' styleColor={!isLookFormInstruction ? "blue" : "gray"} onClick={() => setIsLookFormInstruction(false)}>Выбрать из списка</Button>
                        <Button class='w-full py-2' styleColor={isLookFormInstruction ? "blue" : "gray"} onClick={() => setIsLookFormInstruction(true)}>Создать новую</Button>
                    </div>


                    {!isLookFormInstruction ?
                        <Selector
                            placeholder="Выбрать инструкцию"
                            items={instructionList}
                            onSelect={(item) => setIdInstruction(item.value)}
                        />
                        :
                        <>
                            <InputContainer
                                headerText="Наименование"
                                children={
                                    <Input
                                        className="px-3 py-3"
                                        type="string"
                                        placeholder="Наименование"
                                        value={instruction.title}
                                        onChange={setInstructionTitle}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Описание"
                                children={
                                    <Textarea
                                        className="h-[300px]"
                                        placeholder="Период"
                                        value={instruction.discription}
                                        onChange={setInstructionDiscription}
                                    />
                                }
                            />
                        </>
                    }


                </div>
            }
            footerSlot={
                <div className="flex justify-end gap-3 p-6">
                    <Button class="px-5 py-2.5 rounded-lg font-medium text-white bg-gray-600 hover:bg-gray-700 transition-colors" onClick={() => setShow(false)}>
                        Отмена
                    </Button>
                    <Button class="px-5 py-2.5 rounded-lg font-medium text-white bg-[#4A85F6] hover:bg-[#3a6bc9] transition-colors shadow-sm" onClick={() => create(() => setShow(false))}>
                        Создать
                    </Button>
                </div>
            }
        />


    );
});