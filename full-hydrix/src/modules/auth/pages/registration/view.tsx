import { observer } from 'mobx-react-lite';
import registrationModel from './model/registration-model';

import { Input } from '@/shared/ui/Inputs/input-text';
import { Modal } from '@/shared/ui/modal/modal';
import { Selector } from '@/shared/ui/Selector/selector';
import { Button } from '@/shared/ui/button';
import { InputContainer } from '@/shared/ui/Inputs/input-container';


type RegistrationModalProps = {
    show: boolean;
    onClose: () => void;
}

export const RegistrationView = observer(({ show, onClose }: RegistrationModalProps) => {
    const { model, isLoading, canSubmit, submitRegistration, reset, setOrganizationName, setEmail, setSurname, setName, setPatronymic, setPhone, setInn, setKpp, setAddress, setOgrn, setMunicipal, } = registrationModel;

    const handleSelectMunicipalFormation = (item: { value: string | number; title: string }) => {
        // setMunicipalFormation(item.title);
    };

    const handleSubmit = () => {
        // if (canSubmit()) {
        //     submitRegistration(
        //         () => {
        //             reset();
        //             onClose();
        //         },
        //         (error) => {
        //             console.error('Registration error:', error);
        //         }
        //     );
        // }
    };

    const handleCancel = () => {
        // reset();
        onClose();
    };

    return (
        <Modal
            wrapperId='register'
            type="right"
            show={show}
            setShow={onClose}
            title="Заявка на регистрацию в системе"
            classNames={{
                panel: "max-w-[640px] w-full",
                footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
            }}

            children={
                <div className="flex flex-col gap-4 p-[28px_20px]">
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Наименование организации"
                        isRequired
                    >
                        <Input
                            placeholder="Наименование организации"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.organizationName}
                            onChange={setOrganizationName}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Логин для авторизации (электронная почта)"
                        isRequired
                    >
                        <Input
                            placeholder="Почта"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.email}
                            onChange={setEmail}
                            disabled={isLoading}
                            type="email"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Фамилия"
                        isRequired
                    >
                        <Input
                            placeholder="Фамилия"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.surname}
                            onChange={setSurname}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Имя"
                        isRequired
                    >
                        <Input
                            placeholder="Имя"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.name}
                            onChange={setName}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Отчество"
                        isRequired
                    >
                        <Input
                            placeholder="Отчество"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.patronymic}
                            onChange={setPatronymic}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Контактный"
                        isRequired
                    >
                        <Input
                            placeholder="Контактный"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.phone}
                            onChange={setPhone}
                            disabled={isLoading}
                            type="phone"
                        />
                    </InputContainer>

                    <div className='flex gap-[30px]'>
                        <InputContainer classNames={{ wrapper: "w-full", }}
                            headerText="ИНН"
                            isRequired
                        >
                            <Input
                                placeholder="ИНН"
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                value={model.inn}
                                onChange={setInn}
                                disabled={isLoading}
                                type="number"
                            />
                        </InputContainer>
                        <InputContainer classNames={{ wrapper: "w-full", }}
                            headerText="КПП"
                            isRequired
                        >
                            <Input
                                placeholder="КПП"
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                value={model.kpp}
                                onChange={setKpp}
                                disabled={isLoading}
                                type="number"
                            />
                        </InputContainer>
                    </div>

                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Адрес"
                        isRequired
                    >
                        <Input
                            placeholder="Адрес"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.address}
                            onChange={setAddress}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="ОГРН"
                        isRequired
                    >
                        <Input
                            placeholder="ОГРН"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.ogrn}
                            onChange={setOgrn}
                            disabled={isLoading}
                            type="number"
                        />
                    </InputContainer>
                    <InputContainer classNames={{ wrapper: "w-full", }}
                        headerText="Муниципальное образование"
                        isRequired
                    >
                        <Input
                            placeholder="Муниципальное образование"
                            className="border-[1.5px] px-3 py-3 rounded-lg"
                            value={model.municipal}
                            onChange={setMunicipal}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>
                </div>
            }

            footerSlot={
                <div className="flex flex-row gap-4">
                    <Button
                        class="bg-[#4A85F6] text-white px-6 py-2.5 rounded-lg font-bold hover:opacity-50 duration-300"
                        onClick={handleSubmit}
                    // disabled={!canSubmit()}
                    >
                        Сохранить
                    </Button>
                    <Button
                        class="text-[var(--clr-accent)] px-6 py-2.5 rounded-lg font-bold border border-[var(--clr-accent)] hover:bg-[var(--clr-accent)] hover:text-white duration-300"
                        onClick={handleCancel}
                    >
                        Отменить
                    </Button>
                </div>
            }
        />
    );
});
