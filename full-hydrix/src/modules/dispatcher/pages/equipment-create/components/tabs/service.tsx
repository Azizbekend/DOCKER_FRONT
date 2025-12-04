import { observer } from "mobx-react-lite";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Selector } from "@/shared/ui/Selector/selector";
import { useService } from "../service/hook";

export const Service = observer(() => {

    const {
        service,
        add,
        remove,
        updateName,
        updateMesurement,
        updatePlcNodeid,
        updateIsValue,
        updateIsInfo,
    } = useService();

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
        createControl(control.filter(item => item.name.trim() !== '' && item.mesurement.trim() !== '' && item.plcNodeid.trim() !== ''))
    };

    const handleSelect = (item: { value: string | number; title: string; }) => {

    }

    const selectItems: { value: string | number; title: string; }[] = [
        {
            value: 1,
            title: "Час",
        },
        {
            value: 24,
            title: "День",
        },
        {
            value: (24 * 7),
            title: "Неделя",
        },
        {
            value: (24 * 30),
            title: "Месяц",
        },
        {
            value: (24 * 365),
            title: "Год",
        },
    ]



    return (
        <>
            <div className="font-semibold text-[28px] mb-[12px]">
                Сервис
            </div>
            <Button
                onClick={handleAddCharacteristic}
                class="text-white bg-[var(--clr-accent)] hover:opacity-50 px-4 gap-3">
                <Icon systemName="plus-circle-white" />
                <span>Добавить сервис</span>
            </Button>
            <div className="my-10 flex flex-col gap-5">
                {characteristics.map((characteristic, index) => (
                    <div key={index} className="flex gap-3 items-end animate-fade-in">
                        <InputContainer
                            headerText="Описание заявки"
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
                            headerText="Период"
                            classNames={{
                                wrapper: "w-[300px]"
                            }}
                            children={
                                <div className="flex items-center gap-3 w-full">
                                    <input
                                        className="w-[120px] border-[1.5px] px-3 py-3 rounded-lg outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="number"
                                        placeholder="Период"
                                        value={characteristic.value}
                                        onChange={(e) => handleValueChange(characteristic.id, e.target.value)}
                                    />

                                    <Selector
                                        titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                        classWripper="!w-full"
                                        title="Месяц"
                                        onSelect={handleSelect}
                                        items={selectItems}
                                    />
                                </div>
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
    )
});