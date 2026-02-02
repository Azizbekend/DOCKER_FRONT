import { observer } from 'mobx-react-lite';
import { Modal } from "@/packages/shared-ui/modal/modal";
import { useEffect } from 'react';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Button } from '@/packages/shared-ui/button/button';
import { createParticipantsModel } from '../models/create-participants-model';

interface CreateParticipantsModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    companyData: any;
}

export const CreateParticipantsModal = observer(({ show, setShow, companyData }: CreateParticipantsModalProps) => {

    const { model, setLogin, setPassword, setFirstName, setLastName, setPatronymic, setEmail, setPhoneNumber, setAdress, reset, create } = createParticipantsModel
    useEffect(() => {
        reset()
    }, [])

    const onSubmit = () => {
        create(() => setShow(false), companyData)
    }

    return (
        <Modal
            wrapperId="addEmployeeModal"
            type="right"
            show={show}
            setShow={setShow}
            title="Создать участника"
            classNames={{ panel: "max-w-2xl", content: "py-8 px-6 w-full" }}
            children={
                <div className='space-y-4'>
                    <InputContainer
                        headerText="Логин"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Логин"
                                value={model.login}
                                onChange={setLogin}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Пароль"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Пароль"
                                value={model.password}
                                onChange={setPassword}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Имя"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Имя"
                                value={model.firstName}
                                onChange={setFirstName}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Фамилия"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Фамилия"
                                value={model.lastName}
                                onChange={setLastName}
                            />
                        }
                    />
                    <InputContainer
                        headerText="Отчество"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Отчество"
                                value={model.patronymic}
                                onChange={setPatronymic}
                            />
                        }
                    />
                    <div className='flex gap-2 w-full'>
                        <InputContainer
                            headerText="Эл. почта"
                            classNames={{
                                wrapper: "w-full"
                            }}
                            children={
                                <Input
                                    className="border-[1.5px] px-3 py-3 rounded-lg"
                                    type="text"
                                    placeholder="Эл. почта"
                                    value={model.email}
                                    onChange={setEmail}
                                />
                            }
                        />
                        <InputContainer
                            headerText="Номер телефона"
                            classNames={{
                                wrapper: "w-full"
                            }}
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
                    </div>
                    <InputContainer
                        headerText="Адрес"
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="string"
                                placeholder="Адрес"
                                value={model.adress}
                                onChange={setAdress}
                            />
                        }
                    />
                </div>
            }
            footerSlot={
                <div className='flex gap-4 pb-10 px-4 py-4 bg-gray-100'>
                    <Button class='px-6 py-2 w-full' styleColor='green' onClick={onSubmit}>Создать</Button>
                    <Button class='px-6 py-2 w-full' styleColor='gray' onClick={() => setShow(false)}>Отмена</Button>
                </div>
            }
        />
    );
});