
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Input } from "@/shared/ui/Inputs/input-text";
import { Modal } from "@/shared/ui/modal/modal";
import { observer } from "mobx-react-lite";
import { createCompaniesModel, CreateCompaniesModel } from "../models/create-company-model";

type Props = {
    show: boolean;
    setShow: (value: boolean) => void;
};

export const CreateEnterprice = observer(({ show, setShow }: Props) => {


    const { model, setAddress, setFio, setWaterCompanyName, setCompanyName,
        setMunicipalityName, clear, store, setContract, canSave } = createCompaniesModel

    const onCloseChange = (value: boolean) => {
        clear();
        setShow(false);
    }

    const handleButton = () => {
        store();
        clear();
        setShow(false);
    }


    return (
        <>
            <Modal
                wrapperId='enterprice'
                type="right"
                show={show}
                setShow={onCloseChange}
                title="Добавление водоканала"
                classNames={{
                    panel: "max-w-[640px] w-full",
                    footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
                }}

                children={
                    <div className="p-8 flex flex-col gap-[30px]">
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Наименование предприятия"
                            isRequired
                        >
                            <Input
                                placeholder="Наименование предприятия"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.company.companyName}
                                onChange={setCompanyName}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="ФИО руководителя"
                            isRequired
                        >
                            <Input
                                placeholder="ФИО руководителя"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.fio}
                                onChange={setFio}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Адрес предприятия"
                            isRequired
                        >
                            <Input
                                placeholder="Адрес предприятия"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.address}
                                onChange={setAddress}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Обслуживающая организация"
                            isRequired
                        >
                            <Input
                                placeholder="Обслуживающая организация"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.company.waterCompanyName}
                                onChange={setWaterCompanyName}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Муниципальное образование"
                            isRequired
                        >
                            <Input
                                placeholder="Муниципальное образование"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.company.municipalityName}
                                onChange={setMunicipalityName}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer
                            headerText="Контракт/договор"
                            isRequired
                            underlineText="Введите ссылку на документ"
                            classNames={{
                                wrapper: "font-semibold leading-none",
                                header: "flex-row-reverse",
                                underlineText: "text-[13px] font-normal"
                            }}
                        >
                            <Input
                                placeholder="Контракт/договор"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.contract}
                                onChange={setContract}
                                type="string"
                            />
                        </InputContainer>
                    </div>
                }

                footerSlot={
                    <div className="px-[31px] pt-[18px] pb-[18px] flex gap-[11px] bg-[#F6F6F6]">
                        <Button children="Сохранить" onClick={handleButton} disabled={canSave} class="bg-[#4a85f6] py-[10px] px-[17px] hover:opacity-50 text-white"></Button>
                        <Button children={<span className="text-[#4a85f6]">Отмена</span>} onClick={onCloseChange} class="font-semibold leading-none hover:opacity-50 border-[#4a85f6] border-[2px] py-[10px] px-[17px]" />
                    </div>
                }
            />
        </>
    );
});