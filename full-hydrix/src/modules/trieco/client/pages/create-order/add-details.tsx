// import { Button, Input } from "@/app/cores/core-trieco/UIKit"
// import createOrderModel from "./entities/create-order-model"
import { observer } from "mobx-react-lite";
// import { SelectionComponent } from "../../components/selection";
import { PaymentTypeList, WasteList } from "./entities/selections";
import { useEffect, useState } from "react";
import clientModel from "../../kernel/model/client-model";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
// import Cookies from 'js-cookie';
import { Guid } from "guid-typescript";
import { createOrderModel } from "./entities/create-order-model";
import { Input } from "@/shared/ui/Inputs/input-text";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { SelectionComponent } from "../../layout/selection";
import { Button } from "@/shared/ui/button";
import Cookies from "universal-cookie";
import InputCheckbox from "@/shared/ui/Inputs/input-checkbox";



export const AddDetails = observer(() => {
    const { user } = clientModel
    const { model,
        changeDate,
        changeStartTime, canSave,
        changeFirstName, changeLastName,
        changeMiddleName, changePhone,
        changeWaste, selectedPoint, switchSelfCreated, isSelfCreated } = createOrderModel;
    const [minTime, setMinTime] = useState<string>("");

    const cookies = new Cookies();

    const [cost, setCost] = useState((500 * 4))

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setMinTime(`${hours}:${minutes}`);
    }, [model.date]);

    // Изменение данных при отработке switchSelfCreated
    useEffect(() => {
        changeLastName(isSelfCreated ? user?.lastName ?? "" : "");
        changeFirstName(isSelfCreated ? user?.firstName ?? "" : "");
        changeMiddleName(isSelfCreated ? user?.patronymic ?? "" : "");
        changePhone(isSelfCreated ? user?.phoneNumber ?? "" : "");
    }, [isSelfCreated, user]);

    const handleTimeChange = (value: string) => {
        if (((value < minTime && model.date == new Date().toISOString()) || (value < "07:00" && model.date != new Date().toISOString())) || value > "22:00") {
            return;
        }

        changeStartTime(value);
    }

    return (
        <div className='pt-10'>
            <span className='font-bold text-[34px]'>Уточните детали вывоза сточных вод</span>

            <div className='flex flex-col gap-7 mt-10 max-w-[70%]'>
                <div className="flex flex-col gap-3">
                    <span className="font-bold text-[18px]">Когда подать машину?</span>
                    <div className="flex flex-row gap-10 items-center">
                        <InputContainer
                            headerText="Дата вывоза"
                            underlineText="Обязательное поле"
                            classNames={{
                            }}>
                            <Input
                                onChange={changeDate}
                                value={model.date}
                                type="date"
                                className="cursor-pointer bg-white h-[55px] border border-solid border-[#C6C6C6] px-3 !rounded-[4px]"
                            />

                        </InputContainer>
                        <InputContainer
                            headerText="Время начала"
                            underlineText="Обязательное поле"
                            classNames={{
                                children: ""
                            }}>
                            <TimePicker
                                format="HH:mm"
                                ampm={false}
                                minTime={new Date().toISOString().split('T')[0] === model.date ? dayjs() : dayjs("2022-04-04T07:00")}
                                maxTime={dayjs("2022-04-04T22:00")}
                                timeSteps={{
                                    minutes: 1
                                }}
                                onChange={(props) => handleTimeChange(props!.format("HH:mm"))}
                                className="h-[55px] bg-white"
                            />
                        </InputContainer>

                        {
                            model.endTime && <span>Примерное время приезда с <span className="font-semibold">{model.startTime}</span> до <span className="font-semibold">{model.endTime}</span></span>
                        }
                    </div>
                    {
                        !selectedPoint && <div className="">
                            <div className="mb-3.5"><span className="font-semibold text-[16px] ">Объем септика/колодца<span className="text-[#C30707]">*</span></span></div>

                            <SelectionComponent items={WasteList} selected={model.wasteVolume} onSelect={(item) => { changeWaste(item.value); setCost(item.value * 600) }} />
                        </div>
                    }
                    <div className="">
                        <div className="mb-3.5"><span className="font-semibold text-[16px] mb-4">Способ оплаты <span className="text-[#C30707]">*</span></span></div>
                        <SelectionComponent items={PaymentTypeList} onSelect={() => { }} selected={0} />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="font-bold text-[18px]">Данные контактного лица</span>
                    <div className="flex flex-row gap-5">
                        <InputContainer
                            isRequired
                            headerText="Фамилия"
                            underlineText="Обязательное поле"
                            classNames={{
                                children: "w-[222px]"
                            }}
                        >
                            <Input
                                type="text"
                                placeholder="Фамилия"
                                onChange={(v) => changeLastName(v)}
                                value={model.surname}
                                disabled={isSelfCreated}
                                className={`${isSelfCreated ? "border-[#DCDEE3]" : ""} cursor-pointer bg-white py-2 border border-solid border-[#C6C6C6] px-3 !rounded-[4px]`}
                            />
                        </InputContainer>
                        <InputContainer
                            isRequired
                            headerText="Имя"
                            underlineText="Обязательное поле"
                            classNames={{
                                children: "w-[222px]"
                            }}
                        >
                            <Input type="text"
                                placeholder="Имя"
                                onChange={(v) => changeFirstName(v)}
                                value={model.name}
                                disabled={isSelfCreated}
                                className={`${isSelfCreated ? "border-[#DCDEE3]" : ""} cursor-pointer bg-white py-2 border border-solid border-[#C6C6C6] px-3 !rounded-[4px]`}
                            />
                        </InputContainer>
                        <InputContainer
                            headerText="Отчество"
                            classNames={{
                                children: "w-[222px]"
                            }}
                        >
                            <Input type="text"
                                placeholder="Отчество"
                                onChange={(v) => changeMiddleName(v)}
                                value={model.patronymic}
                                disabled={isSelfCreated}
                                className={`${isSelfCreated ? "border-[#DCDEE3]" : ""} cursor-pointer bg-white py-2 border border-solid border-[#C6C6C6] px-3 !rounded-[4px]`}
                            />
                        </InputContainer>
                    </div>
                    <div className="flex flex-row gap-10">
                        <InputContainer
                            headerText="Телефон"
                            isRequired
                            underlineText="Обязательное поле"
                            classNames={{
                                children: "w-[222px]"
                            }}
                        >
                            <Input type="phone"
                                placeholder="Телефон"
                                onChange={(v) => changePhone(v)}
                                value={model.phone}
                                disabled={isSelfCreated}
                                className={`${isSelfCreated ? "border-[#DCDEE3]" : ""} cursor-pointer bg-white py-2 border border-solid border-[#C6C6C6] px-3 !rounded-[4px]`}
                            />
                        </InputContainer>

                        <div className="flex flex-row items-center gap-1">
                            <InputCheckbox
                                onChange={() => switchSelfCreated()}
                                label="Другое контактное лицо"
                            />
                            <p className="font-semibold 2xl:text-[13px] text-[11px] mb-1 ml-1"></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-[15px]">Стоимость</span>
                    <span className="font-bold text-[22px]">{cost} рублей</span>
                </div>
                <form method='POST' action='https://trieco.server.paykeeper.ru/create/'  >
                    <input type='text' name='sum' value={cost.toString()} hidden />
                    <input type='text' name='orderid' value={Guid.create().toString()} hidden />
                    <input type='text' name='service_name' value={`Оплата заказа на вывоз ${model.wasteVolume} куб.м. ЖБО`} hidden />
                    <input name='user_result_callback' value={`http://trieco.ru/order/create`} hidden />

                    <Button type="submit" children="Оформить заказ" disabled={!canSave()} onClick={() => cookies.set('orderData', JSON.stringify(createOrderModel.model), { expires: 0.01 })}
                        class='bg-[#4A85F6] rounded-lg max-w-[242px] w-full flex items-center justify-center font-bold text-[16px]' />
                </form>
            </div>
        </div>
    )
})