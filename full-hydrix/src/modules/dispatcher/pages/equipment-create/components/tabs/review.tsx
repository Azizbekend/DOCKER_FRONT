import { observer } from 'mobx-react-lite';
import { Button } from "@/shared/ui/button"
import { Icon } from "@/shared/ui/icon"
import { InputContainer } from "@/shared/ui/Inputs/input-container"
import { Input } from "@/shared/ui/Inputs/input-text"
import { useCharacteristics } from '../characteristic/hook';
import { equipmentCreateModel } from '../../model/equipment-create-model';

export const Review = observer(() => {
    const { createCharacteristic } = equipmentCreateModel

    const {
        characteristics,
        addCharacteristic,
        removeCharacteristic,
        updateCharacteristicName,
        updateCharacteristicValue,
    } = useCharacteristics();

    const handleAddCharacteristic = () => {
        addCharacteristic();
    };

    const handleRemoveCharacteristic = (id: string) => {
        removeCharacteristic(id);
    };

    const handleNameChange = (id: string, value: string) => {
        updateCharacteristicName(id, value);
    };

    const handleValueChange = (id: string, value: string) => {
        updateCharacteristicValue(id, value);
    };

    // Функция для отправки данных (пример)
    const handleSubmit = () => {
        createCharacteristic(characteristics.filter(
            char => char.name.trim() !== '' && char.value.trim() !== ''))
    };

    return (
        <>
            <div className="font-semibold text-[28px] mb-[12px]">
                Характеристики
            </div>
            <Button
                onClick={handleAddCharacteristic}
                class="text-white bg-[var(--clr-accent)] hover:opacity-50 px-4 gap-3">
                <Icon systemName="plus-circle-white" />
                <span>Добавить характеристики</span>
            </Button>
            <div className="flex flex-col gap-5 my-10">
                {characteristics.map((characteristic, index) => (
                    <div
                        key={characteristic.id}
                        className="flex gap-3 items-end animate-fade-in"
                    >
                        <InputContainer
                            headerText="Название характеристики"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Название характеристики"
                                    value={characteristic.name}
                                    onChange={(e) => handleNameChange(characteristic.id, e.target.value)}
                                />
                            }
                        />

                        <InputContainer
                            headerText="Значение"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Значение"
                                    value={characteristic.value}
                                    onChange={(e) => handleValueChange(characteristic.id, e.target.value)}
                                />
                            }
                        />

                        {/* Кнопка удаления */}
                        <div
                            className={`border-2 rounded-lg w-[45px] h-[45px] cursor-pointer hover:opacity-50 duration-300 mb-1 flex items-center justify-center transition-all border-[var(--clr-accent)] hover:bg-red-50`}
                            onClick={() => characteristics.length > 1 && handleRemoveCharacteristic(characteristic.id)}
                            title={characteristics.length <= 1 ? "Нельзя удалить последнюю характеристику" : "Удалить характеристику"}
                        >
                            <Icon systemName="trash-blue" />
                        </div>
                    </div>
                ))}
            </div>
            <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>Сохранить</Button>
        </>
    );
});