import { observer } from 'mobx-react-lite';
import { Button } from "@/packages/shared-ui/button/button"
import { Icon } from "@/packages/shared-ui/icon"
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container"
import { Input } from "@/packages/shared-ui/Inputs/input-text"
import { useCharacteristics } from '../components/characteristic/hook';
import { equipmentCreateModel } from '../model/hardware-form-model';

export const Review = observer(() => {
    const { createCharacteristic, listCharacters, deleteCharacter, createCharacteristicOne } = equipmentCreateModel

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
                class="text-white bg-[var(--clr-accent)] hover:opacity-50 px-4 py-2 gap-3">
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
                            onClick={() => handleRemoveCharacteristic(characteristic.id)}
                            title={"Удалить характеристику"}
                        >
                            <Icon systemName="trash-blue" />
                        </div>

                        <div className={`border-2 rounded-lg px-3 h-[45px] cursor-pointer flex gap-2 hover:opacity-50 duration-300 mb-1 flex items-center justify-center transition-all border-[var(--clr-accent)] hover:bg-red-50`}
                            onClick={() => createCharacteristicOne(characteristic)}
                        >
                            <Icon systemName="plus-accent" />
                            <span className="text-[var(--clr-accent)] text-[14px]">Добавить</span>
                        </div>
                    </div>
                ))}

                {listCharacters.length != 0 && (<><br /><hr /><br /></>)}

                {listCharacters.length > 0 &&
                    listCharacters.map((characteristic, index) => (
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
                                onClick={() => deleteCharacter(characteristic.id)}
                                title={"Удалить характеристику"}
                            >
                                <Icon systemName="trash-blue" />
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* <Button class="mt-10 rounded-lg px-10 py-2 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>Сохранить</Button> */}
        </>
    );
});