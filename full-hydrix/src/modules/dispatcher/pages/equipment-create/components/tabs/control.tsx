import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { observer } from "mobx-react-lite";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { equipmentCreateModel } from "../../model/equipment-create-model";
import { useControl } from "../control/hook";
import InputCheckbox from "@/shared/ui/Inputs/input-checkbox";
import { SwitchButton } from "@/shared/ui/switch-button";

export const Control = observer(() => {
    const { createControl } = equipmentCreateModel

    const {
        control,
        add,
        remove,
        updateName,
        updateMesurement,
        updatePlcNodeid,
        updateIsValue,
        updateIsInfo,
    } = useControl();

    const handleAddCharacteristic = () => {
        add();
    };
    const handleRemoveCharacteristic = (id: string) => {
        remove(id);
    };
    const handleNameChange = (id: string, value: string) => {
        updateName(id, value);
    };
    const handleMesurementChange = (id: string, value: string) => {
        updateMesurement(id, value);
    };
    const handleIsValue = (id: string, value: boolean) => {
        updateIsValue(id, value);
    };
    const handleIsInfo = (id: string, value: boolean) => {
        updateIsInfo(id, value);
    };
    const handlePlcNodeidChange = (id: string, value: string) => {
        updatePlcNodeid(id, value);
    };

    // Функция для отправки данных (пример)
    const handleSubmit = () => {
        createControl(control)
    };


    return (
        <>
            <div className="font-semibold text-[28px] mb-[12px]">
                Управление
            </div>
            <Button
                onClick={handleAddCharacteristic}
                class="text-white bg-[var(--clr-accent)] hover:opacity-50 px-4 gap-3">
                <Icon systemName="plus-circle-white" />
                <span>Добавить управление</span>
            </Button>

            <div className="my-10 flex flex-col gap-5">
                {control.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex gap-3 items-end animate-fade-in"
                    >
                        <InputContainer
                            headerText="Идентификатор ПЛК"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Идентификатор ПЛК"
                                    value={item.plcNodeid}
                                    onChange={(e) => handlePlcNodeidChange(item.id, e.target.value)}
                                />
                            }
                        />

                        <InputContainer
                            headerText="Наименование"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Наименование"
                                    value={item.name}
                                    onChange={(e) => handleNameChange(item.id, e.target.value)}
                                />
                            }
                        />

                        <InputContainer
                            headerText="ед. измерения"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="ед. измерения"
                                    value={item.mesurement}
                                    onChange={(e) => handleMesurementChange(item.id, e.target.value)}
                                />
                            }
                        />

                        <div>
                            <InputContainer
                                // headerText="Тип number"
                                classNames={{
                                    wrapper: "w-[150px] h-full",
                                    children: "flex items-center !h-12 justify-start h-full"
                                }}
                                children={
                                    <InputCheckbox
                                        label="Тип number"
                                        checked={item.isValue}
                                        onChange={(e) => handleIsValue(item.id, e.target.checked)}
                                    />
                                }
                            />

                            <InputContainer
                                headerText=""
                                classNames={{
                                    wrapper: "w-min h-full",
                                    children: "flex items-center justify-center h-full"
                                }}
                                children={
                                    <InputCheckbox
                                        checked={item.isInfo}
                                        label="Информационный"
                                        onChange={(e) => handleIsInfo(item.id, e.target.checked)}
                                    />
                                }
                            />
                        </div>

                        {/* Кнопка удаления */}
                        <div
                            className={`border-2 rounded-lg w-[45px] h-[45px] cursor-pointer hover:opacity-50 duration-300 mb-1 flex items-center justify-center transition-all border-[var(--clr-accent)] hover:bg-red-50`}
                            onClick={() => control.length > 1 && handleRemoveCharacteristic(item.id)}
                            title={control.length <= 1 ? "Нельзя удалить последнюю характеристику" : "Удалить характеристику"}
                        >
                            <Icon systemName="trash-blue" />
                        </div>
                    </div>
                ))}
            </div >

            <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>Сохранить</Button>
        </>
    );
});