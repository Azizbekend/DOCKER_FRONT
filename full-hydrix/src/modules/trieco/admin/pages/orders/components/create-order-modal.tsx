import { Button, Input } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite";
import orderModel from "../model/order-model";
import { format } from "date-fns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import orderListModel from "../model/order-list-model";
import mapVKModel from "@/app/cores/core-trieco/UIKit/mapVK/model/mapVK-model";
import mmrgl, { Map, MapLibreGL } from 'mmr-gl';
import { getAdressCoordinates, getAdressList, getSuggestionClick } from "@/app/cores/core-trieco/UIKit/mapVK/mapVk-functions";
import { useAuth } from "@/entities/user/context";

type Props = {
    onClose: () => void;
};

export const CreateOrderModal = observer(({ onClose }: Props) => {
    const { createOrder, sewers, changeFirstName, changeLastName, changeMiddleName,
        changePhone, changeAddress, changeWaste, changeDate, changeAddressText,
        changeStartTime, changeSewer, save, getSewers, isSave, clearData, changeMunicipality } = orderModel

    const [switchSewer, setSwitchSewer] = useState(false)
    const [mapType, setMapType] = useState("searchPoint")

    const { modelMap } = mapVKModel

    const { user } = useAuth();

    useEffect(() => {
        getSewers(user?.companyId || 0)
    }, []);

    const handleTimeChange = (value: string) => {
        const time = dayjs(value, "HH:mm");
        const now = dayjs();
        const min = createOrder.date === now.format("YYYY-MM-DD") ? now : dayjs("07:00", "HH:mm");
        const max = dayjs("22:00", "HH:mm");

        if (time.isBefore(min) || time.isAfter(max)) return;
        changeStartTime(value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sewerList = document.querySelector('.sewer-list');
            const inputField = document.querySelector('.sewer-input');

            if (
                sewerList && !sewerList.contains(event.target as Node) &&
                inputField && !inputField.contains(event.target as Node)
            ) {
                setSwitchSewer(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const close = () => {
        clearData();
        onClose();
    }

    const saveOrder = async () => {
        try {
            await save();
            clearData();
            onClose();
            toast.success("Заявка успешно создана", { progressStyle: { background: "green" } });
            if (user?.companyId) {
                orderListModel.init(user?.companyId);
            }
        } catch (error) {
            toast.error("Ошибка при создании заявки", { progressStyle: { background: "red" } });
        }
    };

    const handleInputFocus = () => {
        setSwitchSewer(true);
    };


    // ===РАБОТА С КАРТОЙ===
    // Ссылки на блок карты
    const mapContainer = useRef<HTMLDivElement | null>(null);
    // Ссылка на карту 
    const mapRef = useRef<mmrgl.Map | null>(null);
    // Ссылка на маркер
    const markerRef = useRef<mmrgl.Marker | null>(null);

    // Переменная для централизации карты по координатам
    const [center, setcenter] = useState<[number, number]>(modelMap.initialCenter);
    // Открытие списка найденных адресов
    const [show, setShow] = useState<boolean>(false);
    // Хранитель найденных адресов
    const [suggestions, setSuggestions] = useState<{ address: string; address_details: any }[]>([]);

    // Функция записи полученных данных
    const getResultMap = (data: any) => {
        changeAddress(data.address, data.pin[0], data.pin[1])
        changeMunicipality(data.address_details.subregion)
    }

    // Поиск адреса по запросу
    useEffect(() => {
        getAdressList(createOrder.address, setSuggestions)
    }, [createOrder.address])

    // Выбор адреса из списка найденных
    const handleSuggestionClick = async (suggestion: { address: string; address_details: any }) => {
        try {
            // Фунция для получения данных по адресу из списка найденных
            const data = await getSuggestionClick(suggestion.address);

            mapRef.current?.setCenter([data.pin[0], data.pin[1]])
            mapRef.current?.setZoom(15)

            if (mapRef.current) markerRef.current?.setLngLat([data.pin[0], data.pin[1]]).addTo(mapRef.current).getLngLat()

            changeAddress(data.address, data.pin[0], data.pin[1])
            changeMunicipality(data.address_details.subregion)
            setSuggestions([]);
            setShow(false)

        } catch (error) {
            console.error('Ошибка при обработке адреса:', error);
        }
    };

    // Закрытие списка рекомендованных
    const handleMouseDown = (event: any) => {
        if (!event.target.className.includes("adress")) {
            setShow(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => { document.removeEventListener('mousedown', handleMouseDown) }
    }, []);

    // Полечение данных по координатам
    useEffect(() => {
        if (!mapContainer.current) return;

        // Инициализация карты
        mmrgl.accessToken = modelMap.token;

        const map = new mmrgl.Map({
            container: mapContainer.current,
            zoom: modelMap.initialZoom,
            center: center,
            style: 'mmr://api/styles/main_style.json',
            hash: true,
        });
        mapRef.current = map;

        //! Вставление маркера
        // var marker = new mmrgl.Marker({
        //     pitchAlignment: "map",
        // })
        // markerRef.current = marker;

        var geolocate = new mmrgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        map.addControl(geolocate);
        map.on('load', function () {
            geolocate.trigger();
        });

        // Обработчик клика для получения координат
        const handleMapClick = async (e: mmrgl.MapMouseEvent & { lngLat: mmrgl.LngLat; }) => {
            setcenter([e.lngLat.lng, e.lngLat.lat]);
            map.setCenter([e.lngLat.lng, e.lngLat.lat])
            markerRef.current?.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map).getLngLat()

            // Функция для получение данных по координатам 
            getAdressCoordinates(e.lngLat, getResultMap)
        };

        map.on('click', handleMapClick);

        // Очистка при размонтировании
        return () => {
            if (mapRef.current) {
                mapRef.current.off('click', handleMapClick);
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);
    // ===КОНЕЦ===



    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full opacity-[40%] bg-[#192038] z-20"></div>
            <div className="fixed top-0 right-0 h-screen bg-white overflow-y-auto min-w-[500px] max-w-[550px] z-20 flex flex-col">
                <div className=" items-center w-[100%] flex justify-between border-b-[1px] border-[#EFF4FA] px-[22px] py-[28px]">
                    <p className="text-2xl font-semibold leading-none">Создание заявки</p>
                    <Button class="w-[24px] h-[24px]" onClick={close} children={<Icon systemName="close" />} />
                </div>

                <div className="overflow-y-auto flex flex-col justify-between pt-[19px] h-full">
                    <div className="px-[31px] flex flex-col gap-[30px] ">
                        <span className="font-bold text-[17px] mb-[-5px]">Данные контактного лица</span>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Фамилия</p>
                            <Input class="w-full" type='text' value={createOrder.surname} onChange={changeLastName} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Имя</p>
                            <Input class="w-full" type='text' value={createOrder.name} onChange={changeFirstName} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'>Отчество</p>
                            <Input class="w-full" type='text' value={createOrder.patronymic} onChange={changeMiddleName} />
                        </div>
                        <div className="font-semibold leading-none">
                            <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Телефон</p>
                            <Input class="w-full" type='phone' icon="phone" iconActive="phone-active" isFrontIcon={true} value={createOrder.phone} onChange={changePhone} />
                        </div>
                        <div className="font-semibold leading-none relative">
                            <p className="mb-[9px]"><span className="text-[#D31313]">*</span> Адрес</p>

                            <Input class="w-full adress" type='text' value={createOrder.address} onChange={(e) => { changeAddressText(e); setShow(true) }} />
                            {(suggestions.length > 0 && createOrder.address.length > 0 && show) && (
                                <ul className='absolute z-10 bg-white border-[#4A85F6] border-[1px] rounded-lg max-h-[400px] overflow-y-auto max-w-full adress'>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => { handleSuggestionClick(suggestion) }} className='adress px-3 py-2 cursor-pointer hover:bg-[#4A85F624] hover:rounded-lg'>
                                            <div className="adress">{suggestion.address}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />

                        <span className="font-bold text-[17px]">Когда подать машину?</span>
                        <div className="grid grid-cols-2 gap-[12px]">
                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Дата вывоза</p>
                                <Input
                                    class="w-full"
                                    type="date"
                                    minValue={format(new Date(Date.now()), "yyyy-MM-dd")}
                                    onChange={(v) => changeDate(v)}
                                    value={createOrder.date} />
                            </div>

                            <div className="font-semibold leading-none">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Объем септика/колодца</p>
                                <Input class="w-full " type='text' value={createOrder.wasteVolume !== 0 ? createOrder.wasteVolume : ""} onChange={changeWaste} measure="м³" />
                            </div>
                        </div>
                        {createOrder.date &&
                            <div className="grid grid-cols-1 gap-[12px]">
                                <div className="font-semibold leading-none">
                                    <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>Начало</p>
                                    <TimePicker
                                        format="HH:mm"
                                        ampm={false}
                                        minTime={createOrder.date === dayjs().format("YYYY-MM-DD") ? dayjs() : dayjs().hour(7).minute(0)}
                                        maxTime={dayjs("2022-04-04T22:00")}
                                        timeSteps={{ minutes: 1 }}
                                        onChange={(value) => {
                                            if (value) {
                                                handleTimeChange(value.format("HH:mm"));
                                            }
                                        }}
                                    />
                                    <p className="mt-2 text-[13px]">Примерное время подачи: {createOrder.startTime}-{createOrder.endTime}</p>
                                </div>
                            </div>
                        }


                        <span className="font-bold text-[17px]">Назначить ассенизатора</span>
                        <div className="font-semibold leading-none mb-[47px]">
                            <div className="relative">
                                <p className='mb-[9px]'><span className='text-[#D31313]'>* </span>ФИО ассенизатора</p>

                                <Input
                                    id="sewer-input"
                                    class="w-full text-left py-2.5 sewer-input"
                                    type="button"
                                    icon="arrow-triangle-radius"
                                    onFocus={handleInputFocus}
                                    value={createOrder.sewerFirstName + " " + createOrder.sewerLastName + " " + createOrder.sewerPatronymic} />

                                <div className={`sewer-list flex flex-col absolute gap-5 bottom-[100%] w-full left-0 px-[14px] mb-2 py-[12px] bg-stone-50 rounded-lg shadow-[0px_0px_10.7px_rgba(0,_0,_0,_0.25)] z-10 ${!switchSewer && "hidden"} max-h-[180px] overflow-y-auto`}>
                                    {sewers && sewers.length > 0 ? (
                                        sewers.map((sewer) => (
                                            <span
                                                key={sewer.id}
                                                className="cursor-pointer sewer-list"
                                                onClick={() => { changeSewer(sewer); setSwitchSewer(!switchSewer); }}
                                            >

                                                {`${sewer.lastName} ${sewer.firstName}`}
                                            </span>
                                        ))
                                    )
                                        :
                                        (
                                            <p className="text-center text-sm text-gray-500">Нет доступных ассенизаторов</p>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="px-[31px] pt-[18px] pb-[18px] flex gap-[11px] bg-[#F6F6F6]">
                        <Button
                            disabled={!isSave}
                            onClick={() => { saveOrder() }}
                            children="Создать"
                            class="bg-[#4a85f6] py-[10px] px-[17px]"
                        />
                        <Button children={<span className="text-[#4a85f6]">Отмена</span>} onClick={close} class="font-semibold leading-none flex items-center justify-center border-[#4a85f6] border-[2px] py-[10px] px-[17px]" />
                    </div>
                </div>
            </div >
        </>
    );
});



