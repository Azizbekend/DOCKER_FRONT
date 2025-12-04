import { observer } from "mobx-react-lite";
import operatorListModel from "../models/operator-list-model";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Input } from "@/shared/ui/Inputs/input-text";
import { Modal } from "@/shared/ui/modal/modal";
import { OperatorRole, operatorRole } from "@/entities/user/hooks";

export const OperatorInfoModal = observer(() => {

    const { setShowInfo, showInfo, operator } = operatorListModel;

    const onShowClose = (value: boolean) => {
        setShowInfo(value, null);
    }

    return (
        <>

            <Modal
                wrapperId='operatorListModel'
                type="right"
                show={showInfo}
                setShow={onShowClose}
                title="Информация об Операторе"
                classNames={{
                    panel: "max-w-[640px] w-full",
                    footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
                }}

                children={

                    <div className="px-[31px] py-8 flex flex-col gap-[30px] mb-[55px]">

                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Фамилия"
                        >
                            <Input
                                type='text'
                                disabled
                                value={operator?.lastName}
                                placeholder="Почта"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Имя"
                        >
                            <Input
                                type='text'
                                disabled
                                value={operator?.firstName}
                                placeholder="Почта"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Телефон"
                        >
                            <Input
                                type='text'
                                disabled
                                value={operator?.patronymic}
                                placeholder="Почта"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="E-mail"
                        >
                            <Input
                                type='text'
                                disabled
                                value={operator?.phone}
                                placeholder="Почта"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Роль"
                        >
                            <Input
                                type='text'
                                disabled
                                value={operator?.email}
                                placeholder="Почта"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Роль"
                        >
                            <Input
                                type='text'
                                disabled
                                value={operator?.roleName}
                                placeholder="Роль"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                            />
                        </InputContainer>


                        {operator?.roleName === OperatorRole.Plant &&
                            <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                                headerText="Название ОС"
                            >
                                <Input
                                    type='text'
                                    disabled
                                    value={operator?.workplace}
                                    placeholder="Название ОС"
                                    className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                />
                            </InputContainer>
                        }
                    </div>
                }
            />
        </>
    )
});