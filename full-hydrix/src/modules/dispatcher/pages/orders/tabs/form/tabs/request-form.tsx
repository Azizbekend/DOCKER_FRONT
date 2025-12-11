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
                
                <InputContainer
                    classNames={{
                        wrapper: "w-[260px] mb-5",
                        children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                    }}
                    headerText="Типовая заявка"
                >

                    <SelectorSearch
                        placeholder="Выберите типовую заявку"
                        items={[
                { value: 1, title: "Замена подшипников" },
                { value: 2, title: "Калибровка датчика" },
                { value: 3, title: "ТО насосного оборудования" },
              ]}
                        onSelect={setType}
                        icon="arrow-down"
                    />
                </InputContainer>

                <InputContainer
                    headerText="Описание"
                    classNames={{
                        children: "border-[1.5px] px-3 py-3 rounded-lg border-[#BCBCBC] w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
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
                            children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                        }}
                        headerText="Организация-Заказчик:"
                        isRequired
                    >
                        <SelectorSearch
                            classWripper="w-full"
                            placeholder="Организация"
                            items={[
                  { value: 1, title: "АО «ВКС»" },
                  { value: 2, title: "АО «УКС»" },
                  { value: 3, title: "ГБУ «СЭТИК»" },
                ]}
                            onSelect={setType}
                            icon="arrow-down"
                        />
                    </InputContainer>

                    
                    <InputContainer
                        classNames={{
                            wrapper: "w-full",
                            children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
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
                        wrapper: "w-[100%] mb-5",
                        children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                    }}
                    headerText="Организация-заявитель:"
                >

                    <SelectorSearch
                        classWripper="w-full"
                        placeholder="Организация-заявитель:"
                        items={[
                { value: 1, title: "АО «ВКС»" },
                { value: 2, title: "АО «УКС»" },
                { value: 3, title: "ГБУ «СЭТИК»" },
              ]}
                        onSelect={setType}
                        icon="arrow-down"
                    />
                </InputContainer>

                <div className="flex justify-between mb-5">
                    <InputContainer
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                        }}
                        headerText="Сотрудник-заявитель:"
                    >

                        <SelectorSearch
                            classWripper="w-full"
                            placeholder="Сотрудник-заявитель:"
                            items={[
                                {
                                    value: 1,
                                    title: "Иванов И.И.",
                                },
                                {
                                    value: 2,
                                    title: "Петров П.П.",
                                },
                                {
                                    value: 3,
                                    title: "Сидоров С.С.",
                                },
                            ]}
                            onSelect={setType}
                            icon="arrow-down"
                        />
                    </InputContainer>

                    <InputContainer
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                        }}
                        headerText="Дата"
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
                            children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
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
                        headerText="Электронная почта"
                        classNames={{
                            wrapper: "w-[48%]",
                            children: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
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

                <div className="mt-8 flex justify-end">
        <Button
          class="px-6 py-3 bg-[#4A85F6] text-white font-semibold rounded-lg hover:bg-[#3a6bc9] transition-colors shadow-md hover:shadow-lg"
        >
          Создать заявку
        </Button>
      </div>
            </div>

            
        </div>
    );
});