import { observer } from "mobx-react-lite";
import operatorModel from "../models/operator-model";
import operatorListModel from "../models/operator-list-model";
import { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal/modal";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Input } from "@/shared/ui/Inputs/input-text";

export const OperatorModal = observer(() => {

    const { init, operator, selectedRole, plants, typeModal, canSave, setRole, setLogin, setPlant, setFirstName,
        setLastName, setPatronymic, setEmail, setPhone, store } = operatorModel;
    const { setShowModalChange, showModalChange } = operatorListModel;


    const changeSetShowModal = (value: boolean) => {
        setShowModalChange(value, null)
    }


    useEffect(() => {
        init(operator)
    }, [])

    return (
    <Modal
            wrapperId='sewerInfoModal'
            type="right"
            show={showModalChange}
            setShow={changeSetShowModal}
            title="Подробная информация о заявке"
            classNames={{
                panel: "max-w-[640px] w-full",
            }}

            children={
                <div className="px-8 pt-5 pb-10 flex flex-col gap-[30px]">
                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="Фамилия оператора"
                        isRequired
                    >
                        <Input
                            placeholder="Фамилия оператора"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={operator.lastName}
                            onChange={setLastName}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="Имя оператора"
                        isRequired
                    >
                        <Input
                            placeholder="Имя оператора"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={operator.firstName}
                            onChange={setFirstName}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="Отчество оператора"
                    >
                        <Input
                            placeholder="Отчество оператора"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={operator.patronymic}
                            onChange={setPatronymic}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="Контактный телефон"
                        isRequired
                    >
                        <Input
                            placeholder="Контактный телефон"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={operator.phone}
                            onChange={setPhone}
                            type="phone"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                        headerText="E-mail"
                        isRequired
                    >
                        <Input
                            placeholder="E-mail"
                            className="border-[1.5px] px-3 py-2.5 rounded-md mt-2 text-[14px]"
                            value={operator.email}
                            onChange={setEmail}
                            type="text"
                        />
                    </InputContainer>
                </div>
            }

            footerSlot={
                <div className="px-[31px] pt-[18px] pb-[18px] flex gap-[11px] bg-[#F6F6F6]">
                    <Button children="Сохранить" onClick={store} class="bg-[#4a85f6] py-[10px] px-[17px] hover:opacity-50 text-white"></Button>
                    <Button children={<span className="text-[#4a85f6]">Отмена</span>} onClick={() => changeSetShowModal(false)} class="font-semibold leading-none hover:opacity-50 border-[#4a85f6] border-[2px] py-[10px] px-[17px]" />
                </div >
            }
        />
    );
});