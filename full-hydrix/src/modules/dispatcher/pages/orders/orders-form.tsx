import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Button } from "@/packages/shared-ui/button";
import { createRequestModel } from "../../features/orders/form/create-request-model";
import { useEffect } from "react";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { Textarea } from "@/packages/shared-ui/textarea";
import { observer } from "mobx-react-lite";

export const RequestRegistryForm = observer(() => {

    const { model, setTitle, setDiscription, setType, setHardwareId, init } = createRequestModel

    useEffect(() => {
        init()
    }, [])


    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Создание заявки</h1>
                <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
            </div>

            <div className="flex flex-col gap-4">
                <InputContainer headerText="Наименование заявки" >
                    <Input
                        placeholder="Наименование"
                        className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                        value={model.title}
                        onChange={setTitle}
                        type="text"
                    />
                </InputContainer>

                <InputContainer headerText="Тип заявки">
                    <Selector
                        placeholder="Тип заявки"
                        classWripper="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                        items={[
                            { value: 1, title: "АО «ВКС»" },
                            { value: 2, title: "АО «УКС»" },
                            { value: 3, title: "ГБУ «СЭТИК»" },
                        ]}
                        onSelect={(item) => { setType(item.value.toString()) }}
                        icon="arrow-down"
                    />
                </InputContainer>

                <InputContainer headerText="Оборудование">
                    <Selector
                        placeholder="Оборудование"
                        classWripper="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent"
                        items={[
                            { value: 1, title: "АО «ВКС»" },
                            { value: 2, title: "АО «УКС»" },
                            { value: 3, title: "ГБУ «СЭТИК»" },
                        ]}
                        onSelect={(item) => { setType(item.value.toString()) }}
                        icon="arrow-down"
                    />
                </InputContainer>

                <InputContainer headerText="Описание" >
                    <Textarea
                        className="h-[116px]"
                        placeholder="Описание"
                        value={model.discription}
                        onChange={setDiscription}
                    />

                </InputContainer>

                <div className="flex gap-4">
                    <Button class="bg-[#4A85F6] text-white px-6 py-2.5 rounded-lg hover:opacity-50 duration-300">
                        Отправить заявку
                    </Button>
                    <Button class="text-[var(--clr-accent)] px-6 py-2.5 rounded-lg border border-[var(--clr-accent)] hover:bg-[var(--clr-accent)] hover:text-white duration-300">
                        Отменить
                    </Button>
                </div>
            </div>
        </>
    );
})