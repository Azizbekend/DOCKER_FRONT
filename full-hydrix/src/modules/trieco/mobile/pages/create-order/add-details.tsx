import { Button, Input } from "@/app/cores/core-trieco/UIKit"
import createOrderModel from "./entities/create-order-model"
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import mobileModel from "../../kernel/model/mobile-model";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import headerStore from "../../kernel/helper/header-store";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { SelectionComponent } from "../../components/selection";
import { WasteList } from "./entities/selections";
import adminModel from "@/modules/admin/kernel/model/admin-model";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from 'dayjs';
import { PageCount } from "./components/page-count";
import Cookies from 'js-cookie';
import { Guid } from "guid-typescript";

export const AddDetails = observer(() => {
    const navigate = useNavigate();
    const { model,
        changeDate, checkInput,
        changeStartTime, canSave,
        changeFirstName, changeLastName,
        changeMiddleName, changePhone,
        changeWaste, save, nextPage, pageCounter, setPage, selectedPoint, changeAddress, pickupPoints, isAddress, showMap, setCoords, getPoints, setCost, cost } = createOrderModel;

    // const [showPoints, setShow] = useState(false)
    const [coordinates, setCoordinates] = useState<[number, number]>();
    // const [suggestions, setSuggestions] = useState<{ text: string; fullAddress: string }[]>([]);
    // const [mapInstance, setMapInstance] = useState<any>(null);
    const [isCheck, setIsCheck] = useState<boolean>(false)

    useEffect(() => {
        headerStore.setOnBackButtonClick(() => { setPage(1); headerStore.setOnBackButtonClick(undefined) })
        if (model.longitude && model.latitude) {
            setCoordinates([model.latitude, model.longitude])
        }
        if (user?.roleId !== 5) return;
        getPoints(user?.id || 0)

        return () => {
            headerStore.setOnBackButtonClick(undefined);
        }
    }, [])

    const [minTime, setMinTime] = useState<string>("");

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setMinTime(`${hours}:${minutes}`);
    }, [model.date]);




    const { user } = mobileModel;

    // const fetchSuggestions = async (query: string) => {
    //     const response = await fetch(
    //         `https://geocode-maps.yandex.ru/1.x/?apikey=${code}&format=json&geocode=${"Россия, " + query}&lang=ru_RU&kind=house&results=5`
    //     );
    //     const data = await response.json();
    //     data.response.GeoObjectCollection.featureMember.map((item: any) => {
    //         if (item.GeoObject.metaDataProperty.GeocoderMetaData.Address.country_code !== "RU") {
    //             data.response.GeoObjectCollection.featureMember.splice(data.response.GeoObjectCollection.featureMember.indexOf(item), 1)
    //         }
    //     });
    //     const foundSuggestions = data.response.GeoObjectCollection.featureMember.map((item: any) => {
    //         const metaData = item.GeoObject.metaDataProperty.GeocoderMetaData;
    //         const text = metaData.text;
    //         const fullAddress = metaData.AddressDetails.Country.AddressLine;
    //         return { text, fullAddress };
    //     });

    //     setSuggestions(foundSuggestions);
    // };

    const handleTimeChange = (value: string) => {
        if (((value < minTime && model.date == new Date().toISOString()) || (value < "07:00" && model.date != new Date().toISOString())) || value > "22:00") {
            return;
        }

        changeStartTime(value);
    }

    return (
        <div className='px-5 w-[100%] flex flex-col justify-between pb-5'>
            <div className="flex flex-col gap-5">

                <PageCount page={pageCounter} />

                <div className="mt-5">
                    <span className="font-bold text-[22px] leading-4">Укажите точку забора сточных вод</span>
                </div>

                <Input
                    headerText="Дата вывоза"
                    headerTextStyle="!text-[13px]"
                    class="text-[13px]" isRequired
                    type="date"
                    minValue={format(new Date(), "yyyy-MM-dd")}
                    onChange={(v) => changeDate(v)}
                    value={model.date}
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck && checkInput(model.date) ? "Обязательное поле" : ""} />
                <div className={`flex flex-col relative`}>
                    <span className="font-semibold text-[13px] mb-1 ">Время начала<span className="text-[#C30707]">*</span></span>
                    <TimePicker
                        format="HH:mm"
                        ampm={false}
                        minTime={new Date().toISOString().split('T')[0] === model.date ? dayjs() : dayjs("2022-04-04T07:00")}
                        maxTime={dayjs("2022-04-04T22:00")}
                        timeSteps={{
                            minutes: 1
                        }}
                        onChange={(props) => handleTimeChange(props!.format("HH:mm"))}
                        className="rounded-lg outline-0 !border-0 !outline-none !hover:outline-none text-[13px]" />
                    <span className="mt-2 text-[13px]">Примерное время подачи: {model.startTime}-{model.endTime}</span>

                    <div className="flex flex-col mt-1">
                        <span className={"text-[12px] mb-1 text-[#CB0D0D]"}>{isCheck && checkInput(model.startTime) ? "Обязательное поле" : ""}</span>
                    </div>
                </div>

                <div className={`flex flex-col relative`}>
                    <span className="font-semibold text-[13px] mb-1 ">Объем септика/колодца <span className="text-[#C30707]">*</span></span>
                    <SelectionComponent itemsStyle="!text-[12px]" items={WasteList} selected={model.wasteVolume} onSelect={(item) => { changeWaste(item.value); setCost(item.value * 600) }} />
                </div>

                <p className="font-bold text-[15px] mt-2">Данные контактного лица</p>
                <Input
                    headerText="Фамилия" isRequired onChange={(v) => changeLastName(v)}
                    value={model.surname} class="text-[13px]" headerTextStyle="!text-[13px]"
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck && checkInput(model.surname) ? "Обязательное поле" : ""} />
                <Input
                    headerText="Имя" isRequired onChange={(v) => changeFirstName(v)}
                    value={model.name} class="text-[13px]" headerTextStyle="!text-[13px]"
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck && checkInput(model.name) ? "Обязательное поле" : ""} />
                <Input
                    headerText="Отчество" onChange={(v) => changeMiddleName(v)}
                    value={model.patronymic} class="text-[13px]" headerTextStyle="!text-[13px]"
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck && checkInput(model.date) ? "Обязательное поле" : ""} />
                <Input
                    headerText="Телефон" isRequired type="phone" onChange={(v) => changePhone(v)}
                    value={model.phone} class="text-[13px]" headerTextStyle="!text-[13px]"
                    underlineTextStyle="!text-[#CB0D0D]"
                    underlineText={isCheck && checkInput(model.phone) ? "Обязательное поле" : ""} />

                <div className="font-bold text-[13px]">
                    <p>Стоимость: </p>
                    <p className="font-semibold text-[20px] mt-5 mb-7">{cost} руб.</p>
                </div>
            </div>
            {/* <Button children="Оформить заявку" onClick={() => { save(user?.id ?? 0, adminModel.companyId ?? null, setPage, headerStore.setTitle); setIsCheck(true); }}
                class='bg-[#4A85F6] rounded-lg w-full flex items-center justify-center font-bold text-[17px]' /> */}
            {/* <Button children="Оформить заявку" onClick={() => { if (canSave()) { setPage(3); headerStore.setTitle("Оплатить"); } setIsCheck(true); }}
                class='bg-[#4A85F6] rounded-lg w-full flex items-center justify-center font-bold text-[17px]' /> */}

            <form method='POST' action='https://trieco.server.paykeeper.ru/create/'>
                <input type='text' name='sum' value={cost.toString()} hidden />
                <input type='text' name='orderid' value={Guid.create().toString()} hidden />
                <input type='text' name='service_name' value={`Оплата заявки на вывоз ${model.wasteVolume} куб.м. ЖБО`} hidden />
                <input name='user_result_callback' value={`http://trieco.ru/order/create`} hidden />

                <Button type="submit" children="Оформить заявку" disabled={!canSave()} onClick={() => { Cookies.set('orderData', JSON.stringify(createOrderModel.model), { expires: 0.01 }) }}
                    class='bg-[#4A85F6] rounded-lg max-w-[242px] w-full flex items-center justify-center font-bold text-[16px]' />
            </form>

            {/* <Button children="Оформить заявку" disabled={!canSave()} onClick={() => { Cookies.set('orderData', JSON.stringify(createOrderModel.model), { expires: 0.01 }); setIsCheck(true); }}
                class='bg-[#4A85F6] rounded-lg w-full flex items-center justify-center font-bold text-[17px]' /> */}
        </div>
    )
})