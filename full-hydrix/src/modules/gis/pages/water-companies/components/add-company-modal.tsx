import { observer } from "mobx-react-lite"
import CreateCompanyModel from "../model/create-company-model"
import { useEffect, useState } from "react"
import listModel from "../model/list-model"
import { Modal } from "@/shared/ui/modal/modal"
import { Input } from "@/shared/ui/Inputs/input-text"
import { Button } from "@/shared/ui/button"
import { InputContainer } from "@/shared/ui/Inputs/input-container"
import { Selector } from "@/shared/ui/Selector/selector"

type Props = {
    show: boolean,
    setShow: (value: boolean) => void
}

export const CreateCompanyModal = observer(({ show, setShow }: Props) => {

    const {
        model, changeName,
        changeOperatorEmail, changeOperatorFirstName, changeOperatorLastName,
        changeOperatorPatronymic, changeLogin,
        changeOperatorPhone, changeInn, changeKpp, changeOgrn,
        changeAddress, createCompany, municipalities,
        canCreate, changeMunicipality, municipality, init
    } = CreateCompanyModel;

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <Modal
                wrapperId='register'
                type="right"
                show={show}
                setShow={setShow}
                title="Добавление водоканала"
                classNames={{
                    panel: "max-w-[640px] w-full",
                    footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
                }}

                children={
                    <div className="p-8 flex flex-col gap-[30px]">
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Наименование организации"
                            isRequired
                        >
                            <Input
                                placeholder="Наименование организации"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.name}
                                onChange={changeName}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Логин для авторизации"
                            isRequired
                        >
                            <Input
                                placeholder="Логин для авторизации"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.login}
                                onChange={changeLogin}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Фамилия оператора"
                            isRequired
                        >
                            <Input
                                placeholder="Фамилия оператора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.operatorLastName}
                                onChange={changeOperatorLastName}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Имя оператора"
                            isRequired
                        >
                            <Input
                                placeholder="Имя оператора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.operatorFirstName}
                                onChange={changeOperatorFirstName}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Отчество оператора"
                        >
                            <Input
                                placeholder="Отчество оператора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.operatorPatronymic}
                                onChange={changeOperatorPatronymic}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Телефон оператора"
                            isRequired
                        >
                            <Input
                                placeholder="Телефон оператора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.operatorPhone}
                                onChange={changeOperatorPhone}
                                type="phone"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Email оператора"
                            isRequired
                        >
                            <Input
                                placeholder="Email оператора"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.operatorEmail}
                                onChange={changeOperatorEmail}
                                type="text"
                            />
                        </InputContainer>
                        <div className="flex flex-row w-full gap-4">
                            <InputContainer classNames={{ wrapper: "font-semibold leading-none w-full", header: "flex-row-reverse" }}
                                headerText="ИНН"
                                isRequired
                            >
                                <Input
                                    placeholder="ИНН"
                                    className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                    value={model.inn}
                                    onChange={changeInn}
                                    type="text"
                                />
                            </InputContainer>
                            <InputContainer classNames={{ wrapper: "font-semibold leading-none w-full", header: "flex-row-reverse" }}
                                headerText="КПП"
                                isRequired
                            >
                                <Input
                                    placeholder="КПП"
                                    className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                    value={model.kpp}
                                    onChange={changeKpp}
                                    type="text"
                                />
                            </InputContainer>
                        </div>

                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="Адрес"
                            isRequired
                        >
                            <Input
                                placeholder="Адрес"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.address}
                                onChange={changeAddress}
                                type="text"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "font-semibold leading-none", header: "flex-row-reverse" }}
                            headerText="ОГРН"
                            isRequired
                        >
                            <Input
                                placeholder="ОГРН"
                                className="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                value={model.ogrn}
                                onChange={changeOgrn}
                                type="text"
                            />
                        </InputContainer>


                        <div className={`flex flex-col font-semibold leading-none relative`}>
                            <span className={`font-semibold text-[16px] mb-1`}>
                                Муниципальное образование <span className="text-[#C30707]">*</span>
                            </span>

                            <div className={`flex items-center w-full relative`}>
                                <Selector
                                    classWripper="w-full"
                                    title="Муниципальное образование "
                                    titleClass="border-[1.5px] px-3 py-3 rounded-md mt-2"
                                    items={municipality.map(x => { return { value: x.id, title: x.name } })}
                                    onSelect={(item) => changeMunicipality(Number(item.value))}
                                />
                            </div>
                        </div>
                    </div>
                }
                footerSlot={
                    <div className="px-[31px] pb-[18px] flex gap-[11px] bg-[#F6F6F6] pt-6">
                        <Button disabled={!canCreate} onClick={() => { createCompany(listModel.pushCompany); setShow(false) }} children="Сохранить" class="bg-[#4a85f6] py-[10px] px-[17px]" />

                        <Button class="font-semibold leading-none flex items-center justify-center border-[#4a85f6] border-[2px] py-[10px] px-[17px]" onClick={() => setShow(false)}>
                            <span className="text-[#4a85f6]">Отмена</span>
                        </Button>
                    </div>
                }
            />
        </>
    )
})