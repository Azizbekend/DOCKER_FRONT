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
                <h1 className="text-3xl font-bold text-gray-800">Создание заявки</h1>
                <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
            </div>

            <div className="flex flex-col gap-4">

                <InputContainer headerText="Тип заявки">
                    <Selector
                        className="px-4 py-3"
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
                        className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                        value={model.title}
                        onChange={setTitle}
                        type="text"
                    />
                </InputContainer>

                {model.type == "Поставочная" &&
                    <InputContainer headerText={"Количество"}>
                        <Input
                            placeholder="Количество"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                            value={model.requiredCount || ""}
                            onChange={(e) => setRequiredCount(Number(e))}
                            type="number"
                        />
                    </InputContainer>
                }

                <InputContainer headerText="Выберете оборудование">
                    <SelectorSearch
                        placeholder="Оборудование"
                        classWripper="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700"
                        items={hardwareList}
                        onSelect={(item) => { setHardwareId(Number(item.value)) }}
                        icon="arrow-down"
                        isLoader={isLodaderHardwares}
                    />
                </InputContainer>

                <InputContainer headerText="Выберете компанию">
                    <Selector
                        placeholder="Выберете компанию"
                        classWripper="w-full"
                        items={companyList}
                        onSelect={(item) => { getUserList(Number(item.value)) }}
                        icon="arrow-down"
                    />
                </InputContainer>


                {model.implementersCompaneId != 0 && (userList.length > 0 ?
                    <InputContainer headerText="Выберете ответственное лицо">
                        <Selector
                            placeholder="Выберете ответственное лицо"
                            classWripper="w-full"
                            items={userList}
                            onSelect={(item) => { setImplementerId(Number(item.value)) }}
                            icon="arrow-down"
                        />
                    </InputContainer>
                    : <div>У компании отсутвствуют ответственные лица </div>)
                }

                {model.type != "Поставочная" &&
                    <InputContainer headerText="Описание" >
                        <Textarea
                            className="h-[116px]"
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