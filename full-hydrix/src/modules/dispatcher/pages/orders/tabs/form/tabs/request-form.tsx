import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Input } from "@/shared/ui/Inputs/input-text";
import { observer } from 'mobx-react-lite';
import { createRequestModel } from "../../../model/create-request-model";
import { SelectorSearch } from "@/shared/ui/Selector/selector-search";
import { Button } from "@/shared/ui/button";

export const RequestForm = observer(() => {
    const { model, setType, setDescription, setCompany, setForCreate, setFio, setDateCreate, setOperator, setPhone, setEmail } = createRequestModel

    return (
        <div className="grid grid-cols-[60%_35%] justify-between pr-6">
            <div>
                <div className="text-[28px] mb-3 font-semibold">Создана</div>
                <InputContainer
                    classNames={{
                        wrapper: "w-[260px] mb-5",
                        children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                    }}
                    headerText="Типовая заявка"
                >

                    <SelectorSearch
                        placeholder="Типовая заявка"
                        items={[
                            {
                                value: 1,
                                title: "Типовая заявка 1",
                            },
                            {
                                value: 2,
                                title: "Типовая заявка 2",
                            },
                            {
                                value: 3,
                                title: "Типовая заявка 3",
                            },
                        ]}
                        onSelect={setType}
                        icon="arrow-down"
                    />
                </InputContainer>

                <InputContainer
                    headerText="Описание"
                    classNames={{
                        children: "border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                    }}>
                    <textarea
                        className="h-[116px]"
                        placeholder="Описание"
                        value={model.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </InputContainer>

                <div className="flex gap-5 mt-5">
                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}
                        headerText="Организация-Заказчик:"
                        isRequired
                    >
                        <SelectorSearch
                            classWripper="w-full"
                            placeholder="Типовая заявка"
                            items={[
                                {
                                    value: 1,
                                    title: "Типовая заявка 1",
                                },
                                {
                                    value: 2,
                                    title: "Типовая заявка 2",
                                },
                                {
                                    value: 3,
                                    title: "Типовая заявка 3",
                                },
                            ]}
                            onSelect={setType}
                            icon="arrow-down"
                        />
                    </InputContainer>

                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}
                        headerText="Создана"
                    >
                        <SelectorSearch
                            classWripper="w-full"
                            placeholder="Типовая заявка"
                            items={[
                                {
                                    value: 1,
                                    title: "Типовая заявка 1",
                                },
                                {
                                    value: 2,
                                    title: "Типовая заявка 2",
                                },
                                {
                                    value: 3,
                                    title: "Типовая заявка 3",
                                },
                            ]}
                            onSelect={setType}
                            icon="arrow-down"
                        />
                    </InputContainer>
                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}
                        headerText="ФИО:"
                    >
                        <Input
                            placeholder="ФИО"
                            type="text"
                            value={model.fio}
                            onChange={setFio}
                            className="w-full"
                        />
                    </InputContainer>
                </div>
            </div>
            <div>
                <div className="text-[28px] mb-3 font-semibold">Заявитель</div>
                <InputContainer
                    classNames={{
                        wrapper: "w-[350px] mb-5",
                        children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                    }}
                    headerText="Организация-заявитель:"
                >

                    <SelectorSearch
                        classWripper="w-full"
                        placeholder="Организация-заявитель:"
                        items={[
                            {
                                value: 1,
                                title: "Типовая заявка 1",
                            },
                            {
                                value: 2,
                                title: "Типовая заявка 2",
                            },
                            {
                                value: 3,
                                title: "Типовая заявка 3",
                            },
                        ]}
                        onSelect={setType}
                        icon="arrow-down"
                    />
                </InputContainer>

                <div className="flex justify-between mb-5">
                    <InputContainer
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}
                        headerText="Сотрудник-заявитель:"
                    >

                        <SelectorSearch
                            classWripper="w-full"
                            placeholder="Сотрудник-заявитель:"
                            items={[
                                {
                                    value: 1,
                                    title: "Типовая заявка 1",
                                },
                                {
                                    value: 2,
                                    title: "Типовая заявка 2",
                                },
                                {
                                    value: 3,
                                    title: "Типовая заявка 3",
                                },
                            ]}
                            onSelect={setType}
                            icon="arrow-down"
                        />
                    </InputContainer>

                    <InputContainer
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}
                        headerText="Сотрудник-заявитель:"
                    >
                        <Input
                            type="date"
                            value={model.dateCreate}
                            onChange={setDateCreate}
                        />
                    </InputContainer>

                </div>

                <div className="flex justify-between mb-5">
                    <InputContainer
                        headerText="Контактный телефон"
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "flex-row border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}

                        iconName="phone"
                    >
                        <Input
                            className="pl-8"
                            type="phone"
                            value={model.phone}
                            onChange={setPhone}
                        />
                    </InputContainer>
                    <InputContainer
                        headerText="Контактный телефон"
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "flex-row-reverse border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC]"
                        }}

                        iconName="mail"
                    >
                        <Input
                            type="email"
                            value={model.email}
                            onChange={setEmail}
                        />
                    </InputContainer>
                </div>
            </div>

            <Button
                class="rounded py-2 px-10 bg-[var(--clr-accent)] text-white hover:opacity-50 w-fit mt-10">
                Создать
            </Button>
        </div>
    );
});