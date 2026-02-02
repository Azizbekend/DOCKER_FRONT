import { observer } from 'mobx-react-lite';
import registrationModel from './model/registration-model';

import { Input } from '@/packages/shared-ui/Inputs/input-text';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { Button } from '@/packages/shared-ui/button/button';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';

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
                footer: "bg-gray-50 p-6 border-t border-gray-200"
            }}
            children={
                <div className="flex flex-col gap-4 p-[28px_20px]">
                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="Наименование организации"
                        isRequired
                    >
                        <Input
                            placeholder="Введите наименование организации"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.organizationName}
                            onChange={setOrganizationName}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>

                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="Электронная почта"
                        isRequired
                    >
                        <Input
                            placeholder="Введите электронную почту"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.email}
                            onChange={setEmail}
                            disabled={isLoading}
                            type="email"
                        />
                    </InputContainer>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputContainer
                            classNames={{
                                wrapper: "w-full",
                                header: "text-sm font-medium text-gray-700 mb-2"
                            }}
                            headerText="Фамилия"
                            isRequired
                        >
                            <Input
                                placeholder="Фамилия"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                                value={model.surname}
                                onChange={setSurname}
                                disabled={isLoading}
                                type="text"
                            />
                        </InputContainer>

                        <InputContainer
                            classNames={{
                                wrapper: "w-full",
                                header: "text-sm font-medium text-gray-700 mb-2"
                            }}
                            headerText="Имя"
                            isRequired
                        >
                            <Input
                                placeholder="Имя"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                                value={model.name}
                                onChange={setName}
                                disabled={isLoading}
                                type="text"
                            />
                        </InputContainer>

                        <InputContainer
                            classNames={{
                                wrapper: "w-full",
                                header: "text-sm font-medium text-gray-700 mb-2"
                            }}
                            headerText="Отчество"
                            isRequired
                        >
                            <Input
                                placeholder="Отчество"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                                value={model.patronymic}
                                onChange={setPatronymic}
                                disabled={isLoading}
                                type="text"
                            />
                        </InputContainer>
                    </div>

                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="Контактный телефон"
                        isRequired
                    >
                        <Input
                            placeholder="+7 (___) ___-__-__"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.phone}
                            onChange={(value) => setPhone(value)}
                            disabled={isLoading}
                            type="phone"
                        />
                    </InputContainer>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ИНН — только 10 цифр */}
                        <InputContainer
                            classNames={{
                                wrapper: "w-full",
                                header: "text-sm font-medium text-gray-700 mb-2"
                            }}
                            headerText="ИНН"
                            isRequired
                        >
                            <Input
                                placeholder="1234567890"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                                value={model.inn}
                                onChange={(value) => {
                                    // Оставляем только цифры и ограничиваем до 10 символов
                                    const digitsOnly = value.replace(/\D/g, '').substring(0, 10);
                                    setInn(digitsOnly);
                                }}
                                disabled={isLoading}
                                type="text"
                            // inputMode="numeric"
                            />
                        </InputContainer>

                        {/* КПП — только 9 цифр */}
                        <InputContainer
                            classNames={{
                                wrapper: "w-full",
                                header: "text-sm font-medium text-gray-700 mb-2"
                            }}
                            headerText="КПП"
                            isRequired
                        >
                            <Input
                                placeholder="123456789"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                                value={model.kpp}
                                onChange={(value) => {
                                    // Оставляем только цифры и ограничиваем до 9 символов
                                    const digitsOnly = value.replace(/\D/g, '').substring(0, 9);
                                    setKpp(digitsOnly);
                                }}
                                disabled={isLoading}
                                type="text"
                            // inputMode="numeric"
                            />
                        </InputContainer>
                    </div>

                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="Адрес"
                        isRequired
                    >
                        <Input
                            placeholder="420000, Республика Татарстан, г. Казань, ул. Баумана, д. 25, офис 3"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.address}
                            onChange={setAddress}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>

                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            header: "text-sm font-medium text-gray-700 mb-2"
                        }}
                        headerText="ОГРН"
                        isRequired
                    >
                        <Input
                            placeholder="ОГРН"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.ogrn}
                            onChange={setOgrn}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer>

                    {/* <InputContainer 
                        classNames={{ 
                            wrapper: "w-full", 
                            header: "text-sm font-medium text-gray-700 mb-2" 
                        }}
                        headerText="Муниципальное образование"
                        isRequired
                    >
                        <Input
                            placeholder="Введите муниципальное образование"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-all duration-200"
                            value={model.municipal}
                            onChange={setMunicipal}
                            disabled={isLoading}
                            type="text"
                        />
                    </InputContainer> */}
                </div>
            }
            footerSlot={
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        class="bg-[#4A85F6] text-white px-6 py-2.5 rounded-lg font-bold hover:opacity-50 duration-300"
                        onClick={handleSubmit}
                    >
                        Отправить заявку
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