import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Button } from "@/packages/shared-ui/button/button";
import { createRequestModel } from "../../features/service-request/form/create-request-model";
import { useEffect } from "react";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { Textarea } from "@/packages/shared-ui/textarea";
import { observer } from "mobx-react-lite";
import { SelectorSearch } from "@/packages/shared-ui/Selector/selector-search";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/packages/entities/user/context";

export const RequestRegistryForm = observer(() => {

    const navigate = useNavigate();
    const { user } = useAuth()
    const { model, setTitle, setDiscription, setType, setHardwareId, init, hardwareList, isLodaderHardwares, create, setRequiredCount, companyList, setImplementerId, getUserList, userList } = createRequestModel

    useEffect(() => {
        const objectId = JSON.parse(localStorage.getItem('objectData') || "").id
        init(objectId)
    }, [])

    const onSubmit = () => {
        create({
            id: user!.id,
            comanyId: user!.companyId,
            onAction: () => navigate("/dispatcher/services"),
        })
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-800 xl:text-3xl">Создание заявки</h1>
                <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
            </div>

            <div className="flex flex-col gap-4">

                <InputContainer headerText="Тип заявки">
                    <Selector
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                        placeholder="Тип заявки"
                        classWripper="w-full"
                        items={[
                            { value: 'Общий', title: "Общий" },
                            { value: 'Поставочная', title: "Поставочная" },
                        ]}
                        onSelect={(item) => { setType(item.value.toString()) }}
                        icon="arrow-down"
                    />
                </InputContainer>


                <InputContainer headerText={model.type == "Поставочная" ? "Наименование товара" : "Наименование заявки"}>
                    <Input
                        placeholder="Наименование"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                        value={model.title}
                        onChange={setTitle}
                        type="text"
                    />
                </InputContainer>

                {model.type == "Поставочная" &&
                    <InputContainer headerText={"Количество"}>
                        <Input
                            placeholder="Количество"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                            value={model.requiredCount || ""}
                            onChange={(e) => setRequiredCount(Number(e))}
                            type="number"
                        />
                    </InputContainer>
                }

                <InputContainer headerText="Выберите оборудование">
                    <SelectorSearch
                        placeholder="Оборудование"
                        classWripper="w-full border border-gray-300 rounded-lg px-3 py-2.5 "
                        items={hardwareList}
                        onSelect={(item) => { setHardwareId(Number(item.value)) }}
                        icon="arrow-down"
                        isLoader={isLodaderHardwares}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                    />
                </InputContainer>

                <InputContainer headerText="Выберите компанию">
                    <Selector
                        placeholder="Выберите компанию"
                        classWripper="w-full"
                        items={companyList}
                        onSelect={(item) => { getUserList(Number(item.value)) }}
                        icon="arrow-down"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                    />
                </InputContainer>


                {model.implementersCompaneId != 0 && (userList.length > 0 ?
                    <InputContainer headerText="Выберите ответственное лицо">
                        <Selector
                            placeholder="Выберите ответственное лицо"
                            classWripper="w-full"
                            items={userList}
                            onSelect={(item) => { setImplementerId(Number(item.value)) }}
                            icon="arrow-down"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent transition-colors"
                        />
                    </InputContainer>
                    : <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                  У выбранной компании отсутствуют ответственные лица
                </div>)
                }

                {model.type != "Поставочная" &&
                    <InputContainer headerText="Описание" >
                        <Textarea
                            className="w-full min-h-[120px] border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent resize-none"
                            placeholder="Описание"
                            value={model.discription}
                            onChange={setDiscription}
                            
                        />
                    </InputContainer>
                }
                <div className="flex gap-4">
                    <Button class="bg-[#4A85F6] text-white px-6 py-2.5 rounded-lg hover:opacity-50 duration-300" onClick={onSubmit}>
                        Отправить заявку
                    </Button>
                    <Link to="/dispatcher/orders" className="text-[var(--clr-accent)] px-6 py-2.5 rounded-lg border border-[var(--clr-accent)] hover:bg-[var(--clr-accent)] hover:text-white duration-300">
                        Отменить
                    </Link>
                </div>
            </div >
        </>
    );
})