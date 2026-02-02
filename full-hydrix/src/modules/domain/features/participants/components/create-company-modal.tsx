import { observer } from 'mobx-react-lite';
import { createCompanyModel } from '../models/create-company-model';
import { Modal } from "@/packages/shared-ui/modal/modal";
import { useEffect } from 'react';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Button } from '@/packages/shared-ui/button/button';

interface CreateCompanyModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

export const CreateCompanyModal = observer(({ show, setShow }: CreateCompanyModalProps) => {

    const { model, setCompanyName, setShortName, setKpp, setJuridicalAddress, setDirectorName, setPhoneNumber, setOgrn, setInn, setFactAdress, reset, create, } = createCompanyModel;

    useEffect(() => {
        reset()
    }, [])

    return (
        <Modal
            wrapperId="addEmployeeModal"
            type="right"
            show={show}
            setShow={setShow}
            title="Добавить компанию"
            classNames={{ panel: "max-w-2xl", content: "py-8 px-6 w-full" }}
            children={
                <div className='space-y-4'>
                    <InputContainer
                        headerText="Наименование компании"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Наименование компании"
                                value={model.companyName}
                                onChange={setCompanyName}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Короткое наименование"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Короткое наименование"
                                value={model.shortName}
                                onChange={setShortName}
                            />
                        }
                    />
                    <InputContainer
                        headerText="КПП"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="number"
                                placeholder="КПП"
                                value={model.kpp}
                                onChange={setKpp}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Юридический адрес"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Юридический адрес"
                                value={model.juridicalAddress}
                                onChange={setJuridicalAddress}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Имя директора"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Имя директора"
                                value={model.directorName}
                                onChange={setDirectorName}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Номер телефона"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="phone"
                                placeholder="Номер телефона"
                                value={model.phoneNumber}
                                onChange={setPhoneNumber}
                            />
                        }
                    />
                    <div className='flex gap-2 w-full'>
                        <InputContainer
                            headerText="ОГРН"
                            classNames={{
                                wrapper: "w-full"
                            }}
                            children={
                                <Input
                                    className="border-[1.5px] px-3 py-3 rounded-lg"
                                    type="number"
                                    placeholder="ОГРН"
                                    value={model.ogrn}
                                    onChange={setOgrn}
                                />
                            }
                        />
                        <InputContainer
                            headerText="ИНН"
                            classNames={{
                                wrapper: "w-full"
                            }}
                            children={
                                <Input
                                    className="border-[1.5px] px-3 py-3 rounded-lg"
                                    type="number"
                                    placeholder="ИНН"
                                    value={model.inn}
                                    onChange={setInn}
                                />
                            }
                        />
                    </div>
                    <InputContainer
                        headerText="Фактический адрес"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Фактический адрес"
                                value={model.factAdress}
                                onChange={setFactAdress}
                            />
                        }
                    />
                </div>
            }
            footerSlot={
                <div className='flex gap-4 pb-10 px-4 py-4 bg-gray-100'>
                    <Button class='px-6 py-2 w-full' styleColor='green' onClick={() => create(() => setShow(false))}>Создать</Button>
                    <Button class='px-6 py-2 w-full' styleColor='gray' onClick={() => setShow(false)}>Отмена</Button>
                </div>
            }
        />
    );
});