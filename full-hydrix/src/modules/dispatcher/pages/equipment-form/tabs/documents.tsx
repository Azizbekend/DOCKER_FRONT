import { observer } from 'mobx-react-lite';
import { Button } from "@/shared/ui/button"
import { Icon } from "@/shared/ui/icon"
import { InputContainer } from "@/shared/ui/Inputs/input-container"
import { Input } from "@/shared/ui/Inputs/input-text"
import { useCharacteristics } from '../components/characteristic/hook';
import { equipmentCreateModel } from '../model/equipment-form-model';

export const Documents = observer(() => {
    const { createDocument, listDocuments } = equipmentCreateModel



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

    return (
        <>
            <div className="font-semibold text-[28px] mb-[12px]">
                Документы
            </div>
            <Button
                onClick={handleAddCharacteristic}
                class="text-white bg-[var(--clr-accent)] hover:opacity-50 px-4 gap-3">
                <Icon systemName="plus-circle-white" />
                <span>Добавить документы</span>
            </Button>
            <div className="flex flex-col gap-5 my-10">

                {characteristics.map((characteristic, index) => (
                    <div
                        key={characteristic.id}
                        className="flex gap-3 items-end animate-fade-in"
                    >
                        <InputContainer
                            headerText="Название документа"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Название документа"
                                    value={characteristic.name}
                                    onChange={(e) => handleNameChange(characteristic.id, e.target.value)}
                                />
                            }
                        />
                        <InputContainer
                            headerText="Файл"
                            classNames={{
                                wrapper: "w-[500px]"
                            }}
                        >
                            <label
                                htmlFor={`file-${characteristic.id}`}
                                className="border-[1.5px] rounded-lg px-4 py-3 w-full flex items-center justify-between gap-3 cursor-pointer transition-all"
                            >
                                {/* Invisible input */}
                                <input
                                    id={`file-${characteristic.id}`}
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleValueChange(characteristic.id, e.target.files[0])}
                                />


                                <span className="truncate text-[var(--clr-text)]">
                                    {characteristic.value?.name || "Загрузите файл"}
                                </span>

                                {/* Icon */}
                                <svg
                                    className="w-6 h-6 flex-shrink-0 opacity-70"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M16.5 6.5v7a4.5 4.5 0 01-9 0V3.5a2.5 2.5 0 015 0v8.5a.5.5 0 01-1 0V3.5a1.5 1.5 0 00-3 0v10a3.5 3.5 0 007 0v-7a.5.5 0 011 0z"></path>
                                </svg>
                            </label>
                        </InputContainer>


                        {/* Кнопка удаления */}
                        <div
                            className={`border-2 rounded-lg w-[45px] h-[45px] cursor-pointer hover:opacity-50 duration-300 mb-1 flex items-center justify-center transition-all border-[var(--clr-accent)] hover:bg-red-50`}
                            onClick={() => characteristics.length > 1 && handleRemoveCharacteristic(characteristic.id)}
                            title={characteristics.length <= 1 ? "Нельзя удалить последнюю характеристику" : "Удалить характеристику"}
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

                {listDocuments.length != 0 && (<><br /><hr /><br /></>)}

                {listDocuments.length > 0 &&
                    listDocuments.map((characteristic, index) => (
                        <div
                            key={characteristic.id}
                            className="flex gap-3 items-end animate-fade-in"
                        >
                            <InputContainer
                                headerText="Название документы"
                                classNames={{
                                    wrapper: "w-[500px]"
                                }}
                                children={
                                    <input
                                        className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="text"
                                        placeholder="Название документы"
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
                                onClick={() => characteristics.length > 1 && deleteCharacter(characteristic.id)}
                                title={characteristics.length <= 1 ? "Нельзя удалить последнюю характеристику" : "Удалить характеристику"}
                            >
                                <Icon systemName="trash-blue" />
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>Сохранить</Button> */}
        </>
    );
});