import { observer } from "mobx-react-lite";
import { plantsListModel } from "../model/drain-stations-model";
import { Modal } from "@/shared/ui/modal/modal";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/Inputs/input-text";
import { useEffect } from "react";
import { editPlantModel } from "../model/plant-modal-model";
import { toast } from "react-toastify";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Icon } from "@/shared/ui/icon";
import { Selector } from "@/shared/ui/Selector/selector";

export const StationModal = observer(() => {
    const { showModalInfo, setShowModalInfo, typeModal, setTypeModal, focusedPlant, push, updatePlant } = plantsListModel;
    const {
        init, changeName, changeLimit, changeTariff, changeAddressText, changeAddressLonLat, changeFirstName, changeLastName,
        changePatronymic, changePost, changeEmail, changePhone, model, modelTariff, municipalities, selectedMunicipalities,
        adress, canSave, edit, createPlant, changeLongitude, changeLatitude, selectMunicipality
    } = editPlantModel;


    useEffect(() => {
        init(focusedPlant, typeModal)
    }, [])

    const changeСance = () => {
        setShowModalInfo(false);
        setTypeModal("");
    }

    const handleButton = () => {
        // const companyId = gisModel.waterCompany?.id || 0;
        try {
            if (typeModal == "add") {
                createPlant(0, push)
                    .then(() => {
                        toast.success("Станция успешно создана", { progressStyle: { background: "green" } });
                    })
            } else {

                edit(0, updatePlant)
                    .then(() => {
                        toast.success("Станция успешно обвновлена", { progressStyle: { background: "green" } });
                    })
            }
        } catch (error) {
            toast.error("Ошибка при сохранении станции", { progressStyle: { background: "red" } });
        } finally {
            setShowModalInfo(false);
        }
    };

    return (
        <Modal
            wrapperId='sewerInfoModal'
            type="right"
            show={showModalInfo}
            setShow={changeСance}
            title="Подробная информация о заявке"
            classNames={{
                panel: "max-w-[640px] w-full",
            }}

            children={
                <div className="px-8 pt-5 pb-10 flex flex-col gap-[30px]">
                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="Суточный лимит станции"
                        isRequired
                    >
                        <Input
                            placeholder="Суточный лимит станции"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={model.dailyLimit}
                            onChange={changeLimit}
                            type="number"
                        />
                    </InputContainer>

                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="Тариф"
                        isRequired
                    >
                        <Input
                            placeholder="Тариф"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={modelTariff}
                            onChange={changeTariff}
                            type="number"
                        />
                    </InputContainer>

                    <InputContainer classNames={{ wrapper: "font-semibold leading-none relative", header: "flex-row-reverse" }}
                        headerText="Адрес"
                        isRequired
                    >
                        <Input
                            placeholder="Тариф"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={adress}
                            onChange={(e) => { changeAddressText(e); setShow(true) }}
                            type="text"
                        />

                        {/* {(suggestions.length > 0 && model.adress.length > 0 && show) && (
                            <ul className='absolute z-10 bg-white border-[#4A85F6] border-[1px] rounded-lg max-h-[400px] overflow-y-auto max-w-full adress'>
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => { handleSuggestionClick(suggestion) }} className='adress px-3 py-2 cursor-pointer hover:bg-[#4A85F624] hover:rounded-lg'>
                                        <div className="adress">{suggestion.address}</div>
                                    </li>
                                ))}
                            </ul>
                        )} */}

                        {/* <div ref={mapContainer} style={{ width: '100%', height: '400px' }} /> */}

                    </InputContainer>


                    <div className="flex gap-5">
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none w-full", header: "flex-row-reverse" }}
                            headerText="Широта"
                            isRequired
                        >
                            <Input
                                placeholder="Широта"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.latitude}
                                onChange={changeLatitude}
                                type="number"
                            />
                        </InputContainer>

                        <InputContainer classNames={{ wrapper: "font-semibold leading-none w-full", header: "flex-row-reverse" }}
                            headerText="Долгота"
                            isRequired
                        >
                            <Input
                                placeholder="Долгота"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.longitude}
                                onChange={changeLongitude}
                                type="number"
                            />

                        </InputContainer>
                    </div>

                    <InputContainer classNames={{
                        wrapper: "font-semibold leading-none w-full",
                        header: "flex-row-reverse",
                        children: "flex flex-col gap-3 mt-3"
                    }}
                        headerText="Обслуживаемые территории"
                        isRequired
                    >

                        {selectedMunicipalities.length > 0 ? (
                            selectedMunicipalities.map(x => (
                                <div
                                    key={x.id}
                                    className="font-normal flex justify-between w-full gap-4"
                                >
                                    {x.name}
                                    <Icon
                                        systemName="delete-grey"
                                        width={20}
                                        height={20}
                                        className="cursor-pointer"
                                        onClick={() => selectMunicipality(x)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Выбранные территории отсутствуют.</p>
                        )}

                    </InputContainer>

                    <InputContainer classNames={{ wrapper: "font-semibold leading-none w-full", header: "flex-row-reverse" }}
                        headerText="Добавить территорию"
                        isRequired
                    >

                        <Selector
                            items={municipalities.map((x) => ({
                                value: x.id,
                                title: x.name,
                            }))}
                            notEditTitle
                            title="Выберите территорию"
                            classWripper="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px] w-full"
                            className="text-[14px]"
                            onSelect={(item) => {
                                const selectedMunicipality = municipalities.find((x) => x.id === Number(item.value));
                                if (selectedMunicipality) { selectMunicipality(selectedMunicipality) }
                            }}
                        />
                    </InputContainer>

                    <p className="text-lg font-semibold">Контактные данные представителя</p>
                    <div className="grid grid-cols-2 gap-[30px]">
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Фамилия"
                            isRequired
                        >
                            <Input
                                placeholder="Фамилия"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.lastName}
                                onChange={changeLastName}
                                type="string"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Имя"
                            isRequired
                        >
                            <Input
                                placeholder="Имя"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.firstName}
                                onChange={changeFirstName}
                                type="string"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Отчество"
                        >
                            <Input
                                placeholder="Отчество"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.patronymic}
                                onChange={changePatronymic}
                                type="string"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Должность"
                            isRequired
                        >
                            <Input
                                placeholder="Должность"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.post}
                                onChange={changePost}
                                type="string"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Телефон"
                            isRequired
                        >
                            <Input
                                placeholder="Телефон"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.phone}
                                onChange={changePhone}
                                type="phone"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Email"
                            isRequired
                        >
                            <Input
                                placeholder="Email"
                                className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                                value={model?.email}
                                onChange={changeEmail}
                                type="email"
                            />
                        </InputContainer>
                    </div>
                </div>
            }

            footerSlot={
                <div className="px-[31px] pt-[18px] pb-[18px] flex gap-[11px] bg-[#F6F6F6]">
                    <Button children="Сохранить" onClick={handleButton} disabled={canSave} class="bg-[#4a85f6] py-[10px] px-[17px] hover:opacity-50 text-white"></Button>
                    <Button children={<span className="text-[#4a85f6]">Отмена</span>} onClick={changeСance} class="font-semibold leading-none hover:opacity-50 border-[#4a85f6] border-[2px] py-[10px] px-[17px]" />
                </div >
            }
        />
    );
});